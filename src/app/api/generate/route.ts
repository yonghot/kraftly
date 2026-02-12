import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { K_DESIGN_CATEGORIES } from "@/data/categories";
import type { JewelryType, Material } from "@/types";

const IMAGE_COUNT = 1;

/** 주얼리 종류별 형태·착용 묘사 */
const JEWELRY_TYPE_DETAILS: Record<JewelryType, string> = {
  ring: "a single ring worn on a finger — circular band with decorative top setting, visible gemstone mount or sculptural element on the ring face, ergonomic inner curve",
  necklace: "a necklace pendant with chain — visible chain links draping in a curve, central pendant or focal charm hanging at the center, clasp detail, designed to rest on the collarbone or chest",
  earring: "a pair of earrings — dangling or stud style, ear hook or post visible, symmetrical pair design, lightweight structure, designed to frame the face",
  bracelet: "a bracelet — curved band or chain that wraps around the wrist, visible hinge or clasp mechanism, interior smooth for comfort, outer surface decorated",
  brooch: "a decorative brooch pin — flat-backed with pin clasp on reverse, ornamental front face with sculptural relief, designed to be pinned on fabric",
};

/** 소재별 시각적 질감·색상·반사도 묘사 */
const MATERIAL_DETAILS: Record<Material, string> = {
  silver: "sterling silver (925) — cool white metallic luster, mirror-like polished surface with subtle gray undertones, clean reflective shine, lightweight appearance",
  gold_14k: "14K yellow gold — warm golden tone with slight softness, rich buttery sheen, durable everyday elegance, visible warm reflections",
  gold_18k: "18K yellow gold — deep rich golden color, luxurious high-purity warm glow, satiny smooth surface with intense golden reflections, premium weight and density visible",
  rose_gold: "rose gold (18K) — distinctive warm pinkish-copper hue, romantic blush-toned metallic surface, soft rosy reflections, feminine and contemporary appearance",
  platinum: "platinum — dense silvery-white metal with cool blue-gray undertone, heavy premium weight visible, understated matte satin finish, hypoallergenic luxury",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category_id, jewelry_type, material, user_prompt } = body;

    // 입력 검증
    if (!category_id || !jewelry_type || !material) {
      return NextResponse.json(
        { error: "category_id, jewelry_type, material은 필수입니다." },
        { status: 400 }
      );
    }

    // 카테고리 조회
    const category = K_DESIGN_CATEGORIES.find((c) => c.id === category_id);
    if (!category) {
      return NextResponse.json(
        { error: "존재하지 않는 카테고리입니다." },
        { status: 400 }
      );
    }

    // 주얼리 종류·소재 상세 묘사 조합
    const typeDetail = JEWELRY_TYPE_DETAILS[jewelry_type as JewelryType] ?? jewelry_type;
    const materialDetail = MATERIAL_DETAILS[material as Material] ?? material.replace(/_/g, " ");

    // 프롬프트 생성 — 상세 묘사 주입
    let fullPrompt = category.prompt_template
      .replace(/{jewelry_type}/g, jewelry_type)
      .replace(/{material}/g, materialDetail);

    // 주얼리 형태 명시 보강
    fullPrompt += `\n\nJEWELRY FORM: This must clearly depict ${typeDetail}.`;
    fullPrompt += `\nMATERIAL RENDERING: The metal surface must visually read as ${materialDetail}.`;
    fullPrompt += `\nCRITICAL: The generated image MUST show a ${jewelry_type} (not any other jewelry type). The material must be unmistakably ${material.replace(/_/g, " ")}.`;

    if (user_prompt) {
      fullPrompt += `\nAdditional details: ${user_prompt}`;
    }

    // Google Gemini API — GEMINI_API_KEY 필수
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY가 설정되지 않았습니다." },
        { status: 503 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: geminiKey });

    const imagePromises = Array.from({ length: IMAGE_COUNT }).map(() =>
      ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: [
          {
            role: "user",
            parts: [{ text: fullPrompt }],
          },
        ],
        config: {
          responseModalities: ["IMAGE", "TEXT"],
        },
      })
    );

    const results = await Promise.allSettled(imagePromises);
    const images: string[] = [];

    for (const result of results) {
      if (result.status === "fulfilled" && result.value.candidates?.[0]) {
        const parts = result.value.candidates[0].content?.parts ?? [];
        for (const part of parts) {
          if (part.inlineData) {
            images.push(
              `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
            );
          }
        }
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: "이미지 생성에 실패했습니다. 잠시 후 다시 시도해주세요." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      images: images.slice(0, IMAGE_COUNT),
      design_id: `gem-${Date.now()}`,
      prompt_used: fullPrompt,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "이미지 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
