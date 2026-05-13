const CAMPAIGN_CONFIG = {
  goal: 2500,
  raised: 0,
  donationCount: 0,
  urgentDeadline: "2026-06-15T23:59:59",
  paypalUrl: "https://www.paypal.com/donate/?business=morenoruizjangel%40gmail.com&currency_code=USD"
};

const STORAGE_KEY_MESSAGES = "solidarity_support_messages";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function updateDonationUI() {
  const raisedAmount = document.getElementById("raisedAmount");
  const progressPercent = document.getElementById("progressPercent");
  const remainingAmount = document.getElementById("remainingAmount");
  const donationCount = document.getElementById("donationCount");
  const progressBar = document.getElementById("progressBar");
  const donateBtn = document.getElementById("paypalDonateBtn");

  if (!raisedAmount || !progressPercent || !remainingAmount || !donationCount || !progressBar || !donateBtn) {
    return;
  }

  const raised = Math.min(CAMPAIGN_CONFIG.raised, CAMPAIGN_CONFIG.goal);
  const percent = Math.min((raised / CAMPAIGN_CONFIG.goal) * 100, 100);
  const remaining = Math.max(CAMPAIGN_CONFIG.goal - raised, 0);

  raisedAmount.textContent = formatCurrency(raised);
  progressPercent.textContent = `${Math.round(percent)}%`;
  remainingAmount.textContent = `${formatCurrency(remaining)} restantes`;
  donationCount.textContent = String(CAMPAIGN_CONFIG.donationCount);

  requestAnimationFrame(() => {
    progressBar.style.width = `${percent}%`;
  });

  donateBtn.href = CAMPAIGN_CONFIG.paypalUrl;
}

function updateUrgencyDays() {
  const daysLeftElement = document.getElementById("daysLeft");
  if (!daysLeftElement) {
    return;
  }

  const deadline = new Date(CAMPAIGN_CONFIG.urgentDeadline).getTime();

  function tick() {
    const now = Date.now();
    const diff = deadline - now;
    if (diff <= 0) {
      daysLeftElement.textContent = "0";
      return;
    }

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    daysLeftElement.textContent = String(days);
  }

  tick();
  setInterval(tick, 60 * 60 * 1000);
}

function getStoredMessages() {
  const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
  if (!raw) {
    return [
      { name: "Laura", message: "No estan solos. Mucha fuerza en esta etapa." }
    ];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistMessages(messages) {
  localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages.slice(0, 50)));
}

function renderMessages() {
  const list = document.getElementById("messagesList");
  if (!list) {
    return;
  }

  const messages = getStoredMessages();
  list.innerHTML = "";

  messages.forEach((entry) => {
    const item = document.createElement("li");
    const author = document.createElement("strong");
    author.textContent = entry.name;
    const body = document.createElement("p");
    body.textContent = entry.message;
    item.appendChild(author);
    item.appendChild(body);
    list.appendChild(item);
  });
}

function setupSupportForm() {
  const form = document.getElementById("supportForm");
  const feedback = document.getElementById("formFeedback");
  if (!form || !feedback) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const message = form.message.value.trim();

    if (!name || !message) {
      feedback.textContent = "Completa nombre y mensaje para publicar.";
      return;
    }

    const messages = getStoredMessages();
    messages.unshift({ name, message });
    persistMessages(messages);
    renderMessages();

    form.reset();
    feedback.textContent = "Gracias por tu mensaje de apoyo.";
  });
}

function setupThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) {
    return;
  }

  const stored = localStorage.getItem("campaign_theme");

  if (stored === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    toggle.textContent = "Modo claro";
    toggle.setAttribute("aria-pressed", "true");
  } else {
    toggle.setAttribute("aria-pressed", "false");
  }

  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("campaign_theme", "light");
      toggle.textContent = "Modo oscuro";
      toggle.setAttribute("aria-pressed", "false");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("campaign_theme", "dark");
      toggle.textContent = "Modo claro";
      toggle.setAttribute("aria-pressed", "true");
    }
  });
}

function copyWithFallback(value) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(value);
  }

  return new Promise((resolve, reject) => {
    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();

    try {
      const ok = document.execCommand("copy");
      document.body.removeChild(helper);
      if (!ok) {
        reject(new Error("Copy command failed"));
        return;
      }
      resolve();
    } catch (error) {
      document.body.removeChild(helper);
      reject(error);
    }
  });
}

function shareUrl(type) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Ayudame a compartir esta campana medica urgente");
  const feedback = document.getElementById("shareFeedback");
  if (feedback) {
    feedback.textContent = "";
  }

  if (type === "whatsapp") {
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank", "noopener");
  }

  if (type === "facebook") {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener");
  }

  if (type === "x") {
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener");
  }

  if (type === "copy") {
    copyWithFallback(window.location.href)
      .then(() => {
        if (feedback) {
          feedback.textContent = "Enlace copiado correctamente.";
        }
      })
      .catch(() => {
        if (feedback) {
          feedback.textContent = "No se pudo copiar automaticamente. Copia la URL manualmente.";
        }
      });
  }
}

function setupShareButtons() {
  const buttons = document.querySelectorAll("[data-share]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      shareUrl(button.dataset.share);
    });
  });
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  elements.forEach((el) => io.observe(el));
}

updateDonationUI();
updateUrgencyDays();
renderMessages();
setupSupportForm();
setupThemeToggle();
setupShareButtons();
setupRevealAnimations();
