import { alertMessage } from "./function.js";
import {api} from './api.js';  

// Function to handle login form submission
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("login-form")){
  document.getElementById("login-form").addEventListener("submit", async function (e) {
      e.preventDefault();

      const username = document.getElementById("user-name").value;
      const password = document.getElementById("password").value;
      try {
        login(username, password);
      } catch (error) {
        console.error("Login failed:", error);
      }
    });
  }
});


// // دالة تسجيل الدخول
async function login(username, password) {
  try {
    const response = await api.post("token/", {
    username,
    password,
    });

    // save tokens to local storage
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
    // redirect to the next page after login  or to /profile/
    const urlParams = new URLSearchParams(window.location.search);
    // read the next page from the URL query string or use the default page
    const nextPage = urlParams.get("next") || `/profile/`; 

    alertMessage("Login successful!"); 
    setInterval(() => { window.location.href = nextPage;}, 1000);
    
  } catch (error) {

    console.error( "Login failed:",error.response ? error.response.data : error.message);
    alertMessage("Login failed. Please check your credentials."); 
  }
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
      const response = await api.get("/user-profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        

      const userData = response.data;
      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(userData));
      if(localStorage.getItem("user")){
      }
      document.getElementById("username").innerText = userData.username;

      // Display the Admin profile data
      if (userData.is_superuser) {
        document.getElementById("admin-item").style.display = "block";
        document.getElementById("uploud-course").style.display = "block";
        document.getElementById("summary-upload").style.display = "block";
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
  if (document.getElementById("log-out")){
  document.getElementById("log-out").addEventListener("click", () => {
    // remove tokens from local storage
    logout();

  });
}




  // logout 
  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    alertMessage("Logged out successfully");

    setTimeout(() => { window.location.href = "/login/"; }, 1000);
  }


export { logout };

document.addEventListener("DOMContentLoaded", checkLoginStatus);
