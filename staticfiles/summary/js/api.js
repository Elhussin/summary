
import { alertMessage, checkAccessToken } from "./function.js";
import { fetchOneCourses } from "./api_connect.js";
import { fetchOneSummary } from "./dat_view_html.js";
import {logout} from "./login.js";

const api = axios.create({
  baseURL: "/view/",
});


const getActiveUsre = async (accessToken) => {
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
    const response = await api.get(`courses/`)
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get one course
const getCourse = async (id) => {
  try {
    const response = await api.get(`courses/ ${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error);
    throw error;
  }
};

// Add a course
const addCourseData = async (formData) => {

  const token = checkAccessToken();

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

      console.error('Error setting up request:', error);
      throw new Error('Error setting up the request.');
    }
}


// Update a course
const updateCourse = async (id, formData) => {
  const token = checkAccessToken();
  try {
    const response = await api.put(`courses/${id}/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating course with id ${id}:`, error);
    throw error;
  }
}



// Delete a course
const deleteCourse = async (id) => {
  const token = checkAccessToken();

  try {
    await api.delete(`courses/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
    const token = checkAccessToken()

    const response = await api.post(`likes/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchOneCourses(data.course);
  } catch (error) {
    console.error('Error adding like:', error.response ? error.response.data : error.message);
  }
}

// Update a like
async function updateLike(likeId, data) {
  const token = checkAccessToken();
  try {
    const response = await api.put(`likes/${likeId}/`, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      }
    );
    fetchOneCourses(response.data.course);
  } catch (error) {
    console.error('Error updating like:', error.response ? error.response.data : error.message);
  }

}

// Delete a like
const delateLike = async (likeId, courseId) => {
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
    fetchOneCourses(courseId);

  } catch (error) {
    console.error('Error deleting like:', error.response ? error.response.data : error.message);
  }
}

// Add a favorite
const addFavorite = async (data) => {
  try {
    const token = checkAccessToken();
    const response = await api.post('favorites/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchOneCourses(response.data.course);
  } catch (error) {
    console.error('Error adding favorite:', error.response ? error.response.data : error.message);
  }
}

const addRate = async (data) => {
  try {
    const token = checkAccessToken();

    const response = await api.post('rates/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchOneCourses(response.data.course);
  } catch (error) {
    console.error('Error adding rate:', error.response ? error.response.data : error.message);
  }
}

// Delete a favorite
const delateFavorite = async (favoriteId, courseId) => {
  const token = checkAccessToken();
  try {
    const response = await api.delete(`favorites/${favoriteId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchOneCourses(courseId);
  } catch (error) {
    console.error('Error deleting favorite:', error.response ? error.response.data : error.message);
  }
}

// Add a comment
const AddComment = async (comment) => {
  try {
    const token = checkAccessToken();
    const response = await api.post('comments/', comment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchOneCourses(response.data.course);
  } catch (error) {
    console.error('Error adding comment:', error.response ? error.response.data : error.message);
  }
}

// Add a summary
const addSummary = async (data) => {
  try {
    const token = checkAccessToken();
    const response = await api.post('summaries/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alertMessage("Summary added successfully");
    fetchOneCourses(response.data.course);
  } catch (error) {
    console.error('Error adding summary:', error.response ? error.response.data : error.message);
  }
}

// Get all Sumaries
const getSummaries = async () => {
  try {
    const response = await api.get('summaries/');
    return response.data;
  } catch (error) {
    console.error('Error fetching summaries:', error);
    throw error;
  }
};

// get One Summary 
const getOneSummary = async (id) => {
  try {
    const response = await api.get(`summaries/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching summary with id ${id}:`, error);
    throw error;
  }

}

// Delate One Summary  
const delateOneSummary = async (id, courseId) => {
  try {
    const response = await api.delete(`summaries/${id}/`);
    alertMessage("Summary deleted successfully");
    fetchOneCourses(courseId);
  } catch (error) {
    console.error(`Error fetching summary with id ${id}:`, error);
    throw error;
  }
}



// Like a summary
const likeSummary = async (likedata) => {
  try {
    const token = checkAccessToken();

    const response = await api.post('summaryLikes/', likedata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const getOneSummarydata = await getOneSummary(response.data.summary);
    fetchOneSummary(getOneSummarydata);

  } catch (error) {
    console.error('Error liking summary:', error.response ? error.response.data : error.message);
  }
}

// Delate Like For Summary 
const delatelikeSummary = async (likeId, summaryID) => {
  const token = checkAccessToken();
  try {
    const response = await api.delete(`summaryLikes/${likeId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const getOneSummarydata = await getOneSummary(summaryID);
    fetchOneSummary(getOneSummarydata);
  } catch (error) {
    console.error('Error unliking summary:', error.response ? error.response.data : error.message);
  }
}

// Updat likes For summary
const updateLikeSummary = async (likeId, data,) => {
  const token = checkAccessToken();
  try {
    const response = await api.put(`summaryLikes/${likeId}/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const getOneSummarydata = await getOneSummary(response.data.summary);
    fetchOneSummary(getOneSummarydata);
  } catch (error) {
    console.error('Error liking summary:', error.response ? error.response.data : error.message);
  }
}

// Add one Summary To Favorites
const addSummaryFavorite = async (data) => {
  try {
    const token = checkAccessToken();
    const response = await api.post('summaryFavorites/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const getOneSummarydata = await getOneSummary(response.data.summary);
    fetchOneSummary(getOneSummarydata);
  } catch (error) {
    console.error('Error favoriting summary:', error.response ? error.response.data : error.message);
  }
}

// Dealte one summary from Favorites
const delateSummaryFavorite = async (favoriteId, summaryId) => {
  const token = checkAccessToken();
  try {
    const response = await api.delete(`summaryFavorites/${favoriteId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const getOneSummarydata = await getOneSummary(summaryId);
    fetchOneSummary(getOneSummarydata);

  } catch (error) {
    console.error('Error unfavoriting summary:', error.response ? error.response.data : error.message);
  }
}

// Update one Summary 
const addUpdateSummaryForm = async (id, data) => {
  try {
    const response = await api.put(`summaries/${id}/`, data);
    alertMessage("Summary updated successfully");
    const getOneSummarydata = await getOneSummary(id);
    fetchOneSummary(getOneSummarydata);
  } catch (error) {
    console.error('Error updating summary:', error.response ? error.response.data : error.message);
  }
}

// Add comment for Summary
const addSummaryComments = async (data) => {
  try {
    const token = checkAccessToken();
    const response = await api.post('summaryComments/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const getOneSummarydata = await getOneSummary(response.data.summary);
    fetchOneSummary(getOneSummarydata);

  } catch (error) {
    console.error('Error adding comment:', error.response ? error.response.data : error.message);
  }
}



// Function to check if the user is logged in
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

// Update Token 
async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await api.post('token/refresh/', {
      refresh: refreshToken,
    });

    // Save New token
    localStorage.setItem('accessToken', response.data.access);
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

export {
  getCourses, getCourse, addCourseData, updateCourse, deleteCourse, api, getActiveUsre,
  addlike, updateLike, delateLike, addFavorite, delateFavorite, AddComment, addSummary, likeSummary,
  updateLikeSummary, delatelikeSummary, addSummaryFavorite, delateSummaryFavorite, addSummaryComments,
  delateOneSummary, getSummaries, getOneSummary, addUpdateSummaryForm, addRate,refreshToken
};
