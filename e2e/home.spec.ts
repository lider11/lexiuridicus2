import { expect, test } from "@playwright/test";

test("la pagina principal carga correctamente", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Inteligencia Juridica/i);
  await expect(page.locator("body")).toContainText(
    /derecho corporativo|Inteligencia Juridica|Lex Iuridicus/i,
  );
});

test("el formulario de diagnostico empresarial es visible", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /valoracion inicial/i }).first(),
  ).toBeVisible();
  const heroForm = page.getByRole("complementary", {
    name: /formulario de diagnostico/i,
  });
  await expect(heroForm.getByLabel(/nombre completo/i)).toBeVisible();
  await expect(heroForm.getByLabel(/correo/i)).toBeVisible();
  await expect(heroForm.getByLabel(/telefono/i)).toBeVisible();
});
