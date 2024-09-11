
const API_URL = 'http://127.0.0.1:8000/view/';
import {alertMessage, checkAccessToken} from "./function.js";

import{fetchOneCourses} from "./api_connect.js";
import{fetchOneSummary} from "./dat_view_html.js";
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
    console.log("summary",data);
    console.log("summary",data.get("title"));
    console.log("summary",data.get("description"));
    console.log("summary",data.get("course"));
    console.log("summary",data.get("user"));
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

const getOneSummary = async (id) => {
  try { 
    const response = await api.get(`summaries/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching summary with id ${id}:`, error);
    throw error;
  }

}

const delateOneSummary = async (id,courseId) => {
  try {
    const response = await api.delete(`summaries/${id}/`);
    // return response.data;
    fetchOneCourses(courseId);
    alertMessage("Summary deleted successfully");
    console.log('Summary deleted successfully:', response.data);
  } catch (error) {
    console.error(`Error fetching summary with id ${id}:`, error);
    throw error;
  }
}



// Like a summary
const likeSummary = async (likedata,data) => {
  console.log("likedata",data);
  try {

    const token = checkAccessToken();
    if (!token) {
      console.error('Access token is missing or invalid.');
      return;
    }
    const response = await api.post('summaryLikes/', likedata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const getOneSummarydata = await getOneSummary(data.id);
    console.log("getOneSummary",getOneSummarydata);
    fetchOneSummary(getOneSummarydata);

    console.log('Summary liked successfully:', response.data);
  } catch (error) {
    console.error('Error liking summary:', error.response ? error.response.data : error.message);
  }
}

const delatelikeSummary = async (likeId,data) => {
  const token = checkAccessToken();
  if (!token) {
    console.error('Access token is missing or invalid.');
    return;
  }
  try {
    const response = await api.delete(`summaryLikes/${likeId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const getOneSummarydata = await getOneSummary(data.id);
    console.log("getOneSummary",getOneSummarydata);
    fetchOneSummary(getOneSummarydata);
    console.log('Summary unliked successfully:', response.data);
  } catch (error) {
    console.error('Error unliking summary:', error.response ? error.response.data : error.message);
  }
}

const updateLikeSummary = async (likeId,likedata,data) => { 
  const token = checkAccessToken();
  if (!token) {
    console.error('Access token is missing or invalid.');
    return;
  }
  try {
    const response = await api.put(`summaryLikes/${likeId}/`, likedata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const getOneSummarydata = await getOneSummary(data.id);
    fetchOneSummary(getOneSummarydata);
    console.log('Summary liked successfully:', response.data);
  } catch (error) {
    console.error('Error liking summary:', error.response ? error.response.data : error.message);
  }
}

const addSummaryFavorite = async (data) => {
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
    const response = await api.post('summaryFavorites/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const getOneSummarydata = await getOneSummary(data.summary);
    fetchOneSummary(getOneSummarydata);
    console.log('Summary favorited successfully:', response.data);
  } catch (error) {
    console.error('Error favoriting summary:', error.response ? error.response.data : error.message);
  }
}

const delateSummaryFavorite = async (favoriteId,summaryId) => {
  const token = checkAccessToken();
  if (!token) {
    console.error('Access token is missing or invalid.');
    return;
  }
  try {
    const response = await api.delete(`summaryFavorites/${favoriteId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const getOneSummarydata = await getOneSummary(summaryId);
    fetchOneSummary(getOneSummarydata);
    console.log('Summary unfavorited successfully:', response.data);
  } catch (error) {
    console.error('Error unfavoriting summary:', error.response ? error.response.data : error.message);
  }
}


const addSummaryComments = async (data) => {
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
    const response = await api.post('summaryComments/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Summary comment added successfully:', response.data);
    const getOneSummarydata = await getOneSummary(data.get("summary"));

    fetchOneSummary(getOneSummarydata);
   
  } catch (error) {
    console.error('Error adding comment:', error.response ? error.response.data : error.message);
  }
}

export { getCourses, getCourse, addCourseData, updateCourse, deleteCourse ,api,getActiveUsre,
   addlike, updateLike,delateLike,addFavorite,delateFavorite,AddComment,addSummary,likeSummary,
   updateLikeSummary,delatelikeSummary,addSummaryFavorite,delateSummaryFavorite,addSummaryComments,delateOneSummary};
