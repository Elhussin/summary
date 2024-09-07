
const API_URL = 'http://127.0.0.1:8000/view/';
import {alertMessage, checkAccessToken} from "./function.js";
// Set up Axios with CSRF token
const api = axios.create({
  baseURL: "/view/",
});


const  getActiveUsre = async (accessToken) => {
  try {
    // Fetch user profile data using the access token
    const response = await api.get("/user-profile/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }

}


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

  const token = checkAccessToken();

  if (!token) {
    console.error('Access token is missing or invalid.');
    throw new Error('Access token is missing or invalid.');
  }
  
  try {
    const response = await api.post('courses/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000, // Set a timeout of 5 seconds
    });
    alertMessage("Course added successfully");
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Server error:', error.response.data.message || 'Unknown server error');
      throw new Error(error.response.data.message || 'Error occurred while adding the course.');
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server:', error.message);
      throw new Error('No response received from server.');
    } else {
      // Error setting up the request
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up the request.');
    }
};
}
const updateCourse = async (id, formData) => {
  const accessToken = checkAccessToken();
  if (!accessToken) {
    console.error('Access token is missing or invalid.');
    throw new Error('Access token is missing or invalid.');
  }
  // Send data by Axio
  try {
    const response = await api.put(`courses/${id}/`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }catch(error){
    console.error(`Error updating course with id ${id}:`, error);
    throw error;
  }
}




// Delete a course
const deleteCourse = async (id) => {
  const accessToken = checkAccessToken();
  if (!accessToken) {
    console.error('Access token is missing or invalid.');
    throw new Error('Access token is missing or invalid.');
  }
  try {
    await api.delete(`courses/${id}/`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

export { getCourses, getCourse, addCourseData, updateCourse, deleteCourse ,api,getActiveUsre };
