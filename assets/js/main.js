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
