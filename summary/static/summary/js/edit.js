import {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse,
    alertMessage,
    displayIteam,
    viewUploudImage,
  } from "./api.js";
import { displayItemDetails, viewCourses } from "./displayItem.js";
//  to fetch one course

//  Updat Course
 const modifyCourse = async (id, formData) => {
  try {
    const updatedCourse = await updateCourse(id, formData);
    console.log("Updated Course:", updatedCourse);
    fetchOneCourses(id);
  } catch (error) {
    console.error("Error:", error);
  }
};
 const fetchCourses = async () => {
    try {
      const courses = await getCourses();
      viewCourses(courses);
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
        fetchOneCourses(courseID);
      });

}
const fetchOneCourses = async (id) => {
    try {
      const courses = await getCourse(id);
      displayItemDetails(courses);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
export { removeCourse, modifyCourse,fetchCourses,fetchOneCourses, updateCourseForm};

