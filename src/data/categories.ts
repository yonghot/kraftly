import type { DesignCategory } from "@/types";

export const K_DESIGN_CATEGORIES: DesignCategory[] = [
  {
    id: "hanbok",
    name_en: "Hanbok Heritage",
    name_ko: "한복 모티프",
    description_en:
      "Elegant curves inspired by traditional Korean dress — silk textures, jeogori lines, norigae knots, phoenix and crane motifs",
    description_ko:
      "한복의 우아한 곡선, 비단 질감, 저고리 라인, 노리개 매듭, 봉황·학 문양에서 영감을 받은 스타일",
    prompt_template: `Exquisite handmade {jewelry_type} inspired by Korean Hanbok traditional dress.
Features: flowing silk-like curves, jeogori neckline silhouette, norigae knot details, delicate crane or phoenix motifs.
Material: {material}. Color palette: deep burgundy, royal blue, soft ivory, gold accents.
Style: elegant, feminine, traditional Korean aesthetics with modern wearability.
Studio product photography on white background, 4K, photorealistic, soft lighting.`,
    color_palette: ["#8B1A1A", "#1B3A6B", "#F5F0E8", "#C9A96E"],
    thumbnail_url: null,
    sort_order: 1,
    is_active: true,
  },
  {
    id: "minimal_seoul",
    name_en: "Minimal Seoul",
    name_ko: "미니멀 서울",
    description_en:
      "Clean geometric lines of modern Seoul — hanok rooflines, Namsan Tower silhouettes, Han River curves",
    description_ko:
      "서울의 현대적 도시미학, 한옥 처마선, 남산타워 실루엣, 한강 곡선의 깔끔한 기하학 라인",
    prompt_template: `Minimalist modern {jewelry_type} inspired by Seoul cityscape aesthetics.
Features: clean geometric lines, hanok roofline angles, Namsan Tower-inspired vertical elements, gentle Han River curves.
Material: {material}. Color palette: matte silver, brushed gold, concrete gray, midnight navy.
Style: architectural, minimalist, contemporary Korean urban design.
Studio product photography on white background, 4K, photorealistic, soft lighting.`,
    color_palette: ["#C0C0C0", "#B8860B", "#808080", "#191970"],
    thumbnail_url: null,
    sort_order: 2,
    is_active: true,
  },
  {
    id: "kpop",
    name_en: "K-Pop Glitter",
    name_ko: "K-팝 글리터",
    description_en:
      "Bold and dazzling K-Pop style — holographic effects, neon colors, layered chains, statement pieces",
    description_ko:
      "대담하고 화려한 K-팝 스타일, 홀로그램, 네온 컬러, 체인 레이어링, 스테이트먼트 피스",
    prompt_template: `Bold glamorous {jewelry_type} inspired by K-Pop idol fashion and stage aesthetics.
Features: eye-catching holographic elements, layered chains, crystal embellishments, asymmetric design, statement piece.
Material: {material}. Color palette: hot pink, electric purple, holographic silver, neon green accents.
Style: maximalist, trendy, stage-ready, K-Pop fashion forward.
Studio product photography on white background, 4K, photorealistic, dramatic lighting.`,
    color_palette: ["#FF69B4", "#8B00FF", "#E8E8E8", "#39FF14"],
    thumbnail_url: null,
    sort_order: 3,
    is_active: true,
  },
  {
    id: "celadon",
    name_en: "Celadon & Porcelain",
    name_ko: "청자·백자",
    description_en:
      "Serene beauty of Goryeo celadon and Joseon white porcelain — jade-like colors, sanggam inlay, moon jar curves",
    description_ko:
      "고려청자·조선백자의 담백한 아름다움, 비색, 상감 기법, 매병 곡선, 달항아리 형태",
    prompt_template: `Refined {jewelry_type} inspired by Korean celadon and white porcelain pottery traditions.
Features: soft jade-green celadon color, sanggam (inlay) pattern details, moon jar rounded forms, subtle crackle glaze texture.
Material: {material} with ceramic or enamel accents. Color palette: celadon green, ivory white, pale blue, soft jade.
Style: serene, refined, museum-quality Korean traditional craft aesthetics.
Studio product photography on white background, 4K, photorealistic, soft natural lighting.`,
    color_palette: ["#ACE1AF", "#FFFFF0", "#B0E0E6", "#00A86B"],
    thumbnail_url: null,
    sort_order: 4,
    is_active: true,
  },
  {
    id: "najeon",
    name_en: "Najeon Mother-of-Pearl",
    name_ko: "자개·나전",
    description_en:
      "Iridescent beauty of najeon lacquerware — mother-of-pearl shimmer, vine scrollwork, chilbo enamel colors",
    description_ko:
      "나전칠기의 영롱한 빛의 유희, 자개 오팔레슨스, 덩굴 문양, 칠보 색감",
    prompt_template: `Luxurious {jewelry_type} inspired by Korean najeon chilgi (mother-of-pearl lacquerware) tradition.
Features: iridescent mother-of-pearl inlay effect, arabesque vine scroll patterns, chilbo (cloisonné enamel) color accents.
Material: {material} with mother-of-pearl or abalone shell accents. Color palette: iridescent pearl, deep black lacquer, emerald, ruby red.
Style: luxurious, luminous, traditional Korean decorative arts.
Studio product photography on dark background, 4K, photorealistic, dramatic lighting to show iridescence.`,
    color_palette: ["#E6E6FA", "#1A1A1A", "#50C878", "#E0115F"],
    thumbnail_url: null,
    sort_order: 5,
    is_active: true,
  },
  {
    id: "modern_hanok",
    name_en: "Modern Hanok",
    name_ko: "현대 한옥",
    description_en:
      "Where tradition meets modernity — giwa tile patterns, wood-metal fusion, lattice window geometry",
    description_ko:
      "전통과 현대의 절제된 만남, 기와 패턴, 목재+메탈 퓨전, 격자 창살 기하학",
    prompt_template: `Contemporary {jewelry_type} inspired by modern hanok (Korean traditional house) architecture.
Features: giwa (roof tile) curved patterns, wood grain textures mixed with metal, changsal (lattice window) geometric patterns, clean structural lines.
Material: {material} with wood accent elements. Color palette: warm wood brown, matte charcoal, stone gray, antique brass.
Style: wabi-sabi, architectural, restrained elegance, Korean neo-traditional.
Studio product photography on white background, 4K, photorealistic, warm natural lighting.`,
    color_palette: ["#8B6914", "#36454F", "#808080", "#CD7F32"],
    thumbnail_url: null,
    sort_order: 6,
    is_active: true,
  },
];
