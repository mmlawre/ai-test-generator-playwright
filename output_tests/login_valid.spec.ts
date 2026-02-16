import { test, expect } from "@playwright/test";

test("Login succeeds with valid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.locator("[data-testid=\"username\"]").fill("validUser");
  await page.locator("[data-testid=\"password\"]").fill("validPass");
  await page.locator("[data-testid=\"login-btn\"]").click();
  await expect(page.locator("[data-testid=\"welcome\"]")).toContainText("Welcome");
});