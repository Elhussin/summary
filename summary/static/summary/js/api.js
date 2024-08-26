// import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

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

//Add new course
const addCourse = async (courseData) => {
  try {
    const response = await axios.post(`${API_URL}courses/`, courseData,);
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};



// Edit iteam
const updateCourse = async (id, courseData) => {
  try {
    const response = await axios.put(`${API_URL}courses/${id}/`, courseData);
    return response.data;
  } catch (error) {
    console.error(`Error updating course with id ${id}:`, error);
    throw error;
  }
};

// Delate iteam
const deleteCourse = async (id) => {
  try {
    await axios.delete(`${API_URL}courses/${id}/`);
  } catch (error) {
    console.error(`Error deleting course with id ${id}:`, error);
    throw error;
  }
};



const alertMessage =(message)=>{
  const messageAlrt = document.getElementById("message-alrt");
  messageAlrt.style.display = "block";
  messageAlrt.innerHTML = `<p>` + message + `</p>`;
  setInterval(function () {
    messageAlrt.style.display = "none";
  }, 10*1000);
};


const displayIteam = (iteamView, IteamOff, diplayType) => {
  if (iteamView.style.display == "none") {
    iteamView.style.display = diplayType;
    IteamOff.style.display = "none";
  } else {
    iteamView.style.display = "none";
  }
};


const viewUploudImage =()=>{
  document.getElementById('id_image').addEventListener('change', function(event) {
    const file = event.target.files[0]; 
  
    if (file) {
        const reader = new FileReader();
  
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result; // Set image preview source
        };
  
        reader.readAsDataURL(file); 
    }
  });

    
}




export { getCourses, getCourse, addCourse, updateCourse, deleteCourse ,alertMessage ,displayIteam ,viewUploudImage };
