/**
 * Supabase 브라우저 클라이언트 테스트
 * 우선순위: P3 (인프라)
 */

// createBrowserClient를 모킹
jest.mock("@supabase/ssr", () => ({
  createBrowserClient: jest.fn(() => ({ from: jest.fn() })),
}));

import { createClient } from "./client";

const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterAll(() => {
  process.env = originalEnv;
});

describe("createClient()", () => {
  it("환경변수가 없으면 null을 반환한다", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const client = createClient();
    expect(client).toBeNull();
  });

  it("SUPABASE_URL만 있고 ANON_KEY가 없으면 null을 반환한다", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const client = createClient();
    expect(client).toBeNull();
  });

  it("두 환경변수가 모두 있으면 클라이언트를 반환한다", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
    const client = createClient();
    expect(client).not.toBeNull();
  });
});
