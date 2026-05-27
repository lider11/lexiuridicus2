(function () {
  var hiddenPaths = ["/admin"];

  if (hiddenPaths.some(function (path) { return window.location.pathname.startsWith(path); })) {
    return;
  }

  var widget = document.querySelector(".chatbot");

  if (!widget) {
    return;
  }

  var toggle = widget.querySelector(".chatbot-toggle");
  var panel = widget.querySelector(".chatbot-panel");
  var closeButton = widget.querySelector(".chatbot-close");
  var messages = widget.querySelector(".chatbot-messages");
  var form = widget.querySelector(".chatbot-form");
  var input = widget.querySelector("#chatbot-input");
  var quickButtons = widget.querySelectorAll("[data-chatbot-question]");

  var flows = {
    acciones: {
      text:
        "Si hay dudas sobre titularidad, transferencias o soportes de acciones, conviene revisar Tradicion de acciones.",
      actions: [
        {
          label: "Diagnosticar acciones",
          href: "/?servicio=Tradicion%20de%20acciones#consulta",
        },
        {
          label: "Leer guia",
          href: "/blog/por-que-la-tradicion-de-acciones-importa-en-una-sociedad",
        },
      ],
    },
    inversionistas: {
      text:
        "Si la empresa se prepara para inversionistas, aliados o compradores, conviene revisar imagen empresarial: documentos, narrativa y riesgos visibles.",
      actions: [
        {
          label: "Revisar imagen empresarial",
          href: "/?servicio=Imagen%20empresarial#consulta",
        },
        {
          label: "Leer guia",
          href: "/blog/como-preparar-la-empresa-para-inversionistas",
        },
      ],
    },
    decisiones: {
      text:
        "Si las decisiones dependen de acuerdos informales, conviene revisar gobierno corporativo: roles, actas, reglas y procesos internos.",
      actions: [
        {
          label: "Ordenar decisiones",
          href: "/?servicio=Gobierno%20corporativo#consulta",
        },
        {
          label: "Ver metodo",
          href: "/metodo",
        },
      ],
    },
    diagnostico: {
      text:
        "El diagnostico empresarial toma cerca de 2 minutos. Dejas tus datos y recibes una primera orientacion sobre el servicio adecuado.",
      actions: [
        {
          label: "Solicitar diagnostico",
          href: "/#consulta",
        },
        {
          label: "Para quien es",
          href: "/para-quien-es",
        },
      ],
    },
    metodo: {
      text:
        "El metodo inicia entendiendo la situacion, luego ubicamos el frente critico, revisamos soportes y definimos una ruta de accion.",
      actions: [
        {
          label: "Ver metodo",
          href: "/metodo",
        },
      ],
    },
    blog: {
      text:
        "En el blog encuentras guias sobre acciones, inversionistas y gobierno corporativo para preparar mejor tus decisiones.",
      actions: [
        {
          label: "Ir al blog",
          href: "/blog",
        },
      ],
    },
    contacto: {
      text:
        "Puedes solicitar diagnostico desde el formulario principal o escribir a contacto@lexiuridicus.com.",
      actions: [
        {
          label: "Ir al formulario",
          href: "/#consulta",
        },
      ],
    },
  };

  function openChat() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    input.focus();
  }

  function closeChat() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  function appendText(text, type) {
    var bubble = document.createElement("div");
    bubble.className = "chatbot-message " + type;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  }

  function appendBotFlow(flow) {
    var bubble = appendText(flow.text, "bot");

    if (!flow.actions || !flow.actions.length) {
      return;
    }

    var actionList = document.createElement("div");
    actionList.className = "chatbot-message-actions";

    flow.actions.forEach(function (action) {
      var link = document.createElement("a");
      link.href = action.href;
      link.textContent = action.label;
      actionList.appendChild(link);
    });

    bubble.appendChild(actionList);
    messages.scrollTop = messages.scrollHeight;
  }

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function detectFlow(text) {
    var value = normalize(text);

    if (
      value.includes("accion") ||
      value.includes("titularidad") ||
      value.includes("socio") ||
      value.includes("propiedad")
    ) {
      return flows.acciones;
    }

    if (
      value.includes("inversion") ||
      value.includes("inversionista") ||
      value.includes("imagen") ||
      value.includes("aliado") ||
      value.includes("comprador")
    ) {
      return flows.inversionistas;
    }

    if (
      value.includes("decision") ||
      value.includes("gobierno") ||
      value.includes("acta") ||
      value.includes("rol") ||
      value.includes("administracion")
    ) {
      return flows.decisiones;
    }

    if (
      value.includes("diagnostico") ||
      value.includes("consulta") ||
      value.includes("formulario")
    ) {
      return flows.diagnostico;
    }

    if (value.includes("metodo") || value.includes("proceso")) {
      return flows.metodo;
    }

    if (value.includes("blog") || value.includes("articulo") || value.includes("guia")) {
      return flows.blog;
    }

    if (
      value.includes("contacto") ||
      value.includes("telefono") ||
      value.includes("correo")
    ) {
      return flows.contacto;
    }

    return {
      text:
        "Puedo ayudarte a escoger una ruta. Dime si tu duda es sobre acciones, inversionistas o decisiones internas.",
      actions: [
        {
          label: "Ver servicios",
          href: "/#servicios",
        },
        {
          label: "Solicitar diagnostico",
          href: "/#consulta",
        },
      ],
    };
  }

  function handleQuestion(text) {
    appendText(text, "user");
    window.setTimeout(function () {
      appendBotFlow(detectFlow(text));
    }, 250);
  }

  toggle.addEventListener("click", function () {
    if (panel.hidden) {
      openChat();
    } else {
      closeChat();
    }
  });

  closeButton.addEventListener("click", closeChat);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) {
      closeChat();
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = input.value.trim();

    if (!text) {
      return;
    }

    input.value = "";
    handleQuestion(text);
  });

  quickButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      handleQuestion(button.textContent.trim());
    });
  });
})();
