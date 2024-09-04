import { alertMessage } from "./function.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-form").addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("Login form submitted");
      try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log("username", username);
        console.log("password", password);
        login();

       
        // window.location.href = "/profile/";
      } catch (error) {
        console.error("Login failed:", error);
        alertMessage("Login failed. Please check your credentials.");
      }
    });
});

// التأكد من تحميل الصفحة بشكل كامل قبل إضافة مستمع الحدث
// document.addEventListener("DOMContentLoaded", () => {
//   // الاستماع لحدث إرسال النموذج
//   document
//     .getElementById("login-form")
//     .addEventListener("submit", async function (e) {
//       e.preventDefault(); // منع التحديث الافتراضي للنموذج
//       console.log("Login form submitted"); // طباعة للتحقق من عمل الحدث بشكل صحيح

//       // جلب قيم الإدخال من النموذج
//       const username = document.getElementById("username").value;
//       const password = document.getElementById("password").value;
 
//       try {
//           // login(username, password);
//         // استدعاء دالة تسجيل الدخول لإرسال البيانات
//         await login(username, password);
//         alertMessage("Login successful!"); // عرض رسالة نجاح
//         // إعادة توجيه المستخدم إلى الصفحة المطلوبة بعد تسجيل الدخول
//         window.location.href = "/profile/";
//       } catch (error) {
//         console.error("Login failed:", error); // طباعة الخطأ للتصحيح
//         alertMessage("Login failed. Please check your credentials."); // عرض رسالة خطأ
//       }
//     });
// });
// Set up Axios with CSRF token
const api = axios.create({
  baseURL: "/view/",
});

//   // دالة تسجيل الدخول باستخدام Axios لإرسال البيانات والحصول على الرموز
  // async function login(username, password) {
  //   console.log("login");
  //   console.log("username", username);
  //   console.log("password ", password);
  //   try {
      
  //         const response = await api.post("token/", {
  //         username: username,
  //         password: password,
  //         });

  //         alertMessage("Login successful!"); // عرض رسالة نجاح
  //       }
        
  //   catch (error) {
  //     console.error(
  //       "Login failed:",
  //       error.response ? error.response.data : error.message
  //     );
  //     alertMessage("Login failed. Please check your credentials."); // عرض رسالة خطأ
  //   }



    async function login() {
      try {
        // إرسال بيانات تسجيل الدخول
        const response = await axios.post('http://127.0.0.1:8000/view/token/', {
          username: 'go1',  // استبدل 'your_username' باسم المستخدم الحقيقي
          password: '12345',  // استبدل 'your_password' بكلمة المرور الحقيقية
    
        });
    
        console.log('Token:', response.data); // عرض التوكن إذا نجحت العملية
      } catch (error) {
        // عرض الخطأ إذا فشلت العملية
        if (error.response) {
          console.error('Login failed:', error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      }
    }


    // try {
    //   const response = await axios.post('/view/token/', {
    //     data: {
    //       username: username,
    //       password: password,
    //     },

    //   });

    //   // تخزين الرموز في Local Storage لاستخدامها لاحقاً
    //   localStorage.setItem('accessToken', response.data.access);
    //   localStorage.setItem('refreshToken', response.data.refresh);
    //   console.log('Login successful:', response.data); // تأكيد النجاح
    // } catch (error) {
    //   throw new Error('Login failed'); // طرح خطأ إذا فشل تسجيل الدخول
    // }
  // }


// // // دالة تسجيل الدخول
// async function login(username, password) {
//   console.log("login");
//   try {
//     const response = await api.post("token/", {
//     username,
//     password,
//     });

//     // تخزين الرموز في Local Storage
//     localStorage.setItem("accessToken", response.data.access);
//     localStorage.setItem("refreshToken", response.data.refresh);
//     // redirect to the next page after login  or to /profile/
//     // const urlParams = new URLSearchParams(window.location.search);
//     // console.log("urlParams", urlParams);
//     // const nextPage = urlParams.get("next") || `/profile/`; // إعادة التوجيه إلى الصفحة المطلوبة أو إلى /profile/
//     // console.log("nextPage", nextPage);
//     // إعادة توجيه المستخدم إلى الصفحة التالية
//     // window.location.href = nextPage;

//     console.log("Login successful:", response.data);
//   } catch (error) {
//     console.error(
//       "Login failed:",
//       error.response ? error.response.data : error.message
//     );
//   }
// }




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

//   // مثال على دالة تسجيل الدخول باستخدام Axios
//   async function login(username, password) {
//     const response = await axios.post('/api/token/', { username, password });
//     if (response.status === 200) {
//       localStorage.setItem('accessToken', response.data.access);
//       localStorage.setItem('refreshToken', response.data.refresh);
//       console.log('Login successful:', response.data);
//     } else {
//       throw new Error('Login failed');
//     }
//   }

//   // إعداد اعتراض لطلبات Axios لتضمين الرمز
//   api.interceptors.request.use(
//     (config) => {
//       const accessToken = localStorage.getItem('accessToken');
//       if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   // تحديث Access Token باستخدام Refresh Token
//   async function refreshToken() {
//     const refreshToken = localStorage.getItem('refreshToken');

//     try {
//       const response = await api.post('token/refresh/', {
//         refresh: refreshToken,
//       });

//       // تخزين الرمز الجديد
//       localStorage.setItem('accessToken', response.data.access);
//       console.log('Token refreshed successfully:', response.data);

//       return response.data.access;
//     } catch (error) {
//       console.error('Error refreshing token:', error.response ? error.response.data : error.message);
//       logout(); // تسجيل الخروج إذا فشل التحديث
//     }
//   }

//   // إعداد اعتراض لاستجابة Axios لتحديث الرمز عند انتهاء الصلاحية
//   api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true; // منع إعادة المحاولة أكثر من مرة
//         const newAccessToken = await refreshToken();
//         if (newAccessToken) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return api(originalRequest); // إعادة إرسال الطلب بعد تحديث الرمز
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

//   // مثال لاستخدام API
//   async function getCourses1() {
//     try {
//       const response = await api.get('/courses/');
//       console.log('Courses:', response.data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   }

//   // تسجيل الخروج وحذف الرموز
//   function logout() {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     // window.location.href = "/login/";
//     window.location.href = "/login/?next=/profile/";
//   }
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
