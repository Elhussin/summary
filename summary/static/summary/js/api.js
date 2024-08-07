// import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/courses/';
// {
//   "summaries": "http://127.0.0.1:8000/api/summaries/",
//   "courses": "http://127.0.0.1:8000/api/courses/"
// }
// Get all Courses
const getCourses = async () => {
  try {
    // const response = await axios.get(`${API_URL}/courses/`);
    const response = await axios.get(API_URL)
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get one course
const getCourse = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error);
    throw error;
  }
};

//Add new course
const addCourse = async (courseData) => {
  try {
    const response = await axios.post(API_URL, courseData);
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};

// Edit iteam
const updateCourse = async (id, courseData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, courseData);
    return response.data;
  } catch (error) {
    console.error(`Error updating course with id ${id}:`, error);
    throw error;
  }
};

// Delate iteam
const deleteCourse = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error(`Error deleting course with id ${id}:`, error);
    throw error;
  }
};

export { getCourses, getCourse, addCourse, updateCourse, deleteCourse };
