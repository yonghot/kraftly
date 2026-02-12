import type { ArtisanProfile, ArtisanReview } from "@/types";

/** Mock 장인 프로필 8명 — Phase 2 Supabase 연동 시 DB로 전환 */
export const MOCK_ARTISANS: ArtisanProfile[] = [
  {
    id: "artisan-001",
    display_name_en: "Master Kim Seongjin",
    display_name_ko: "김성진 장인",
    bio_en:
      "Third-generation jewelry master specializing in traditional Korean ring-making with lost-wax and hand-forging techniques. 25 years of experience crafting wedding bands and signet rings.",
    bio_ko:
      "3대째 이어온 전통 반지 제작 전문 장인. 로스트왁스와 단조 기법으로 25년간 웨딩밴드, 인장 반지를 제작해왔습니다.",
    specialties: ["ring"],
    materials: ["gold_14k", "gold_18k", "platinum"],
    techniques: ["lost_wax", "hand_forging", "engraving"],
    portfolio_urls: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80",
    ],
    location_en: "Jongno, Seoul",
    location_ko: "서울 종로구",
    avg_rating: 4.9,
    total_reviews: 127,
    total_orders: 342,
    min_price_krw: 250000,
    avg_lead_days: 14,
    is_verified: true,
    is_active: true,
    avatar_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    years_experience: 25,
  },
  {
    id: "artisan-002",
    display_name_en: "Park Eunha",
    display_name_ko: "박은하 장인",
    bio_en:
      "Modern necklace designer blending Korean minimalism with contemporary aesthetics. Known for delicate chain work and elegant pendant designs.",
    bio_ko:
      "한국적 미니멀리즘과 현대 감성을 융합한 목걸이 디자이너. 섬세한 체인 작업과 우아한 펜던트 디자인으로 알려져 있습니다.",
    specialties: ["necklace"],
    materials: ["silver", "rose_gold"],
    techniques: ["filigree", "stone_setting"],
    portfolio_urls: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      "https://images.unsplash.com/photo-1515562141589-67f0d7d68681?w=600&q=80",
    ],
    location_en: "Itaewon, Seoul",
    location_ko: "서울 이태원",
    avg_rating: 4.7,
    total_reviews: 89,
    total_orders: 215,
    min_price_krw: 180000,
    avg_lead_days: 10,
    is_verified: true,
    is_active: true,
    avatar_url:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    years_experience: 15,
  },
  {
    id: "artisan-003",
    display_name_en: "Lee Jiyeon",
    display_name_ko: "이지연 장인",
    bio_en:
      "Earring specialist from Busan with a passion for ocean-inspired designs. Expert in delicate metalwork and gemstone settings.",
    bio_ko:
      "바다에서 영감을 받은 귀걸이 전문 부산 장인. 섬세한 금속 세공과 보석 세팅의 전문가입니다.",
    specialties: ["earring"],
    materials: ["gold_18k", "silver"],
    techniques: ["stone_setting", "filigree", "engraving"],
    portfolio_urls: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80",
    ],
    location_en: "Haeundae, Busan",
    location_ko: "부산 해운대",
    avg_rating: 4.8,
    total_reviews: 64,
    total_orders: 178,
    min_price_krw: 150000,
    avg_lead_days: 12,
    is_verified: true,
    is_active: true,
    avatar_url:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    years_experience: 12,
  },
  {
    id: "artisan-004",
    display_name_en: "Choi Donghyun",
    display_name_ko: "최동현 장인",
    bio_en:
      "Bracelet artisan specializing in bold, architectural designs. Combines traditional forging with modern geometric patterns.",
    bio_ko:
      "대담하고 건축적인 팔찌 디자인 전문 장인. 전통 단조 기법과 현대 기하학적 패턴을 결합합니다.",
    specialties: ["bracelet"],
    materials: ["platinum", "gold_14k"],
    techniques: ["hand_forging", "engraving"],
    portfolio_urls: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
      "https://images.unsplash.com/photo-1600721391689-2564bb8055de?w=600&q=80",
    ],
    location_en: "Daegu",
    location_ko: "대구",
    avg_rating: 4.6,
    total_reviews: 45,
    total_orders: 120,
    min_price_krw: 300000,
    avg_lead_days: 18,
    is_verified: true,
    is_active: true,
    avatar_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    years_experience: 18,
  },
  {
    id: "artisan-005",
    display_name_en: "Master Yoon Haesung",
    display_name_ko: "윤해성 장인",
    bio_en:
      "Nationally recognized najeon (mother-of-pearl) and enamel brooch master. Preserving and modernizing the 1000-year Korean lacquerware tradition.",
    bio_ko:
      "나전칠기 및 칠보 브로치 분야의 국가 인정 장인. 1000년 한국 칠기 전통을 보존하고 현대화합니다.",
    specialties: ["brooch"],
    materials: ["silver", "gold_14k"],
    techniques: ["najeon", "enamel", "engraving"],
    portfolio_urls: [
      "https://images.unsplash.com/photo-1583860379022-2f3c644395a9?w=600&q=80",
      "https://images.unsplash.com/photo-1759680239559-b15010f8a7a8?w=600&q=80",
      "https://images.unsplash.com/photo-1569349668601-c0e850609049?w=600&q=80",
    ],
    location_en: "Jeonju",
    location_ko: "전주",
    avg_rating: 5.0,
    total_reviews: 38,
    total_orders: 95,
    min_price_krw: 400000,
    avg_lead_days: 21,
    is_verified: true,
    is_active: true,
    avatar_url:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    years_experience: 30,
  },
  {
    id: "artisan-006",
    display_name_en: "Han Soojin",
    display_name_ko: "한수진 장인",
    bio_en:
      "Versatile artisan crafting all jewelry types. Award-winning designer with international exhibition experience and fluent English communication.",
    bio_ko:
      "모든 주얼리를 제작하는 다재다능한 장인. 수상 경력의 디자이너로 국제 전시 경험과 영어 소통이 가능합니다.",
    specialties: ["ring", "necklace", "earring", "bracelet", "brooch"],
    materials: ["silver", "gold_14k", "gold_18k", "rose_gold", "platinum"],
    techniques: [
      "lost_wax",
      "hand_forging",
      "filigree",
      "stone_setting",
      "engraving",
    ],
    portfolio_urls: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80",
      "https://images.unsplash.com/photo-1515562141589-67f0d7d68681?w=600&q=80",
    ],
    location_en: "Gangnam, Seoul",
    location_ko: "서울 강남",
    avg_rating: 4.8,
    total_reviews: 156,
    total_orders: 410,
    min_price_krw: 200000,
    avg_lead_days: 10,
    is_verified: true,
    is_active: true,
    avatar_url:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    years_experience: 20,
  },
  {
    id: "artisan-007",
    display_name_en: "Jung Minho",
    display_name_ko: "정민호 장인",
    bio_en:
      "Young craftsman specializing in rings and necklaces. Brings a fresh, contemporary perspective to traditional Korean metalwork.",
    bio_ko:
      "반지와 목걸이를 전문으로 하는 젊은 장인. 전통 한국 금속 세공에 신선하고 현대적인 감성을 더합니다.",
    specialties: ["ring", "necklace"],
    materials: ["silver", "rose_gold"],
    techniques: ["lost_wax", "filigree"],
    portfolio_urls: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80",
    ],
    location_en: "Incheon",
    location_ko: "인천",
    avg_rating: 4.5,
    total_reviews: 32,
    total_orders: 87,
    min_price_krw: 120000,
    avg_lead_days: 7,
    is_verified: false,
    is_active: true,
    avatar_url:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    years_experience: 8,
  },
  {
    id: "artisan-008",
    display_name_en: "Kang Yeji",
    display_name_ko: "강예지 장인",
    bio_en:
      "Earring and bracelet designer known for vibrant, K-Pop inspired pieces. Combines colorful gemstones with playful metalwork.",
    bio_ko:
      "K-팝에서 영감을 받은 화려한 귀걸이와 팔찌 디자이너. 다채로운 보석과 유쾌한 금속 세공을 결합합니다.",
    specialties: ["earring", "bracelet"],
    materials: ["gold_18k", "gold_14k"],
    techniques: ["stone_setting", "enamel"],
    portfolio_urls: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80",
    ],
    location_en: "Gwangju",
    location_ko: "광주",
    avg_rating: 4.4,
    total_reviews: 28,
    total_orders: 65,
    min_price_krw: 130000,
    avg_lead_days: 9,
    is_verified: false,
    is_active: true,
    avatar_url:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    years_experience: 10,
  },
];

/** Mock 리뷰 — 장인당 2~3개 */
export const MOCK_REVIEWS: ArtisanReview[] = [
  {
    id: "review-001",
    artisan_id: "artisan-001",
    reviewer_name: "Sarah M.",
    rating: 5,
    comment_en:
      "Absolutely stunning wedding band. Master Kim's craftsmanship is unmatched. The engraving detail is perfect.",
    comment_ko:
      "정말 놀라운 웨딩밴드입니다. 김 장인의 솜씨는 타의 추종을 불허합니다. 조각 디테일이 완벽해요.",
    created_at: "2026-01-15",
  },
  {
    id: "review-002",
    artisan_id: "artisan-001",
    reviewer_name: "James L.",
    rating: 5,
    comment_en:
      "The 18K gold ring exceeded my expectations. Beautiful Korean-inspired pattern. Will order again.",
    comment_ko:
      "18K 골드 반지가 기대 이상이었습니다. 아름다운 한국적 패턴이에요. 다시 주문할 예정입니다.",
    created_at: "2026-01-28",
  },
  {
    id: "review-003",
    artisan_id: "artisan-002",
    reviewer_name: "Emily K.",
    rating: 5,
    comment_en:
      "The rose gold necklace is gorgeous. Eunha understood exactly what I wanted from the AI design.",
    comment_ko:
      "로즈 골드 목걸이가 정말 아름다워요. 은하 장인이 AI 디자인에서 제가 원하는 것을 정확히 이해했어요.",
    created_at: "2026-02-01",
  },
  {
    id: "review-004",
    artisan_id: "artisan-002",
    reviewer_name: "Mika T.",
    rating: 4,
    comment_en:
      "Beautiful necklace, slightly longer wait than expected but the quality made it worth it.",
    comment_ko:
      "아름다운 목걸이, 예상보다 약간 오래 걸렸지만 품질이 그만한 가치가 있었어요.",
    created_at: "2026-02-05",
  },
  {
    id: "review-005",
    artisan_id: "artisan-003",
    reviewer_name: "Anna C.",
    rating: 5,
    comment_en:
      "These ocean-inspired earrings are my favorite piece of jewelry. Jiyeon is incredibly talented.",
    comment_ko:
      "바다에서 영감을 받은 이 귀걸이는 제가 가장 좋아하는 주얼리예요. 지연 장인은 정말 재능이 뛰어나요.",
    created_at: "2026-01-20",
  },
  {
    id: "review-006",
    artisan_id: "artisan-003",
    reviewer_name: "David W.",
    rating: 5,
    comment_en:
      "Bought earrings for my wife. She loves the delicate Korean design. Fast shipping from Busan.",
    comment_ko:
      "아내를 위해 귀걸이를 구매했어요. 섬세한 한국적 디자인을 좋아합니다. 부산에서 빠른 배송이었어요.",
    created_at: "2026-02-08",
  },
  {
    id: "review-007",
    artisan_id: "artisan-004",
    reviewer_name: "Michael R.",
    rating: 4,
    comment_en:
      "Solid bracelet with great geometric patterns. The platinum finish is superb.",
    comment_ko:
      "멋진 기하학적 패턴의 견고한 팔찌. 플래티넘 마감이 뛰어납니다.",
    created_at: "2026-01-25",
  },
  {
    id: "review-008",
    artisan_id: "artisan-005",
    reviewer_name: "Claire H.",
    rating: 5,
    comment_en:
      "The najeon brooch is a masterpiece. You can see the 30 years of expertise in every detail.",
    comment_ko:
      "나전 브로치는 걸작입니다. 30년의 전문성이 모든 디테일에서 느껴져요.",
    created_at: "2026-01-18",
  },
  {
    id: "review-009",
    artisan_id: "artisan-005",
    reviewer_name: "Yuki S.",
    rating: 5,
    comment_en:
      "Incredible mother-of-pearl work. Master Yoon is a true national treasure.",
    comment_ko:
      "놀라운 자개 세공. 윤 장인은 진정한 국보급 장인입니다.",
    created_at: "2026-02-03",
  },
  {
    id: "review-010",
    artisan_id: "artisan-006",
    reviewer_name: "Lisa P.",
    rating: 5,
    comment_en:
      "Soojin made the most beautiful ring from my AI design. Professional communication and fast delivery.",
    comment_ko:
      "수진 장인이 제 AI 디자인으로 가장 아름다운 반지를 만들어줬어요. 전문적인 소통과 빠른 배송.",
    created_at: "2026-02-10",
  },
  {
    id: "review-011",
    artisan_id: "artisan-006",
    reviewer_name: "Tom B.",
    rating: 5,
    comment_en:
      "Ordered a full set — ring, necklace, earrings. All perfectly matched. Amazing versatility.",
    comment_ko:
      "풀 세트를 주문했어요 — 반지, 목걸이, 귀걸이. 모두 완벽하게 맞았습니다. 놀라운 다재다능함.",
    created_at: "2026-01-30",
  },
  {
    id: "review-012",
    artisan_id: "artisan-006",
    reviewer_name: "Rachel N.",
    rating: 4,
    comment_en:
      "Great quality but premium pricing. Worth it for the craftsmanship though.",
    comment_ko:
      "좋은 품질이지만 프리미엄 가격대. 그래도 솜씨를 생각하면 가치가 있어요.",
    created_at: "2026-02-07",
  },
  {
    id: "review-013",
    artisan_id: "artisan-007",
    reviewer_name: "Alex J.",
    rating: 5,
    comment_en:
      "Fresh, modern take on Korean jewelry. Minho's silver ring is now my everyday wear.",
    comment_ko:
      "한국 주얼리에 대한 신선하고 현대적인 해석. 민호 장인의 실버 반지를 매일 착용합니다.",
    created_at: "2026-02-06",
  },
  {
    id: "review-014",
    artisan_id: "artisan-007",
    reviewer_name: "Sophie L.",
    rating: 4,
    comment_en:
      "Lovely necklace at a great price point. Affordable luxury from a young talented artisan.",
    comment_ko:
      "좋은 가격대의 사랑스러운 목걸이. 젊고 재능있는 장인의 저렴한 럭셔리.",
    created_at: "2026-02-09",
  },
  {
    id: "review-015",
    artisan_id: "artisan-008",
    reviewer_name: "Nina G.",
    rating: 4,
    comment_en:
      "Love the K-Pop vibes in these earrings! Colorful and fun, exactly what I wanted.",
    comment_ko:
      "이 귀걸이의 K-팝 감성이 좋아요! 화려하고 재미있어요, 딱 제가 원하던 거예요.",
    created_at: "2026-02-04",
  },
  {
    id: "review-016",
    artisan_id: "artisan-008",
    reviewer_name: "Kevin O.",
    rating: 5,
    comment_en:
      "The bracelet is a real statement piece. Gold work is impressive for the price.",
    comment_ko:
      "팔찌가 정말 눈에 띄는 작품이에요. 가격 대비 골드 세공이 인상적입니다.",
    created_at: "2026-02-11",
  },
];

/** 장인 ID로 리뷰 가져오기 */
export function getReviewsByArtisan(artisanId: string): ArtisanReview[] {
  return MOCK_REVIEWS.filter((r) => r.artisan_id === artisanId);
}

/** 장인 ID로 프로필 가져오기 */
export function getArtisanById(id: string): ArtisanProfile | undefined {
  return MOCK_ARTISANS.find((a) => a.id === id);
}
