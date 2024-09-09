
const API_URL = 'http://127.0.0.1:8000/view/';
import {alertMessage, checkAccessToken} from "./function.js";

import{fetchOneCourses} from "./api_connect.js";
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


// Add a course
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


// Update a course
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


// // Add a like
const addlike = async (data) => {
  try {
    if (!data) {
      console.error('Data is required.');
      return;
    }


    const token = checkAccessToken();
    if (!token) {
      console.error('Access token is missing or invalid.');
      return;
    }
    // add token to the header

    const response = await api.post(`likes/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const response = await api.post('likes', data);
    console.log('Like added successfully:', response.data);

      fetchOneCourses(data.course);
    // return response.data;


  } catch (error) {
    console.error('Error adding like:', error.response ? error.response.data : error.message);
  }
}

// Update a like
async function updateLike(likeId, data) {
  const token = checkAccessToken();
  if (!token) {
    console.error('Access token is missing or invalid.');
    return;
  }
  try {
    const response = await api.put(`likes/${likeId}/`, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      }
    );
    fetchOneCourses(data.course);
    console.log('Like updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating like:', error.response ? error.response.data : error.message);
  }

}

// Delete a like
const delateLike = async (likeId,courseId) => {
  const token = checkAccessToken();
  if (!token) {
    console.error('Access token is missing or invalid.');
    return;
  }
  try {
    const response = await api.delete(`likes/${likeId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Like deleted successfully:', response.data);
    fetchOneCourses(courseId);

  } catch (error) {
    console.error('Error deleting like:', error.response ? error.response.data : error.message);
  }
}

// Add a favorite
const addFavorite = async (data) => {
  try {
    if (!data) {
      console.error('Data is required.');
      return;
    }
    const token = checkAccessToken();
    if (!token) {
      console.error('Access token is missing or invalid.');
      return;
    }
    const response = await api.post('favorites/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Favorite added successfully:', response.data);
    fetchOneCourses(data.course);
  } catch (error) {
    console.error('Error adding favorite:', error.response ? error.response.data : error.message);
  }
}

// Delete a favorite
const delateFavorite = async (favoriteId,courseId) => {
  const token = checkAccessToken();
  if (!token) {
    console.error('Access token is missing or invalid.');
    return;
  }
  try {
    const response = await api.delete(`favorites/${favoriteId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Favorite deleted successfully:', response.data);
    fetchOneCourses(courseId);
  } catch (error) {
    console.error('Error deleting favorite:', error.response ? error.response.data : error.message);
  }
}

// Add a comment
const AddComment = async (comment,courseId) => {
  try {
    if (!comment) {
      console.error('Data is required.');
      return;
    }
    const token = checkAccessToken();
    if (!token) {
      console.error('Access token is missing or invalid.');
      return;
    }
    const response = await api.post('comments/', comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Comment added successfully:', response.data);
    fetchOneCourses(courseId);
  } catch (error) {
    console.error('Error adding comment:', error.response ? error.response.data : error.message);
  }
}

// Add a summary
const addSummary = async (data) => {
  try {
    if (!data) {
      console.error('Data is required.');
      return;
    }
    const token = checkAccessToken();
    if (!token) {
      console.error('Access token is missing or invalid.');
      return;
    }
    const response = await api.post('summaries/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Summary added successfully:', response.data.course);
    fetchOneCourses(response.data.course);
  } catch (error) {
    console.error('Error adding summary:', error.response ? error.response.data : error.message);
  }
}

export { getCourses, getCourse, addCourseData, updateCourse, deleteCourse ,api,getActiveUsre,
   addlike, updateLike,delateLike,addFavorite,delateFavorite,AddComment,addSummary};
