// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

// Optional: friendly Formspree UX (works when you set YOUR_FORMSPREE_ENDPOINT)
const form = document.getElementById("demoForm");
const statusEl = document.getElementById("formStatus");

if (form && statusEl) {
  form.addEventListener("submit", async (e) => {
    // If they didn't set the endpoint, let the browser do nothing but show message
    const action = form.getAttribute("action") || "";
    if (!action.includes("formspree.io")) {
      e.preventDefault();
      statusEl.className = "status show err";
      statusEl.textContent =
        "Set your Formspree endpoint in index.html (search: YOUR_FORMSPREE_ENDPOINT).";
      return;
    }

    // Use AJAX to stay on page
    e.preventDefault();

    statusEl.className = "status show";
    statusEl.textContent = "Sending...";

    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        form.reset();
        statusEl.className = "status show ok";
        statusEl.textContent = "✅ Request sent. We’ll reach out shortly.";
      } else {
        statusEl.className = "status show err";
        statusEl.textContent = "❌ Something went wrong. Try again or email us.";
      }
    } catch {
      statusEl.className = "status show err";
      statusEl.textContent = "❌ Network error. Please try again.";
    }
  });
}
