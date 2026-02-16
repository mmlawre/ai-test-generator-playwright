import { test, expect } from "@playwright/test";

test("Login fails with invalid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.locator("[data-testid=\"username\"]").fill("wrongUser");
  await page.locator("[data-testid=\"password\"]").fill("wrongPass");
  await page.locator("[data-testid=\"login-btn\"]").click();
  await expect(page.locator("[data-testid=\"error-banner\"]")).toContainText("Invalid credentials");
});