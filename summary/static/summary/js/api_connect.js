import {alertMessage} from "./function.js";
import {getCourses, getCourse, updateCourse, deleteCourse  } from "./api.js";
import { viewCourses, displayItemDetails } from "./dat_view_html.js";

// fetch Courses End add to view
const fetchCourses = async () => {
  try {
    const data = await getCourses();
    // will retern data in htmel eleamnt
    viewCourses(data);
    
  } catch (error) {
    console.error("Error:", error);
    alertMessage('Error Fetching  course' );
  }
};

// fetch one Cours
const fetchOneCourses = async (id) => {
  try {
    // get one course from api
    const data = await getCourse(id);
    // will retern data in htmel eleamnt
    displayItemDetails(data);
  } catch (error) {
    console.error("Error:", error);
  }
};


//  removeCourse
 const removeCourse = async (id) => {
    try {
      await deleteCourse(id);
      alertMessage(`Course with id ${id} deleted successfully`);
      document.getElementById("cours-detieals").style.display = "none";
      document.getElementById("coress-add").style.display = "none";
      fetchCourses();
    } catch (error) {
      alertMessage(`Error: ${error}`);
      console.error("Error:", error);
    }
  };
  

  //  Edit course
const updateCourseForm =async (courseID, formData) => {
        try {
          await updateCourse(courseID, formData);
          alertMessage("Course updated successfully");
          fetchOneCourses(courseID);
          document.getElementById("coress-add").style.display = "none";
          document.getElementById("cours-container").style.display = "block";
        } catch (error) {
          // console.error("Error:", error);
          const message = `Error: ${error}`;
          alertMessage(message);
        }
      };


  
export { removeCourse,fetchCourses,fetchOneCourses, updateCourseForm};

