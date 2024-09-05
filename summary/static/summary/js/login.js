import { alertMessage } from "./function.js";
// Set up Axios with CSRF token
const api = axios.create({
  baseURL: "/view/",
});

// Function to handle login form submission
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-form").addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("Login form submitted");
      const username = document.getElementById("user-name").value;
      const password = document.getElementById("password").value;
      console.log("username", username);
      console.log("password", password);
      try {
        login(username, password);
      } catch (error) {
        console.error("Login failed:", error);
      }
    });
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
    console.log("nextPage", nextPage);
    window.location.href = nextPage;
    alertMessage("Login successful!"); 
  } catch (error) {

    console.error( "Login failed:",error.response ? error.response.data : error.message);
    alertMessage("Login failed. Please check your credentials."); 
  }
}




// Function to check login status
function checkLoginStatus() {
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken", accessToken);
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
      console.log(userData);
      document.getElementById("username").innerText = userData.username;

      // Display the Admin profile data
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

    alertMessage("Logged out successfully");
    // remove tokens from local storage
    logout();

  });

  // Function to check if the user is logged in

 


// 
  api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // تحديث Access Token باستخدام Refresh Token
  async function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await api.post('token/refresh/', {
        refresh: refreshToken,
      });

      // تخزين الرمز الجديد
      localStorage.setItem('accessToken', response.data.access);
      console.log('Token refreshed successfully:', response.data);

      return response.data.access;
    } catch (error) {
      console.error('Error refreshing token:', error.response ? error.response.data : error.message);
      logout();
    }
  }

  // Update Token using the Refresh Token
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Set the retry flag to prevent infinite loop
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest); // Retry the original request with the new token
        }
      }
      return Promise.reject(error);
    }
  );



  // logout 
  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = "/login/";
  }


    // function to display user profile data
  function displayUserProfile(data) {
    document.getElementById('user-profile').style.display = 'block';
    document.getElementById('username').innerText = data.username;
    document.getElementById('user_id').innerText = data.id;
    document.getElementById('email').innerText = data.email;

    // عرض الأزرار إذا كان المستخدم مشرفًا
    if (data.is_superuser) {
        document.getElementById('course-add-btn').style.display = 'block';
        document.getElementById('course-view-btn').style.display = 'block';
    }

  }
document.addEventListener("DOMContentLoaded", checkLoginStatus , checkUserLoggedIn);



//   // دالة لاستخدام API بعد تسجيل الدخول
//   async function getProtectedData() {
//     try {
//       const response = await api.get('courses/'); // على سبيل المثال: جلب جميع الكورسات
//       console.log('Protected data:', response.data);
//     } catch (error) {
//       console.error('Error fetching protected data:', error.response ? error.response.data : error.message);
//     }
//   }
//   // استدعاء الدالة بعد تسجيل الدخول
//   // login('hussin', '12345').then(() => getProtectedData());

//   // getCourses1();


//   // مثال لاستخدام API
//   async function getCourses1() {
//     try {
//       const response = await api.get('/courses/');
//       console.log('Courses:', response.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   }