import {    alertMessage, displayIteam, viewUploudImage, createCommaneElmeant, viewCommants,} from "./function.js";
import {getCourses, getCourse, addCourseData, updateCourse, deleteCourse  } from "./api.js";

import { viewCourses, displayItemDetails, summaryViewEventListeners, cardViewEventListeners,  fetchOneSummary, addDateToForm } from "./dat_view_html.js";
// 

//  fetch Courses 
// يتم استدعاء الداله من ملف index
// الداله تستدعي الداله getCourses من ملف api.js
// وتقوم بعرض البيانات بعد استلامها من الداله getCourses
// من خلال استدعاء الداله viewCourses
// والتي تقوم بعرض البيانات بعد تحويلها الى عناصر html

const fetchCourses = async () => {
  try {
    const data = await getCourses();
    // will retern data in htmel eleamnt
    viewCourses(data);
    
  } catch (error) {
    console.error("Error:", error);
    message = "Error adding course";
    alertMessage(message );
  }
};

// fetch one Ity
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


//  to fetch one course

//  Updat Course
 const modifyCourse = async (id, formData) => {
  try {
    const updatedCourse = await updateCourse(id, formData);
    // console.log("Updated Course:", updatedCourse);
    fetchOneCourses(id);
  } catch (error) {
    console.error("Error:", error);
  }
};


  


  
//  removeCourse
 const removeCourse = async (id) => {
    try {
      await deleteCourse(id);
      const message = `Course with id ${id} deleted successfully`;
      alertMessage(message);
      document.getElementById("cours-detieals").style.display = "none";
      document.getElementById("coress-add").style.display = "none";
      fetchCourses();
    } catch (error) {
      const message = `Error: ${error}`;
      alertMessage(message);
      console.error("Error:", error);
    }
  };
  

  //  Supmit View Course After  Edit
const updateCourseForm = () => {
    const addCourseForm =document.getElementById("course_form")
    addCourseForm.addEventListener("submit", function (event) {
        const courseID = document.getElementById("course-id").dataset.courseid;
        var message = "Course updated successfully";
        event.preventDefault();
        let formData = new FormData(this);
        modifyCourse(courseID, formData);
        alertMessage(message);
        document.getElementById("coress-add").style.display = "none";
        document.getElementById("cours-container").style.display = "block";
        fetchOneCourses(courseID);
      });

}

  
export { removeCourse, modifyCourse,fetchCourses,fetchOneCourses, updateCourseForm};

