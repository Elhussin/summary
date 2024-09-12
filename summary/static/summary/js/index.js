import {  removeCourse,fetchCourses,fetchOneCourses, updateCourseForm } from "./api_connect.js";
import {    alertMessage, displayIteam, viewUploudImage, createCommaneElmeant, viewCommants,} from "./function.js";
import {getCourses, getCourse, addCourseData, updateCourse, deleteCourse  } from "./api.js";



const coursContainer = document.getElementById("cours-container");
const coressAdd = document.getElementById("coress-add");
const addCourseForm = document.getElementById("course_form");
const coressViewBtn = document.getElementById("course-view-btn");
const coressAddBtn = document.getElementById("course-add-btn");

document.addEventListener("DOMContentLoaded", (event) => {
//  fetch all courses from api_connect
  fetchCourses();

});


// filter courses by User
document.querySelectorAll(".card-author").forEach((user) => {
  user.addEventListener("click", (event) => {
    console.log("user", user);
    event.preventDefault();
    // fetchCourses();
  });

}
);

// const filterCourses = (courses) => {
//   const user = getActiveUsre();
//   return courses.filter((course) => course.user === user.id);
// };

