
const API_URL = 'http://127.0.0.1:8000/view/';


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

export { getCourses, getCourse, addCourseData, updateCourse, deleteCourse };
