import { NextRequest, NextResponse } from "next/server";

// GET: 공개 디자인 목록 조회
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "latest";
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  // TODO: Supabase에서 디자인 목록 조회
  // 현재는 빈 배열 반환 (프론트엔드에서 mock 데이터 사용 중)

  return NextResponse.json({
    designs: [],
    total: 0,
    limit,
    category: category || "all",
    sort,
  });
}

// POST: 새 디자인 저장
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Supabase에 디자인 레코드 생성
    // TODO: 인증 확인

    return NextResponse.json({
      id: `design-${Date.now()}`,
      ...body,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Design save error:", error);
    return NextResponse.json(
      { error: "디자인 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
