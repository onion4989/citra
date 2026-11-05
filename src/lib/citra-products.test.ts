import { describe, expect, it } from "vitest";
import { CITRA_PRODUCTS } from "@/lib/citra-products";

describe("CITRA_PRODUCTS", () => {
  it("5 フレーバーを持つ", () => {
    expect(CITRA_PRODUCTS).toHaveLength(5);
  });

  it("id と name が揃っている", () => {
    expect(CITRA_PRODUCTS.map((p) => p.id)).toEqual([
      "grove",
      "half-cut",
      "mist",
      "duo",
      "ribbon",
    ]);
    expect(CITRA_PRODUCTS.map((p) => p.name)).toEqual([
      "CITRA Grove",
      "CITRA Half Cut",
      "CITRA Mist",
      "CITRA Duo",
      "CITRA Ribbon",
    ]);
  });
});
