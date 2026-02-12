/**
 * Zustand Store — design-store 테스트
 * 우선순위: P2 (상태 관리)
 */
import { useDesignStore } from "./design-store";

// 매 테스트마다 스토어 초기화
beforeEach(() => {
  useDesignStore.setState({
    selectedCategory: null,
    jewelryType: null,
    material: null,
    userPrompt: "",
    generatedImages: [],
    selectedImageIndex: null,
    isGenerating: false,
    generationProgress: 0,
  });
});

describe("useDesignStore", () => {
  describe("초기 상태", () => {
    it("모든 필드가 초기값이다", () => {
      const state = useDesignStore.getState();
      expect(state.selectedCategory).toBeNull();
      expect(state.jewelryType).toBeNull();
      expect(state.material).toBeNull();
      expect(state.userPrompt).toBe("");
      expect(state.generatedImages).toEqual([]);
      expect(state.selectedImageIndex).toBeNull();
      expect(state.isGenerating).toBe(false);
      expect(state.generationProgress).toBe(0);
    });
  });

  describe("카테고리 선택", () => {
    it("setCategory로 카테고리를 설정한다", () => {
      useDesignStore.getState().setCategory("hanbok");
      expect(useDesignStore.getState().selectedCategory).toBe("hanbok");
    });

    it("setCategory(null)로 선택을 해제한다", () => {
      useDesignStore.getState().setCategory("hanbok");
      useDesignStore.getState().setCategory(null);
      expect(useDesignStore.getState().selectedCategory).toBeNull();
    });
  });

  describe("주얼리 타입 / 소재 선택", () => {
    it("setJewelryType으로 주얼리 타입을 설정한다", () => {
      useDesignStore.getState().setJewelryType("ring");
      expect(useDesignStore.getState().jewelryType).toBe("ring");
    });

    it("setMaterial로 소재를 설정한다", () => {
      useDesignStore.getState().setMaterial("gold_18k");
      expect(useDesignStore.getState().material).toBe("gold_18k");
    });
  });

  describe("프롬프트 입력", () => {
    it("setUserPrompt로 프롬프트를 설정한다", () => {
      useDesignStore.getState().setUserPrompt("cherry blossom motif");
      expect(useDesignStore.getState().userPrompt).toBe(
        "cherry blossom motif"
      );
    });
  });

  describe("이미지 생성 결과", () => {
    it("setGeneratedImages로 이미지 배열을 설정하고 선택 인덱스를 초기화한다", () => {
      useDesignStore.getState().selectImage(2);
      const images = ["img1.webp", "img2.webp", "img3.webp", "img4.webp"];
      useDesignStore.getState().setGeneratedImages(images);

      const state = useDesignStore.getState();
      expect(state.generatedImages).toEqual(images);
      expect(state.selectedImageIndex).toBeNull();
    });

    it("selectImage로 이미지를 선택한다", () => {
      useDesignStore.getState().selectImage(1);
      expect(useDesignStore.getState().selectedImageIndex).toBe(1);
    });
  });

  describe("생성 상태", () => {
    it("setGenerating으로 생성 중 상태를 설정한다", () => {
      useDesignStore.getState().setGenerating(true);
      expect(useDesignStore.getState().isGenerating).toBe(true);
    });

    it("setProgress로 진행률을 설정한다", () => {
      useDesignStore.getState().setProgress(50);
      expect(useDesignStore.getState().generationProgress).toBe(50);
    });
  });

  describe("초기화", () => {
    it("resetStudio로 모든 상태를 초기화한다", () => {
      // 상태 변경
      useDesignStore.getState().setCategory("kpop");
      useDesignStore.getState().setJewelryType("necklace");
      useDesignStore.getState().setMaterial("platinum");
      useDesignStore.getState().setUserPrompt("test prompt");
      useDesignStore.getState().setGeneratedImages(["img.webp"]);
      useDesignStore.getState().selectImage(0);
      useDesignStore.getState().setGenerating(true);
      useDesignStore.getState().setProgress(75);

      // 초기화
      useDesignStore.getState().resetStudio();

      const state = useDesignStore.getState();
      expect(state.selectedCategory).toBeNull();
      expect(state.jewelryType).toBeNull();
      expect(state.material).toBeNull();
      expect(state.userPrompt).toBe("");
      expect(state.generatedImages).toEqual([]);
      expect(state.selectedImageIndex).toBeNull();
      expect(state.isGenerating).toBe(false);
      expect(state.generationProgress).toBe(0);
    });
  });
});
