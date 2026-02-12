import { NextRequest, NextResponse } from "next/server";
import { K_DESIGN_CATEGORIES } from "@/data/categories";

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

    // Replicate API 호출
    const replicateToken = process.env.REPLICATE_API_TOKEN;

    if (!replicateToken) {
      // Replicate 토큰이 없을 경우 — Pollinations.ai 무료 API 사용
      const baseSeed = Date.now();
      const pollinationsImages = Array.from({ length: 4 }).map(
        (_, i) =>
          `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=512&height=512&model=flux&nologo=true&seed=${baseSeed + i}`
      );

      return NextResponse.json({
        images: pollinationsImages,
        design_id: `pol-${Date.now()}`,
        prompt_used: fullPrompt,
      });
    }

    // Replicate API 호출 (실제 이미지 생성)
    const Replicate = (await import("replicate")).default;
    const replicate = new Replicate({ auth: replicateToken });

    const output = await replicate.run(
      "black-forest-labs/flux-1.1-pro" as `${string}/${string}`,
      {
        input: {
          prompt: fullPrompt,
          num_outputs: 4,
          guidance_scale: 7.5,
          num_inference_steps: 30,
          output_format: "webp",
          output_quality: 90,
        },
      }
    );

    const images = Array.isArray(output)
      ? output.map((item) => (typeof item === "string" ? item : String(item)))
      : [];

    // TODO: Supabase Storage에 업로드 및 designs 테이블에 레코드 생성

    return NextResponse.json({
      images,
      design_id: `gen-${Date.now()}`,
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
