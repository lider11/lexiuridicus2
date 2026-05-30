"use client";

import { useEffect, useRef, useState } from "react";

type Action = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type ChatMessage = {
  id: number;
  type: "bot" | "user";
  text: string;
  actions?: Action[];
};

type Intent = "acciones" | "inversionistas" | "decisiones" | "diagnostico";

type ConversationContext = {
  intent?: Intent;
  qualified?: boolean;
};

const HIDDEN_PATHS = ["/admin"];

const INTENTS: Record<
  Intent,
  { label: string; serviceParam: string; blogSlug?: string }
> = {
  acciones: {
    label: "Tradición de acciones",
    serviceParam: "Tradicion de acciones",
    blogSlug: "por-que-la-tradicion-de-acciones-importa-en-una-sociedad",
  },
  inversionistas: {
    label: "Imagen empresarial",
    serviceParam: "Imagen empresarial",
    blogSlug: "como-preparar-la-empresa-para-inversionistas",
  },
  decisiones: {
    label: "Gobierno corporativo",
    serviceParam: "Gobierno corporativo",
    blogSlug: "gobierno-corporativo-para-empresas-en-crecimiento",
  },
  diagnostico: {
    label: "Diagnóstico empresarial",
    serviceParam: "",
  },
};

const INITIAL_GREETING =
  "Hola. Puedo orientarte sobre tradición de acciones, imagen empresarial o gobierno corporativo. Esto no reemplaza asesoría jurídica personalizada.";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, type: "bot", text: INITIAL_GREETING },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [context, setContext] = useState<ConversationContext>({});
  const currentIntentLabel = context.intent
    ? INTENTS[context.intent].label
    : null;
  const [isTyping, setIsTyping] = useState(false);

  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageIdRef = useRef(2);

  // Hide chatbot on admin routes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const shouldHide = HIDDEN_PATHS.some((path) =>
        window.location.pathname.startsWith(path),
      );
      if (shouldHide) {
        // We don't render the component at all in this case
      }
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to allow panel animation
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  function addMessage(message: Omit<ChatMessage, "id">) {
    const newMessage: ChatMessage = {
      ...message,
      id: messageIdRef.current++,
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }

  function addBotMessage(text: string, actions?: Action[]) {
    setIsTyping(true);
    // Small delay for natural feel
    setTimeout(() => {
      setIsTyping(false);
      addMessage({ type: "bot", text, actions });
    }, 280);
  }

  function handleUserMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    addMessage({ type: "user", text: trimmed });
    setInputValue("");

    // Process after short delay
    setTimeout(() => {
      processUserInput(trimmed);
    }, 160);
  }

  function processUserInput(text: string) {
    const normalized = normalize(text);

    // Check for restart / new conversation
    if (
      normalized.includes("reiniciar") ||
      normalized.includes("otra vez") ||
      normalized.includes("empezar de nuevo")
    ) {
      resetConversation();
      return;
    }

    // Direct diagnostic request
    if (
      normalized.includes("diagnostico") ||
      normalized.includes("consulta") ||
      normalized.includes("formulario")
    ) {
      handleIntent("diagnostico");
      return;
    }

    // Detect main intents
    if (
      normalized.includes("accion") ||
      normalized.includes("titularidad") ||
      normalized.includes("socio") ||
      normalized.includes("propiedad") ||
      normalized.includes("acciones")
    ) {
      handleIntent("acciones");
      return;
    }

    if (
      normalized.includes("inversion") ||
      normalized.includes("inversionista") ||
      normalized.includes("imagen") ||
      normalized.includes("aliado") ||
      normalized.includes("comprador")
    ) {
      handleIntent("inversionistas");
      return;
    }

    if (
      normalized.includes("decision") ||
      normalized.includes("gobierno") ||
      normalized.includes("acta") ||
      normalized.includes("rol") ||
      normalized.includes("administracion")
    ) {
      handleIntent("decisiones");
      return;
    }

    if (normalized.includes("metodo") || normalized.includes("proceso")) {
      addBotMessage(
        "Nuestro método tiene 4 pasos: entender la situación actual, ubicar el frente crítico, revisar soportes documentales y definir una ruta clara de acción.",
        [
          { label: "Ver método completo", href: "/metodo" },
          { label: "Solicitar diagnóstico", href: "/#consulta" },
        ],
      );
      return;
    }

    if (
      normalized.includes("blog") ||
      normalized.includes("guia") ||
      normalized.includes("articulo")
    ) {
      addBotMessage(
        "En el blog encuentras guías prácticas sobre los tres frentes que más impactan a empresas con socios e inversionistas.",
        [{ label: "Ir al blog", href: "/blog" }],
      );
      return;
    }

    // Default / clarification
    addBotMessage(
      "¿Tu duda está relacionada con propiedad de acciones, preparación para inversionistas, o reglas de decisión interna?",
      [
        {
          label: "Tradición de acciones",
          onClick: () => handleIntent("acciones"),
        },
        {
          label: "Imagen empresarial",
          onClick: () => handleIntent("inversionistas"),
        },
        {
          label: "Gobierno corporativo",
          onClick: () => handleIntent("decisiones"),
        },
        { label: "Solicitar diagnóstico", href: "/#consulta" },
      ],
    );
  }

  function normalize(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function handleIntent(intent: Intent) {
    const intentData = INTENTS[intent];
    setContext({ intent, qualified: false });

    if (intent === "diagnostico") {
      addBotMessage(
        "El diagnóstico empresarial toma unos 2 minutos. Te ayudamos a identificar el servicio más adecuado para tu empresa.",
        [
          {
            label: "Abrir formulario de diagnóstico",
            href: "/#consulta",
          },
          { label: "Ver para quién es", href: "/para-quien-es" },
        ],
      );
      return;
    }

    const serviceName = intentData.label;

    addBotMessage(
      `Entendido. Hablemos de ${serviceName.toLowerCase()}. ¿Tu empresa actualmente tiene socios o accionistas?`,
      [
        {
          label: "Sí, tiene socios/accionistas",
          onClick: () => handleQualification(intent, "yes"),
        },
        {
          label: "No tiene socios",
          onClick: () => handleQualification(intent, "no"),
        },
        {
          label: "No estoy seguro",
          onClick: () => handleQualification(intent, "unsure"),
        },
      ],
    );
  }

  function handleQualification(
    intent: Intent,
    answer: "yes" | "no" | "unsure",
  ) {
    const intentData = INTENTS[intent];
    const serviceParam = intentData.serviceParam;
    const blogHref = intentData.blogSlug
      ? `/blog/${intentData.blogSlug}`
      : undefined;

    setContext({ intent, qualified: true });

    let responseText = "";
    const actions: Action[] = [];

    if (intent === "acciones") {
      if (answer === "yes") {
        responseText =
          "Perfecto. Cuando hay socios o accionistas, la trazabilidad de las acciones es crítica para evitar conflictos futuros y facilitar cualquier operación corporativa.";
      } else if (answer === "no") {
        responseText =
          "Aun sin socios actuales, es muy útil tener la tradición de acciones ordenada desde el inicio. Facilita futuras capitalizaciones o entrada de inversionistas.";
      } else {
        responseText =
          "No hay problema. Revisar la tradición de acciones es una de las mejores formas de ganar claridad sobre la propiedad real de la empresa.";
      }
      actions.push({
        label: "Diagnosticar tradición de acciones",
        href: `/?servicio=${encodeURIComponent(serviceParam)}#consulta`,
      });
      if (blogHref) {
        actions.push({ label: "Leer guía sobre acciones", href: blogHref });
      }
    }

    if (intent === "inversionistas") {
      if (answer === "yes") {
        responseText =
          "Cuando hay socios, los inversionistas y compradores prestan mucha atención a la claridad de la propiedad y la documentación corporativa.";
      } else {
        responseText =
          "Preparar la imagen empresarial es clave para transmitir orden y reducir el riesgo percibido ante terceros.";
      }
      actions.push({
        label: "Diagnosticar imagen empresarial",
        href: `/?servicio=${encodeURIComponent(serviceParam)}#consulta`,
      });
      if (blogHref) {
        actions.push({
          label: "Leer guía para inversionistas",
          href: blogHref,
        });
      }
    }

    if (intent === "decisiones") {
      responseText =
        "Las empresas que crecen sin reglas claras de decisión suelen acumular riesgos de continuidad y conflictos entre socios.";
      actions.push({
        label: "Diagnosticar gobierno corporativo",
        href: `/?servicio=${encodeURIComponent(serviceParam)}#consulta`,
      });
      if (blogHref) {
        actions.push({ label: "Ver método de trabajo", href: "/metodo" });
      }
    }

    // Always add a strong direct diagnostic CTA
    actions.unshift({
      label: "Solicitar diagnóstico ahora",
      href: `/?servicio=${encodeURIComponent(serviceParam)}#consulta`,
    });

    addBotMessage(responseText, actions);

    // Offer secondary help after a moment
    setTimeout(() => {
      addBotMessage(
        "¿Quieres que te ayude con otra área o prefieres hablar directamente con el equipo?",
        [
          { label: "Otra área", onClick: () => showTopicSelector() },
          { label: "Ir al formulario", href: "/#consulta" },
        ],
      );
    }, 4200);
  }

  function showTopicSelector() {
    addBotMessage("¿Sobre qué tema te gustaría recibir orientación?", [
      {
        label: "Tradición de acciones",
        onClick: () => handleIntent("acciones"),
      },
      {
        label: "Imagen empresarial",
        onClick: () => handleIntent("inversionistas"),
      },
      {
        label: "Gobierno corporativo",
        onClick: () => handleIntent("decisiones"),
      },
      { label: "Solicitar diagnóstico", href: "/#consulta" },
    ]);
  }

  function resetConversation() {
    messageIdRef.current = 2;
    setMessages([{ id: 1, type: "bot", text: INITIAL_GREETING }]);
    setContext({});
    setInputValue("");
  }

  function toggleChat() {
    const next = !isOpen;
    setIsOpen(next);

    if (next && messages.length === 0) {
      // Shouldn't happen, but safety
      setMessages([{ id: 1, type: "bot", text: INITIAL_GREETING }]);
    }
  }

  function closeChat() {
    setIsOpen(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleUserMessage(inputValue);
  }

  // Quick action buttons (initial + contextual)
  const quickActions: Action[] = [
    { label: "Acciones", onClick: () => handleIntent("acciones") },
    { label: "Inversionistas", onClick: () => handleIntent("inversionistas") },
    { label: "Decisiones", onClick: () => handleIntent("decisiones") },
    { label: "Diagnóstico", onClick: () => handleIntent("diagnostico") },
  ];

  // Don't render on admin
  if (typeof window !== "undefined") {
    const isAdmin = HIDDEN_PATHS.some((p) =>
      window.location.pathname.startsWith(p),
    );
    if (isAdmin) return null;
  }

  return (
    <section className="chatbot" aria-label="Asistente Lexiuridicus">
      <button
        className="chatbot-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
        onClick={toggleChat}
      >
        <span>{isOpen ? "Cerrar" : "Asistente"}</span>
      </button>

      <div
        className="chatbot-panel"
        id="chatbot-panel"
        hidden={!isOpen}
        role="dialog"
        aria-modal="false"
      >
        <div className="chatbot-header">
          <div>
            <strong>Lexiuridicus</strong>
            <span>Asistente corporativo</span>
          </div>
          <button
            className="chatbot-close"
            type="button"
            aria-label="Cerrar asistente"
            onClick={closeChat}
          >
            ×
          </button>
        </div>

        {currentIntentLabel && (
          <div className="chatbot-topic-pill" aria-live="polite">
            Tema: <strong>{currentIntentLabel}</strong>
          </div>
        )}

        <div
          className="chatbot-messages"
          ref={messagesRef}
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-message ${msg.type}`}>
              {msg.text}
              {msg.actions && msg.actions.length > 0 && (
                <div className="chatbot-message-actions">
                  {msg.actions.map((action, index) => {
                    if (action.onClick) {
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={action.onClick}
                        >
                          {action.label}
                        </button>
                      );
                    }
                    return (
                      <a key={index} href={action.href}>
                        {action.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="chatbot-message bot chatbot-typing">
              <span>·</span>
              <span>·</span>
              <span>·</span>
            </div>
          )}
        </div>

        {/* Quick actions row */}
        <div className="chatbot-quick-actions" aria-label="Temas frecuentes">
          {quickActions.map((action, index) => (
            <button key={index} type="button" onClick={action.onClick}>
              {action.label}
            </button>
          ))}
        </div>

        <form className="chatbot-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="chatbot-input">
            Escribe tu pregunta
          </label>
          <input
            ref={inputRef}
            id="chatbot-input"
            name="message"
            placeholder="Escribe tu duda o elige un tema..."
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" disabled={!inputValue.trim()}>
            Enviar
          </button>
        </form>

        {/* Subtle restart */}
        {messages.length > 2 && (
          <button
            type="button"
            onClick={resetConversation}
            className="chatbot-restart"
            aria-label="Reiniciar conversación"
          >
            Reiniciar conversación
          </button>
        )}
      </div>
    </section>
  );
}
