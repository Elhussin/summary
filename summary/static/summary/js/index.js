import {  removeCourse, modifyCourse,fetchCourses,fetchOneCourses, updateCourseForm } from "./edit.js";
import {    alertMessage, displayIteam, viewUploudImage, createCommaneElmeant, viewCommants,} from "./function.js";
import {getCourses, getCourse, addCourseData, updateCourse, deleteCourse  } from "./api.js";



const coursContainer = document.getElementById("cours-container");
const coressAdd = document.getElementById("coress-add");
const addCourseForm = document.getElementById("course_form");
const coressViewBtn = document.getElementById("course-view-btn");
const coressAddBtn = document.getElementById("course-add-btn");

document.addEventListener("DOMContentLoaded", (event) => {
  fetchCourses();
  coressAddBtn.addEventListener("click", () => {
    displayIteam(coressAdd, coursContainer, "block");
  });
  
  viewUploudImage();

  coressViewBtn.addEventListener("click", () => {
    displayIteam(coursContainer, coressAdd, "flex");
    fetchCourses();
  });
});

//  Add New Course

addCourseForm.addEventListener("submit", function (event) {
  // block out Send form
  event.preventDefault();
  // get form detiels
  let formData = new FormData(this);
  var message = "";
  try {
    const data = addCourseData(formData);
    if (data) {
      message = "Course added successfully";
      alertMessage(message);
      document.getElementById("course_form").reset();
      document.getElementById("imagePreview").src = "";
    } else {
      message = "Error adding course : ${data.error}";
      alertMessage(message);
    }
  } catch (error) {
    message = "Error adding course : ${error}";
    alertMessage(message);
  }
});
