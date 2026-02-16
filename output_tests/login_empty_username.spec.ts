import { test, expect } from "@playwright/test";

test("Login fails when username is empty", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.locator("[data-testid=\"username\"]").fill("");
  await page.locator("[data-testid=\"password\"]").fill("somePass");
  await page.locator("[data-testid=\"login-btn\"]").click();
  await expect(page.locator("[data-testid=\"error-banner\"]")).toContainText("Invalid credentials");
});