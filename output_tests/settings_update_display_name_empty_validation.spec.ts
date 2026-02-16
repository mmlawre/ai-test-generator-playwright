import { test, expect } from "@playwright/test";

test("Show validation error when display name is empty", async ({ page }) => {
  await page.goto("http://localhost:3000/settings");
  await page.locator("[data-testid=\"display-name\"]").fill("");
  await page.locator("[data-testid=\"save-btn\"]").click();
  await expect(page.locator("[data-testid=\"validation\"]")).toContainText("Required");
});