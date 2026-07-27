import type { FormEvent } from "react";

type AdminLoginProps = {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AdminLogin({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: AdminLoginProps) {
  return (
    <section className="admin-panel admin-login">
      <div>
        <span className="eyebrow">Acceso interno</span>
        <h2>Ingresa al panel administrativo</h2>
        <p>
          Usa tu cuenta individual. El acceso se limita a tu organización y a
          los permisos asignados.
        </p>
      </div>

      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Correo electrónico
          <input
            autoComplete="username"
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="nombre@lexiuridicus.site"
            type="email"
            value={email}
          />
        </label>

        <label>
          Contraseña
          <input
            autoComplete="current-password"
            onChange={(event) => onPasswordChange(event.target.value)}
            type="password"
            value={password}
          />
        </label>

        <button className="button" type="submit">
          Entrar al panel
        </button>
      </form>
    </section>
  );
}
