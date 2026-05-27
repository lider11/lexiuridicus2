import type { FormEvent } from "react";

type AdminLoginProps = {
  tokenInput: string;
  onTokenInputChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AdminLogin({
  tokenInput,
  onTokenInputChange,
  onSubmit,
}: AdminLoginProps) {
  return (
    <section className="admin-panel admin-login">
      <div>
        <span className="eyebrow">Acceso interno</span>
        <h2>Ingresa al panel administrativo</h2>
        <p>
          Usa el token configurado en el archivo `.env` para proteger clientes,
          blog y comentarios.
        </p>
      </div>

      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Token de administrador
          <input
            onChange={(event) => onTokenInputChange(event.target.value)}
            placeholder="ADMIN_TOKEN"
            type="password"
            value={tokenInput}
          />
        </label>

        <button className="button" type="submit">
          Entrar al panel
        </button>
      </form>
    </section>
  );
}
