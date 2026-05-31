import "./style.css";

function initCursorGlow(): void {
  const glow = document.getElementById("cursor-glow");
  if (!glow) return;
  let timeout: ReturnType<typeof setTimeout>;
  document.addEventListener("mousemove", (e: MouseEvent) => {
    glow.style.opacity = "1";
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      glow.style.opacity = "0";
    }, 2000);
  });
}

function initMobileMenu(): void {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.add("hidden"));
  });
}

function initThemeToggle(): void {
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  if (!toggle || !icon) return;
  const html = document.documentElement;
  toggle.addEventListener("click", () => {
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      icon.setAttribute(
        "d",
        "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      );
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      icon.setAttribute(
        "d",
        "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      );
    }
  });
}

function initRevealAnimations(): void {
  const revealEls = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );
  if (!revealEls.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
}

function initProjectFilter(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".filter-btn");
  const cards = document.querySelectorAll<HTMLDivElement>(".project-card");
  if (!buttons.length || !cards.length) return;

  function setActive(active: HTMLButtonElement): void {
    buttons.forEach((btn) => {
      btn.classList.remove(
        "bg-emerald-500/10",
        "border-emerald-500/30",
        "text-emerald-400"
      );
      btn.classList.add("text-slate-300");
    });
    active.classList.remove("text-slate-300");
    active.classList.add("bg-emerald-500/10", "border-emerald-500/30", "text-emerald-400");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      setActive(btn);
      cards.forEach((card) => {
        if (!filter || filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
          card.classList.add("visible");
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function initNavbarScroll(): void {
  const navInner = document.getElementById("nav-inner");
  if (!navInner) return;
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const current = window.pageYOffset;
    if (current > 100) {
      navInner.style.borderColor = "rgba(255,255,255,0.15)";
      navInner.style.backgroundColor = "rgba(15,23,42,0.95)";
    } else {
      navInner.style.borderColor = "rgba(255,255,255,0.1)";
      navInner.style.backgroundColor = "rgba(15,23,42,0.8)";
    }
    lastScroll = current;
  });
}

function initContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  const toast = document.getElementById("toast");
  if (!form || !toast) return;

  form.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Sending...
    `;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.classList.remove("translate-y-4", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");
      setTimeout(() => {
        toast.classList.remove("translate-y-0", "opacity-100");
        toast.classList.add("translate-y-4", "opacity-0");
      }, 3000);
      form.reset();
    } catch {
      //
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

function initSkillCards(): void {
  const cards = document.querySelectorAll<HTMLDivElement>(".skill-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
}

function initSmoothScroll(): void {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e: Event) => {
      const href = (anchor as HTMLAnchorElement).getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCursorGlow();
  initMobileMenu();
  initThemeToggle();
  initRevealAnimations();
  initProjectFilter();
  //initNavbarScroll();
  initContactForm();
  initSkillCards();
  initSmoothScroll();
});
