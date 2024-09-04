import { alertMessage, setTheme ,initializeLanguageSwitcher,toggleNavItems } from "./function.js";

// تحميل الصفحة والتحقق من الإعدادات الحالية
document.addEventListener("DOMContentLoaded", () => {
    initializeDarkMode();
    initializeLanguageSwitcher();
    setupNavButton();

  });


// set dark mode or light mode
function initializeDarkMode() {
    const toggleButton = document.getElementById("dark-mode");
    const currentMode = localStorage.getItem("theme") || "light";
    const body = document.body;
    const header = document.getElementById("header");
    // set theme based on the current mode
    setTheme(currentMode, body, header);
  
    // change theme when the button is clicked
    toggleButton.addEventListener("click", () => {
      const newMode = body.classList.contains("dark-mode") ? "light" : "dark";
      setTheme(newMode, body, header);
      localStorage.setItem("theme", newMode);
    });
  }

// set up the navigation button
function setupNavButton() {
    document.getElementById("nav-view").onclick = toggleNavItems;
  }
  


