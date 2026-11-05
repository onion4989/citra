import { expect, type Page } from "@playwright/test";

export async function checkHome(page: Page) {
  await page.goto("/");
  // Mobile uses <h1>; desktop scrub hero uses a <p> brand mark (md+).
  const hero = page.getByRole("region", { name: "CITRA hero" }).locator("visible=true");
  await expect(hero.first()).toBeVisible();
  await expect(hero.getByText("CITRA", { exact: true }).first()).toBeVisible();

  const marks = [
    page.getByRole("region", { name: "CITRA 紹介" }),
    page.getByRole("heading", { name: "CITRA（シトラ）とは？" }).first(),
  ];

  for (const mark of marks) {
    await mark.scrollIntoViewIfNeeded();
    await expect(mark).toBeVisible();
  }

  const footer = page.getByRole("contentinfo", { name: "サイトフッター" });
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeVisible();
  await expect(
    footer
      .getByText("COPYRIGHT © CITRA. ALL RIGHTS RESERVED.")
      .locator("visible=true")
      .first(),
  ).toBeVisible();
}
