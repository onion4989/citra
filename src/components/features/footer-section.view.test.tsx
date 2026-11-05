import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FooterSection } from "@/components/features/footer-section";

describe("FooterSection", () => {
  it("著作表示を出す", () => {
    render(<FooterSection />);
    expect(
      screen.getAllByText("COPYRIGHT © CITRA. ALL RIGHTS RESERVED.").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("contentinfo", { name: "サイトフッター" }),
    ).toBeInTheDocument();
  });
});
