export function Chatbot() {
  return (
    <section className="chatbot" aria-label="Asistente Lexiuridicus">
      <button
        className="chatbot-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="chatbot-panel"
      >
        <span>Asistente</span>
      </button>

      <div className="chatbot-panel" id="chatbot-panel" hidden>
        <div className="chatbot-header">
          <div>
            <strong>Lexiuridicus</strong>
            <span>Asistente corporativo</span>
          </div>
          <button className="chatbot-close" type="button" aria-label="Cerrar">
            x
          </button>
        </div>

        <div className="chatbot-messages" aria-live="polite">
          <div className="chatbot-message bot">
            Hola. Puedo orientarte de forma general sobre acciones, imagen
            empresarial, gobierno corporativo o diagnostico. No reemplazo
            asesoria juridica.
          </div>
        </div>

        <div className="chatbot-quick-actions" aria-label="Preguntas rapidas">
          <button type="button" data-chatbot-question="acciones">
            Acciones
          </button>
          <button type="button" data-chatbot-question="inversionistas">
            Inversionistas
          </button>
          <button type="button" data-chatbot-question="decisiones">
            Decisiones internas
          </button>
          <button type="button" data-chatbot-question="diagnostico">
            Diagnostico
          </button>
        </div>

        <form className="chatbot-form">
          <label className="sr-only" htmlFor="chatbot-input">
            Escribe tu pregunta
          </label>
          <input
            id="chatbot-input"
            name="message"
            placeholder="Escribe una pregunta..."
            autoComplete="off"
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}
