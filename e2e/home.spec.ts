import { expect, test } from "@playwright/test";

test("la pagina principal carga correctamente", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Lexiuridicus/i);
  await expect(page.locator("body")).toContainText(
    /derecho corporativo|estructura juridica|Lexiuridicus/i,
  );
});

test("el formulario de diagnostico empresarial es visible", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /diagnostico empresarial/i }),
  ).toBeVisible();
  await expect(page.getByLabel(/nombre completo/i)).toBeVisible();
  await expect(page.getByLabel(/correo/i)).toBeVisible();
  await expect(page.getByLabel(/telefono/i)).toBeVisible();
});
