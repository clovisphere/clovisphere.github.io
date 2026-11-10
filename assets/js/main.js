/*
 * Small progressive enhancements. The page works without this file: it shows the dark theme and
 * the hero shows its first word (the toggle and hero button stay hidden without JavaScript).
 * Note: a saved theme is applied by the inline script in each page's <head>, before first paint,
 * so there is no flash of the wrong theme. This file only handles the toggle button.
 */
(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme");

  // The theme in effect. Dark is the default; data-theme is "light" only after a choice (saved or just made).
  function effective() {
    return root.dataset.theme || "dark";
  }

  // The button's accessible name says what clicking will do.
  function syncLabel() {
    if (toggle) {
      toggle.setAttribute("aria-label", effective() === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = effective() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      // Remember the choice. Storage can be blocked (private mode), in which case it lasts for this visit only.
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      syncLabel();
    });
    syncLabel();
  }

  // Phone menu: the Menu button opens and closes the link panel (the CSS only collapses it on small screens).
  var header = document.querySelector(".site-header");
  var menuBtn = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    header.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (header && menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      setMenu(!header.classList.contains("open"));
    });
    // Choosing a link closes the panel so the section it jumps to is visible.
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    // Escape closes the panel and returns focus to the button.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    // A tap anywhere outside the header closes it.
    document.addEventListener("click", function (e) {
      if (!header.contains(e.target)) setMenu(false);
    });
    // Resizing up to the desktop layout resets the state so it never carries over.
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 720) setMenu(false);
    });
  }

  // Hero: the button steps through these descriptions, wrapping around at the end.
  var word = document.getElementById("word");
  var cycle = document.getElementById("cycle");
  var words = ["technologist", "systems thinker", "problem translator", "curious tinkerer", "human first"];
  var i = 0;
  if (word && cycle) {
    cycle.addEventListener("click", function () {
      i = (i + 1) % words.length;
      word.textContent = words[i];
    });
  }
})();
