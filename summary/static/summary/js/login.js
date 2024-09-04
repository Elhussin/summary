// static/js/login.js
// import {login} from "./api.js";
import {alertMessage} from "./function.js";

// التأكد من تحميل الصفحة بشكل كامل قبل إضافة مستمع الحدث
document.addEventListener('DOMContentLoaded', () => {
    // الاستماع لحدث إرسال النموذج
    document.getElementById('login-form').addEventListener('submit', async function (e) {
      e.preventDefault(); // منع التحديث الافتراضي للنموذج
      console.log('Login form submitted'); // طباعة للتحقق من عمل الحدث بشكل صحيح
  
      // جلب قيم الإدخال من النموذج
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        // استدعاء دالة تسجيل الدخول لإرسال البيانات
        await login(username, password);
        alertMessage('Login successful!'); // عرض رسالة نجاح
        // إعادة توجيه المستخدم إلى الصفحة المطلوبة بعد تسجيل الدخول
        window.location.href = '/profile/';
      } catch (error) {
        console.error('Login failed:', error); // طباعة الخطأ للتصحيح
        alertMessage('Login failed. Please check your credentials.'); // عرض رسالة خطأ
      }
    });
  });
  
  // دالة تسجيل الدخول باستخدام Axios لإرسال البيانات والحصول على الرموز
  async function login(username, password) {
    try {
      const response = await axios.post('/api/token/', {
        username: username,
        password: password,
      });
  
      // تخزين الرموز في Local Storage لاستخدامها لاحقاً
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      console.log('Login successful:', response.data); // تأكيد النجاح
    } catch (error) {
      throw new Error('Login failed'); // طرح خطأ إذا فشل تسجيل الدخول
    }
  }
  





// // Function to check login status
// function checkLoginStatus() {
//     const accessToken = localStorage.getItem("accessToken");
//     console.log("accessToken", accessToken);
//     if (accessToken) {
//       document.getElementById("login-item").style.display = "none";
//       document.getElementById("register-item").style.display = "none";
//       document.getElementById("logout-item").style.display = "block";
//       document.getElementById("profile-item").style.display = "block";
  
//       // fetch user profile
//       // fetchUserProfile(accessToken);
//     } else {
//       document.getElementById("login-item").style.display = "block";
//       document.getElementById("register-item").style.display = "block";
//       document.getElementById("logout-item").style.display = "none";
//       document.getElementById("profile-item").style.display = "none";
//       document.getElementById("admin-item").style.display = "none";
//       document.getElementById("favourites-item").style.display = "none";
//     }
//   }
  
//   // //fetch user profile
//   // async function fetchUserProfile(token) {
//   //   try {
//   //     const response = await axios.get("/view/user-profile/", {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });
//   //     const userData = response.data;
//   //     document.getElementById("username").innerText = userData.username;
  
//   //     // عرض روابط خاصة بالمشرف إذا كان المستخدم مشرفًا
//   //     if (userData.is_superuser) {
//   //       document.getElementById("admin-item").style.display = "block";
//   //     }
//   //     document.getElementById("favourites-item").style.display = "block";
//   //   } catch (error) {
//   //     console.error("Failed to fetch user profile:", error);
//   //     alertMessage("Failed to fetch user profile. Please log in again.");
//   //     // Romve tokens from local storage
//   //     logout();
//   //   }
//   // }
  
//   // log out
//   document.getElementById("log-out").addEventListener("click", () => {
//     // remove tokens from local storage
//     logout();
//     alertMessage("Logged out successfully");
//   });
  
//   // Function to check if the user is logged in
//   async function checkUserLoggedIn() {
//     const accessToken = localStorage.getItem("accessToken");
  
//     // If there is no access token, redirect to login page
//     if (!accessToken) {
//       window.location.href = "/login/?next=/profile/";
//       return;
//     }
  
//     try {
//       // Fetch user profile data using the access token
//       const response = await axios.get("/view/user-profile/", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
  
//       // Display the user profile data
//       displayUserProfile(response.data);
//     } catch (error) {
//       console.error(
//         "Failed to fetch user profile:",
//         error.response ? error.response.data : error.message
//       );
//       if (error.response.status === 401) {
//         // إذا انتهت صلاحية الرمز، قم بتحديثه أو إعادة توجيه المستخدم لتسجيل الدخول
//         await refreshToken();
  
//         checkUserLoggedIn(); // إعادة المحاولة بعد تحديث الرمز
//       } else {
//         window.location.href = "/login/?next=/profile/";
//       }
//     }
//   }
//   // تحقق من حالة تسجيل الدخول عند تحميل الصفحة
//   document.addEventListener(
//     "DOMContentLoaded",
//     checkLoginStatus,
//     // checkUserLoggedIn
//   );
  