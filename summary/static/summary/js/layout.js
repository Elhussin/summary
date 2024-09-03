import { translations } from "./translations.js";
import { logout } from "./api.js";
import { alertMessage, setTheme, applyTranslations ,initializeLanguageSwitcher } from "./function.js";

// تحميل الصفحة والتحقق من الإعدادات الحالية
document.addEventListener("DOMContentLoaded", () => {
    initializeDarkMode();
    initializeLanguageSwitcher();
    setupNavButton();
    checkLoginStatus();
    checkUserLoggedIn();
  });


// إعداد الوضع الليلي/النهاري
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


// set dark mode or light mode







// set up the navigation button
function setupNavButton() {
    document.getElementById("nav-view").onclick = toggleNavItems;
  }
  
  // عرض أو إخفاء عناصر القائمة للشاشات الصغيرة
  function toggleNavItems() {
    const navigation = document.getElementById("navigation");
    navigation.style.display = navigation.style.display === "none" ? "block" : "none";
  }



// Function to check login status
function checkLoginStatus() {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    document.getElementById("login-item").style.display = "none";
    document.getElementById("register-item").style.display = "none";
    document.getElementById("logout-item").style.display = "block";
    document.getElementById("profile-item").style.display = "block";

    // fetch user profile
    fetchUserProfile(accessToken);
  } else {
    document.getElementById("login-item").style.display = "block";
    document.getElementById("register-item").style.display = "block";
    document.getElementById("logout-item").style.display = "none";
    document.getElementById("profile-item").style.display = "none";
    document.getElementById("admin-item").style.display = "none";
    document.getElementById("favourites-item").style.display = "none";
  }
}

//fetch user profile
async function fetchUserProfile(token) {
  try {
    const response = await axios.get("/view/user-profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response.data;
    document.getElementById("username").innerText = userData.username;

    // عرض روابط خاصة بالمشرف إذا كان المستخدم مشرفًا
    if (userData.is_superuser) {
      document.getElementById("admin-item").style.display = "block";
    }
    document.getElementById("favourites-item").style.display = "block";
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    alertMessage("Failed to fetch user profile. Please log in again.");
    // Romve tokens from local storage
    logout();
  }
}

// log out
document.getElementById("log-out").addEventListener("click", () => {
  // remove tokens from local storage
  logout();
  alertMessage("Logged out successfully");
});

// Function to check if the user is logged in
async function checkUserLoggedIn() {
  const accessToken = localStorage.getItem("accessToken");

  // If there is no access token, redirect to login page
  if (!accessToken) {
    window.location.href = "/login/?next=/profile/";
    return;
  }

  try {
    // Fetch user profile data using the access token
    const response = await axios.get("/view/user-profile/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Display the user profile data
    displayUserProfile(response.data);
  } catch (error) {
    console.error(
      "Failed to fetch user profile:",
      error.response ? error.response.data : error.message
    );
    if (error.response.status === 401) {
      // إذا انتهت صلاحية الرمز، قم بتحديثه أو إعادة توجيه المستخدم لتسجيل الدخول
      await refreshToken();

      checkUserLoggedIn(); // إعادة المحاولة بعد تحديث الرمز
    } else {
      window.location.href = "/login/?next=/profile/";
    }
  }
}
// تحقق من حالة تسجيل الدخول عند تحميل الصفحة
document.addEventListener(
  "DOMContentLoaded",
  checkLoginStatus,
  checkUserLoggedIn
);
