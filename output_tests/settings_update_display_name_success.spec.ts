import { test, expect } from "@playwright/test";

test("Update display name successfully shows saved message", async ({ page }) => {
  await page.goto("http://localhost:3000/settings");
  await page.locator("[data-testid=\"display-name\"]").fill("NewDisplayName");
  await page.locator("[data-testid=\"save-btn\"]").click();
  await expect(page.locator("[data-testid=\"toast\"]")).toContainText("Saved");
});