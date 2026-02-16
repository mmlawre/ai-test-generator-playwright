import { test, expect } from "@playwright/test";

test("Saving settings without changing display name shows saved message", async ({ page }) => {
  await page.goto("http://localhost:3000/settings");
  await page.locator("[data-testid=\"save-btn\"]").click();
  await expect(page.locator("[data-testid=\"toast\"]")).toContainText("Saved");
});