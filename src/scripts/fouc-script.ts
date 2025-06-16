// This script should be inlined in your HTML head to prevent FOUC
(function () {
  try {
    // Get saved settings from localStorage
    const savedSettings = localStorage.getItem("adminSettings");
    let theme = "light"; // default theme

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      theme = settings.theme || "light";
    }

    // Apply theme immediately
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else if (theme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemPrefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  } catch (error) {
    // If anything fails, default to light theme
    console.error("Theme initialization error:", error);
  }
})();
