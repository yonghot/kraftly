import { NextRequest, NextResponse } from "next/server";
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

    // 1순위: Together.ai (무료 FLUX.1-schnell — API 키 필요, 3개월 무료)
    const togetherKey = process.env.TOGETHER_API_KEY;
    if (togetherKey) {
      const togetherRes = await fetch(
        "https://api.together.xyz/v1/images/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${togetherKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "black-forest-labs/FLUX.1-schnell-Free",
            prompt: fullPrompt,
            width: 512,
            height: 512,
            steps: 4,
            n: IMAGE_COUNT,
            response_format: "b64_json",
          }),
        }
      );

      if (togetherRes.ok) {
        const togetherData = await togetherRes.json();
        const images = (
          togetherData.data as { b64_json: string }[]
        ).map(
          (item) => `data:image/png;base64,${item.b64_json}`
        );

        return NextResponse.json({
          images,
          design_id: `tog-${Date.now()}`,
          prompt_used: fullPrompt,
        });
      }
      // Together.ai 실패 시 → 다음 옵션으로 진행
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

      // TODO: Supabase Storage에 업로드 및 designs 테이블에 레코드 생성

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
