"use client";

import { FormEvent, useEffect, useState } from "react";

export function LeadForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("servicio");

    if (service) {
      setSelectedService(service);
    }
  }, []);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      ...Object.fromEntries(formData),
      privacy_accepted: formData.get("privacy_accepted") === "true",
    };

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = await response.json();
        setError(payload.error || "No se pudo registrar el cliente.");
        return;
      }

      form.reset();
      setSelectedService("");
      setMessage(
        "Solicitud recibida. Revisaremos tu caso empresarial y te contactaremos pronto.",
      );
    } catch {
      setError(
        "No se pudo enviar la solicitud. Revisa tu conexion e intenta nuevamente.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="form-grid" onSubmit={submitLead}>
      <fieldset>
        <legend>Datos de contacto</legend>
        <label>
          Nombre completo
          <input name="full_name" required placeholder="Nombre de contacto" />
        </label>
        <label>
          Correo
          <input
            name="email"
            required
            type="email"
            placeholder="contacto@empresa.com"
          />
        </label>
        <label>
          Telefono
          <input name="phone" required placeholder="+57 300 000 0000" />
        </label>
      </fieldset>

      <fieldset>
        <legend>Datos de la empresa</legend>
        <label>
          Empresa
          <input name="company" required placeholder="Nombre de la empresa" />
        </label>
        <label>
          Cargo
          <input
            name="role"
            required
            placeholder="Gerente, socio, fundador..."
          />
        </label>
        <label>
          Socios o accionistas
          <select name="shareholder_context" defaultValue="">
            <option value="">Prefiero explicarlo en el mensaje</option>
            <option value="Si tiene socios o accionistas">
              Si tiene socios o accionistas
            </option>
            <option value="No tiene socios o accionistas">
              No tiene socios o accionistas
            </option>
            <option value="No estoy seguro">No estoy seguro</option>
          </select>
        </label>
      </fieldset>

      <fieldset>
        <legend>Necesidad principal</legend>
        <label>
          Servicio requerido
          <select
            name="legal_need"
            onChange={(event) => setSelectedService(event.target.value)}
            required
            value={selectedService}
          >
            <option disabled value="">
              Selecciona un servicio
            </option>
            <option value="Gobierno corporativo">Gobierno corporativo</option>
            <option value="Tradicion de acciones">Tradicion de acciones</option>
            <option value="Imagen empresarial">Imagen empresarial</option>
          </select>
        </label>
        <label>
          Objetivo principal
          <select name="business_goal" required defaultValue="">
            <option disabled value="">
              Que necesita resolver la empresa?
            </option>
            <option value="Ordenar titularidad accionaria">
              Ordenar titularidad accionaria
            </option>
            <option value="Prepararse para inversionistas">
              Prepararse para inversionistas
            </option>
            <option value="Definir reglas de decision">
              Definir reglas de decision
            </option>
            <option value="Revisar estructura actual">
              Revisar estructura actual
            </option>
          </select>
        </label>
        <label>
          Nivel de prioridad
          <select name="urgency" defaultValue="media">
            <option value="baja">Estamos explorando</option>
            <option value="media">
              Queremos ordenar en las proximas semanas
            </option>
            <option value="alta">Necesitamos actuar pronto</option>
          </select>
        </label>
        <label>
          Detalles
          <textarea
            name="notes"
            placeholder="Describe brevemente la situacion actual de la empresa"
          />
        </label>
      </fieldset>
      <label className="check-row">
        <input name="privacy_accepted" required type="checkbox" value="true" />
        <span>
          Acepto el tratamiento de mis datos personales conforme a la{" "}
          <a href="/politica-de-datos" target="_blank" rel="noreferrer">
            politica de tratamiento de datos
          </a>
          .
        </span>
      </label>
      <button className="button" disabled={isSaving} type="submit">
        {isSaving ? "Enviando..." : "Enviar solicitud"}
      </button>
      <p className="form-trust">
        Tu informacion se revisa con reserva. Esta solicitud es orientativa y no
        reemplaza una asesoria juridica personalizada.
      </p>
      {message ? <div className="message">{message}</div> : null}
      {error ? <div className="error">{error}</div> : null}
    </form>
  );
}
