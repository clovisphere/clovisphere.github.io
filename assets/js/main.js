(function () {
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var toggle = document.getElementById("theme");

  function effective() {
    return root.dataset.theme || (media.matches ? "dark" : "light");
  }

  function syncLabel() {
    if (toggle) {
      toggle.setAttribute("aria-label", effective() === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = effective() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      syncLabel();
    });
    media.addEventListener("change", syncLabel);
    syncLabel();
  }

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
