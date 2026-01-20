
document.addEventListener("DOMContentLoaded", () => {
  // Scroll reveal animations
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
let breathTimeout;
const toggle = document.getElementById("themeToggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

window.addEventListener("scroll", () => {
  clearTimeout(breathTimeout);

  breathTimeout = setTimeout(() => {
    const sections = document.querySelectorAll(".section");
    const viewportCenter = window.innerHeight / 2;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
        section.classList.add("breath");
        setTimeout(() => section.classList.remove("breath"), 1600);
      }
    });
  }, 140);
});

  document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
  });

  // Smooth scroll: buttons with data-scroll-to="#id" navigate to section
  const navButtons = document.querySelectorAll(".nav-link[data-scroll-to]");
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSel = btn.getAttribute("data-scroll-to");
      const target = document.querySelector(targetSel);
      if (!target) return;

      // Account for sticky header by offsetting scroll slightly
      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight : 0;

      const rect = target.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top - (headerHeight + 8);

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    });
  });

  // Dialog for menu details (lightweight and optional)
  const dialog = document.querySelector(".menu-dialog");
  const dialogTitle = dialog?.querySelector(".dialog-title");
  const dialogBody = dialog?.querySelector(".dialog-body");
  const dialogPrice = dialog?.querySelector(".dialog-price");
  const dialogClose = dialog?.querySelector(".dialog-close");

  // Example content map for menu items
  const itemContent = {
    Cappuccino: {
      desc:
        "A balanced cup featuring bold espresso, steamed milk, and a silky foam cap. Notes of hazelnut and cocoa.",
      price: "$3.80",
    },
    Latte: {
      desc:
        "Smooth and comforting. Espresso mellowed with steamed milk. Customize sweetness and milk options.",
      price: "$3.90",
    },
    Espresso: {
      desc:
        "Concentrated shot with caramelized sweetness and a lingering finish. Perfect as a pick-me-up.",
      price: "$2.20",
    },
    Mocha: {
      desc:
        "Chocolate-forward with espresso backbone. Creamy texture and a hint of vanilla. A cozy classic.",
      price: "$4.20",
    },
    Americano: {
      desc:
        "Clean and bright. Espresso lengthened with hot water for clarity and nuance without heaviness.",
      price: "$2.50",
    },
    "Flat White": {
      desc:
        "Velvety microfoam meets a double shot. Balanced intensity with a smooth mouthfeel.",
      price: "$4.00",
    },
  };

  // Open dialog when clicking "View details"
  const ctas = document.querySelectorAll(".menu-item-cta");
  ctas.forEach((cta) => {
    cta.addEventListener("click", () => {
      const key = cta.getAttribute("data-item");
      const data = itemContent[key] || {
        desc:
          "Detailed description for this item will appear here. Customize to match your actual menu.",
        price: "$3.50",
      };

      if (!dialog) return;

      dialogTitle.textContent = key || "Item";
      dialogBody.textContent = data.desc;
      dialogPrice.textContent = data.price;

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        // Fallback if dialog API unsupported
        dialog.setAttribute("open", "");
      }
    });
  });

  // Close dialog
  dialogClose?.addEventListener("click", () => {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  });

  // Close dialog when clicking backdrop area (ESC handled by browser)
  dialog?.addEventListener("click", (ev) => {
    const rect = dialog.querySelector(".dialog-content")?.getBoundingClientRect();
    if (!rect) return;
    const clickedInContent =
      ev.clientX >= rect.left &&
      ev.clientX <= rect.right &&
      ev.clientY >= rect.top &&
      ev.clientY <= rect.bottom;

    if (!clickedInContent) {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }
  });
    // Dynamic WhatsApp message based on menu item
  const whatsappBtn = document.querySelector(".whatsapp-float");

  document.querySelectorAll(".menu-item-cta").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.dataset.item;
      if (!item || !whatsappBtn) return;

      whatsappBtn.href =
        `https://wa.me/50670000000?text=Hola,%20quiero%20ordenar%20un%20${encodeURIComponent(item)}`;
    });
  });

});
// ===== OPEN / CLOSED STATUS =====
const statusText = document.querySelector(".status-text");
const statusDot = document.querySelector(".status-dot");
const statusHours = document.querySelector(".status-hours");

if (statusText && statusDot) {
  const now = new Date();
  const hour = now.getHours();

  const openHour = 8;   // 8 AM
  const closeHour = 19; // 7 PM

  if (hour >= openHour && hour < closeHour) {
    statusText.textContent = "Open now";
    statusHours.textContent = "• Closes at 7:00 PM";
  } else {
    statusText.textContent = "Closed";
    statusHours.textContent = "• Opens at 8:00 AM";
    statusDot.style.background = "#e74c3c";
  }
}



