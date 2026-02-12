import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { K_DESIGN_CATEGORIES } from "@/data/categories";

const IMAGE_COUNT = 2;

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

    // 프롬프트 생성
    let fullPrompt = category.prompt_template
      .replace(/{jewelry_type}/g, jewelry_type)
      .replace(/{material}/g, material.replace(/_/g, " "));

    if (user_prompt) {
      fullPrompt += `\nAdditional details: ${user_prompt}`;
    }

    // 1순위: Gemini (나노바나나) — GEMINI_API_KEY 필요, 무료 티어
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      const ai = new GoogleGenAI({ apiKey: geminiKey });

      // 2개 이미지를 병렬로 생성
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

      if (images.length > 0) {
        return NextResponse.json({
          images: images.slice(0, IMAGE_COUNT),
          design_id: `gem-${Date.now()}`,
          prompt_used: fullPrompt,
        });
      }
      // Gemini 실패 시 → 다음 옵션으로 진행
    }

    // 2순위: Replicate API (유료 — REPLICATE_API_TOKEN 필요)
    const replicateToken = process.env.REPLICATE_API_TOKEN;
    if (replicateToken) {
      const Replicate = (await import("replicate")).default;
      const replicate = new Replicate({ auth: replicateToken });

      const output = await replicate.run(
        "black-forest-labs/flux-1.1-pro" as `${string}/${string}`,
        {
          input: {
            prompt: fullPrompt,
            num_outputs: IMAGE_COUNT,
            guidance_scale: 7.5,
            num_inference_steps: 30,
            output_format: "webp",
            output_quality: 90,
          },
        }
      );

      const images = Array.isArray(output)
        ? output.map((item) =>
            typeof item === "string" ? item : String(item)
          )
        : [];

      return NextResponse.json({
        images,
        design_id: `gen-${Date.now()}`,
        prompt_used: fullPrompt,
      });
    }

    // 3순위: Pollinations.ai (API 키 불필요, 무료 — 레이트 리밋 있음)
    const baseSeed = Date.now();
    const pollinationsImages = Array.from({ length: IMAGE_COUNT }).map(
      (_, i) =>
        `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=512&height=512&model=flux&nologo=true&seed=${baseSeed + i}`
    );

    return NextResponse.json({
      images: pollinationsImages,
      design_id: `pol-${Date.now()}`,
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
