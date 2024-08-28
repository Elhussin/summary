
import {fetchCourses} from "./edit.js";
import { alertMessage, displayIteam, viewUploudImage, addCourseData,} from "./api.js";

const coursContainer = document.getElementById("cours-container");
const coressAdd = document.getElementById("coress-add");
const addCourseForm=document.getElementById("course_form")
const coressViewBtn = document.getElementById("course-view-btn");
const coressAddBtn = document.getElementById("course-add-btn");


document.addEventListener("DOMContentLoaded", (event) => {
  fetchCourses();
// display block our none for add course itream add listner event to view our romve form display
      // coressAddBtn.onclick = ()=> {displayIteam(coressAdd, coursContainer, "block")  };
      coressAddBtn.addEventListener("click", () => {
        
        displayIteam(coressAdd, coursContainer, "block");});
      viewUploudImage()
      coressViewBtn.addEventListener("click", () => {
        displayIteam(coursContainer, coressAdd, "flex")
        fetchCourses();
        
       });

});


//  Add New Course
addCourseForm.addEventListener("submit", function (event) {
    // block out Send form
    event.preventDefault();
    // get form detiels
    let formData = new FormData(this);
    var message =''
    try {
      const data =  addCourseData(formData);
      if (data.error) {
        message = "Error adding course : ${data.error}";
        alertMessage(message);
        return;
      }else{
      message = "Course added successfully";
      alertMessage(message);
      document.getElementById("course_form").reset();
      document.getElementById("imagePreview").src='';
      }
    } catch (error) {
      message = "Error adding course : ${error}";
      alertMessage(message);
    }
  });

    
