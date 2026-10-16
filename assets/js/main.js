// Portfólio · Gabriel Rizzo
// Menu no celular, copiar e-mail, ano do rodapé, índice dos estudos de caso
// e revelação discreta no scroll. O conteúdo continua acessível sem este arquivo.

(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Região anunciada por leitores de tela (feedback de "copiado")
  const status = document.createElement("p");
  status.className = "visually-hidden";
  status.setAttribute("role", "status");
  document.body.append(status);

  // Menu no celular
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Fechar" : "Menu";
      root.classList.toggle("nav-open", open);
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Copiar e-mail
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback para file:// e navegadores sem a API de área de transferência
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      const ok = document.execCommand("copy");
      field.remove();
      return ok;
    }
  };

  document.querySelectorAll("[data-copy]").forEach((button) => {
    const label = button.textContent;
    button.hidden = false;
    button.addEventListener("click", async () => {
      const ok = await copyText(button.dataset.copy);
      button.textContent = ok ? "Copiado" : "Erro";
      button.toggleAttribute("data-copied", ok);
      status.textContent = ok ? "E-mail copiado para a área de transferência." : "Não foi possível copiar o e-mail.";
      setTimeout(() => {
        button.textContent = label;
        button.removeAttribute("data-copied");
      }, 2000);
    });
  });

  // Ano do rodapé
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // Índice dos estudos de caso: marca a seção visível
  const tocLinks = [...document.querySelectorAll(".case-toc a[href^='#']")];

  if (tocLinks.length && "IntersectionObserver" in window) {
    const byId = new Map(tocLinks.map((link) => [link.getAttribute("href").slice(1), link]));
    const tocObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          tocLinks.forEach((link) => link.removeAttribute("aria-current"));
          byId.get(entry.target.id)?.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    byId.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) tocObserver.observe(section);
    });
  }

  // Revelação no scroll
  const items = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  items.forEach((el) => observer.observe(el));

  // Ao seguir um link interno, mostra a seção de destino na hora
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    const target = link && document.getElementById(link.getAttribute("href").slice(1));
    if (!target) return;
    target.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("is-visible");
      observer.unobserve(el);
    });
  });
})();
