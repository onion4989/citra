import { describe, expect, it } from "vitest";
import {
  clamp,
  heroTotalVh,
  productLocalProgress,
  productStoryProgressFromY,
  videoProgressFromY,
  videoScrollShare,
} from "@/lib/hero-scroll";

describe("hero-scroll", () => {
  it("clamp で範囲外を切り詰める", () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(2, 0, 1)).toBe(1);
    expect(clamp(0.5, 0, 1)).toBe(0.5);
  });

  it("heroTotalVh は video と product の合計", () => {
    expect(heroTotalVh()).toBe(800);
  });

  it("videoScrollShare は video 分の割合", () => {
    expect(videoScrollShare()).toBe(300 / 800);
  });

  it("videoProgressFromY は 0〜1", () => {
    expect(videoProgressFromY(0, 1000)).toBe(0);
    expect(videoProgressFromY(500, 1000)).toBe(0.5);
    expect(videoProgressFromY(1000, 1000)).toBe(1);
    expect(videoProgressFromY(10, 0)).toBe(0);
  });

  it("productStoryProgressFromY は video 帯の後から進む", () => {
    const scrollable = 800;
    const videoEnd = scrollable * videoScrollShare();
    expect(productStoryProgressFromY(0, scrollable)).toBe(0);
    expect(productStoryProgressFromY(videoEnd, scrollable)).toBe(0);
    expect(productStoryProgressFromY(scrollable, scrollable)).toBe(1);
  });

  it("productLocalProgress はスロットごとに 0〜1", () => {
    expect(productLocalProgress(0, 0, 5)).toBe(0);
    expect(productLocalProgress(0.2, 0, 5)).toBe(1);
    expect(productLocalProgress(0.2, 1, 5)).toBe(0);
    expect(productLocalProgress(0.3, 1, 5)).toBeCloseTo(0.5);
  });
});
