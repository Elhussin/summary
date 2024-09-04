
const API_URL = 'http://127.0.0.1:8000/view/';
const url = 'http://127.0.0.1:8000';

// Set up Axios with CSRF token
const api = axios.create({
  baseURL: '/view/',
});

// // دالة تسجيل الدخول
// async function login(username, password) {
//   console.log('login');
//   try {
//     const response = await api.post('token/', {
//       username,
//       password,


      
//     });



//     // تخزين الرموز في Local Storage
//     localStorage.setItem('accessToken', response.data.access);
//     localStorage.setItem('refreshToken', response.data.refresh);
//     // redirect to the next page after login  or to /profile/
//     const urlParams = new URLSearchParams(window.location.search);
//     console.log('urlParams',urlParams);
//     const nextPage = urlParams.get('next') || `/profile/`; // إعادة التوجيه إلى الصفحة المطلوبة أو إلى /profile/
//     console.log('nextPage',nextPage);
//         // إعادة توجيه المستخدم إلى الصفحة التالية
//     window.location.href = nextPage;
//   } catch (error) {
//     console.error('Login failed:', error.response ? error.response.data : error.message);
//   }
// }

// مثال على دالة تسجيل الدخول باستخدام Axios
async function login(username, password) {
  const response = await axios.post('/api/token/', { username, password });
  if (response.status === 200) {
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    console.log('Login successful:', response.data);
  } else {
    throw new Error('Login failed');
  }
}





// إعداد اعتراض لطلبات Axios لتضمين الرمز
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
    logout(); // تسجيل الخروج إذا فشل التحديث
  }
}

// إعداد اعتراض لاستجابة Axios لتحديث الرمز عند انتهاء الصلاحية
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // منع إعادة المحاولة أكثر من مرة
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // إعادة إرسال الطلب بعد تحديث الرمز
      }
    }
    return Promise.reject(error);
  }
);

// مثال لاستخدام API
async function getCourses1() {
  try {
    const response = await api.get('/courses/');
    console.log('Courses:', response.data);
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
}

// تسجيل الخروج وحذف الرموز
function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  // window.location.href = "/login/";
  window.location.href = "/login/?next=/profile/";
}
// دالة لاستخدام API بعد تسجيل الدخول
async function getProtectedData() {
  try {
    const response = await api.get('courses/'); // على سبيل المثال: جلب جميع الكورسات
    console.log('Protected data:', response.data);
  } catch (error) {
    console.error('Error fetching protected data:', error.response ? error.response.data : error.message);
  }
}
// استدعاء الدالة بعد تسجيل الدخول
// login('hussin', '12345').then(() => getProtectedData());



// getCourses1();

// Get all Courses
const getCourses = async () => {
  try {
    // const response = await axios.get(`${API_URL}/courses/`);
    const response = await axios.get(`${API_URL}courses/`)
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get one course
const getCourse = async (id) => {
  try {
    const response = await axios.get(`${API_URL}courses/ ${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error);
    throw error;
  }
};


const addCourseData = async (formData) => {
      // Send data by Axios
      try {
        const response = await axios.post(`${API_URL}courses/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": formData.get("csrfmiddlewaretoken"), // get from form  CSRF Token
          },
        });
        return response.data;
      }catch(error){
        console.error('Error adding course:', error);
        throw error;
      }
}



const updateCourse = async (id, formData) => {
  // Send data by Axios
  try {
    const response = await axios.put(`${API_URL}courses/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": formData.get("csrfmiddlewaretoken"), // get from form  CSRF Token
      },
    });
    return response.data;
  }catch(error){
    console.error(`Error updating course with id ${id}:`, error);
    throw error;
  }
}



// // Edit iteam
// const updateCourse = async (id, courseData) => {
//   try {
//     const response = await axios.put(`${API_URL}courses/${id}/`, courseData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating course with id ${id}:`, error);
//     throw error;
//   }
// };

// Delate iteam
const deleteCourse = async (id) => {
  try {
    await axios.delete(`${API_URL}courses/${id}/`);
  } catch (error) {
    console.error(`Error deleting course with id ${id}:`, error);
    throw error;
  }
};

// // إعداد قاعدة URL لطلبات API
// const api = axios.create({
//   baseURL: 'http://localhost:8000/api/likes/', // قم بتعديل URL إذا كان الخادم يعمل على نطاق مختلف
//   headers: {
//     'Content-Type': 'application/json',
//     // إضافة توكن المصادقة إذا كان مطلوباً، مثل: Authorization: `Bearer ${token}`
//   },
// });

// async function addLike(data) {
//   try {
//     const response = await api.post('', data);
//     console.log('Like added successfully:', response.data);
//   } catch (error) {
//     console.error('Error adding like:', error.response ? error.response.data : error.message);
//   }
// }

// // دالة لتعديل Like
// async function updateLike(likeId, data) {
//   try {
//     const response = await api.put(`${likeId}/`, data);
//     console.log('Like updated successfully:', response.data);
//   } catch (error) {
//     console.error('Error updating like:', error.response ? error.response.data : error.message);
//   }

// }


// const newLikeData = {
//   // أضف البيانات المطلوبة مثل post_id أو أي حقل آخر حسب النموذج في LikeSerializer
// };

// addLike(newLikeData);

// // مثال على استدعاء دالة تعديل Like
// const updatedLikeData = {
//   // أضف البيانات المراد تعديلها
// };

// استخدام ID للـ Like الذي ترغب في تعديله
// updateLike(1, updatedLikeData); // استبدل 1 بالمعرف الفعلي للـ Like

export { getCourses, getCourse, addCourseData, updateCourse, deleteCourse ,login, logout};
