
// // التحقق من أن المستخدم مسجل الدخول قبل عرض الصفحة
// async function checkUserLoggedIn() {
 
//     const accessToken = localStorage.getItem('accessToken');
  

//     // if (!accessToken) {
//     //   window.location.href = '/login/?next=/profile/';
//     //   return;
//     // }
  
//     try {
//       // جلب بيانات المستخدم باستخدام الرمز المضمن في الرؤوس
//       const response = await axios.get('/view/user-profile/', {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//         },
//       });
  
//       // عرض البيانات الخاصة بالمستخدم
//       displayUserProfile(response.data);
//     } catch (error) {
//       console.error('Failed to fetch user profile:', error.response ? error.response.data : error.message);
//       if (error.response.status === 401) {
//         // إذا انتهت صلاحية الرمز، قم بتحديثه أو إعادة توجيه المستخدم لتسجيل الدخول
//         await refreshToken();

//         checkUserLoggedIn(); // إعادة المحاولة بعد تحديث الرمز
//       } else {
//         window.location.href = '/login/?next=/profile/';
//       }
//     }
//   }
  
//   // دالة عرض بيانات المستخدم في الصفحة
//   // function displayUserProfile(data) {
//   //   document.getElementById('username').innerText = data.username;
//   //   document.getElementById('email').innerText = data.email;
//   //   // يمكنك إضافة المزيد من البيانات للعرض هنا
//   // }
  
//   // التأكد من تسجيل الدخول عند تحميل الصفحة
//   document.addEventListener('DOMContentLoaded', checkUserLoggedIn);
  