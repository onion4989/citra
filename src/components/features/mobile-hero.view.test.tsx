import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MobileHero } from "@/components/features/mobile-hero";

describe("MobileHero", () => {
  it("ブランド名を出す", () => {
    render(<MobileHero />);
    expect(
      screen.getByRole("heading", { level: 1, name: "CITRA" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "CITRA hero" })).toBeInTheDocument();
  });
});
