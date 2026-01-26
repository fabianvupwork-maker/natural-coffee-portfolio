
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

  // Smooth scroll
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

  // Dialog for menu details 
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

  // LÓGICA DEL CARRITO 
  
  let cart = []; 
  const myPhoneNumber = "50688403178"; 

  const cartBtn = document.getElementById("cart-btn");
  const cartCountDOM = document.getElementById("cart-count");
  const addButtons = document.querySelectorAll(".menu-item-cta");

  
  function updateCartUI() {
    cartCountDOM.textContent = cart.length;
    
    
    cartCountDOM.classList.add("bump");
    setTimeout(() => {
      cartCountDOM.classList.remove("bump");
    }, 300);
  }

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.getAttribute("data-item");
      
    
      cart.push(item);
    
      updateCartUI();

      const originalText = btn.innerText;
      btn.innerText = "¡Añadido! ✔";
      btn.style.backgroundColor = "var(--clr-muted)";
      btn.style.color = "#fff";
      
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = ""; 
        btn.style.color = "";
      }, 1000);
    });
  });

  // 5. Enviar el pedido completo a WhatsApp
  cartBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Tu pedido está vacío. ¡Añade algo delicioso del menú primero!");
      return;
    }

    const counts = {};
    cart.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });

    let message = "Hola! 👋 Me gustaría hacer el siguiente pedido:\n\n";
    
    for (const [product, quantity] of Object.entries(counts)) {
      message += `▪️ *${quantity}x* ${product}\n`;
    }

    message += "\n¿Me confirman el total? Gracias.";


    const waLink = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank");
  });


const clearBtn = document.getElementById("clear-cart-btn"); 

  function updateCartUI() {
    cartCountDOM.textContent = cart.length;
    
   
    cartCountDOM.classList.add("bump");
    setTimeout(() => cartCountDOM.classList.remove("bump"), 300);

    if (cart.length > 0) {
      clearBtn.style.display = "flex"; 
    } else {
      clearBtn.style.display = "none"; 
    }
  }

  clearBtn.addEventListener("click", () => {
    if(confirm("¿Quieres vaciar tu pedido?")) {
      cart = []; 
      updateCartUI(); 
    }
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