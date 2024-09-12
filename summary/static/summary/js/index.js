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


// Add event listener to get search form data
document.getElementById("search-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const searchQuery = formData.get("search");
  console.log("searchQuery", searchQuery);
  // Fetch courses from the database
  // const courses = await getCourses(searchQuery);
  // console.log("courses", courses);
  // Display the courses
});
