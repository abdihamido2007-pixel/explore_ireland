/* 
  main.js
  Purpose: Demonstrates a script on the website (interaction + simple validation).
  Includes comments to explain what each section is doing.
*/

(function () {
  "use strict";

  // Highlight current page in nav
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav] a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === here) a.classList.add("active");
  });

  // Small "Fun fact" generator on Home page
  const factBox = document.querySelector("[data-fact]");
  if (factBox) {
    const facts = [
      "Ireland has its own language: Gaeilge (Irish).",
      "The Giant’s Causeway has around 40,000 basalt columns (Northern Ireland).",
      "Traditional music sessions are often played in local pubs.",
      "The Cliffs of Moher rise over 200 metres above the Atlantic.",
      "Tip: Try a few Irish phrases like “Go raibh maith agat” (Thank you)."
    ];
    const btn = document.querySelector("[data-new-fact]");
    const showFact = () => factBox.textContent = facts[Math.floor(Math.random() * facts.length)];
    showFact();
    btn?.addEventListener("click", showFact);
  }

  // Gallery filter buttons (Gallery page)
  const gallery = document.querySelector("[data-gallery]");
  if (gallery) {
    const buttons = document.querySelectorAll("[data-filter]");
    const items = Array.from(gallery.querySelectorAll("[data-tag]"));

    function setPressed(activeBtn) {
      buttons.forEach(b => b.setAttribute("aria-pressed", b === activeBtn ? "true" : "false"));
    }

    function applyFilter(tag) {
      items.forEach(it => {
        const tags = (it.getAttribute("data-tag") || "").split(",").map(s => s.trim());
        it.style.display = (tag === "all" || tags.includes(tag)) ? "" : "none";
      });
    }

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tag = btn.getAttribute("data-filter");
        setPressed(btn);
        applyFilter(tag);
      });
    });

    // Default: show all
    applyFilter("all");
  }

  // Contact form validation (Contact page)
  const form = document.querySelector("form[data-contact]");
  if (form) {
    const msg = document.querySelector("[data-form-msg]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#name").value.trim();
      const email = form.querySelector("#email").value.trim();
      const topic = form.querySelector("#topic").value;
      const message = form.querySelector("#message").value.trim();

      // Very basic checks to demonstrate JS (not production-grade)
      const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOK || !message) {
        msg.textContent = "Please check: name, a valid email, and a message are required.";
        msg.style.display = "block";
        return;
      }

      msg.textContent = `Thanks, ${name}! Your message about "${topic}" is ready to send (demo).`;
      msg.style.display = "block";
      form.reset();
    });
  }

  // Optional: keyboard helper for accessibility demo
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const openNotices = document.querySelectorAll("[data-form-msg]");
      openNotices.forEach(n => (n.style.display = "none"));
    }
  });

})();
