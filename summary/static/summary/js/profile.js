import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  alertMessage,
  displayIteam,
} from "./api.js";
//   boxes
const coursContainer = document.getElementById("cours-container");
const coressAdd = document.getElementById("coress-add");
const addCourseForm=document.getElementById("course_form")
// buttons
const coressViewBtn = document.getElementById("course-view-btn");
const coressAddBtn = document.getElementById("course-add-btn");


document.addEventListener("DOMContentLoaded", (event) => {
// display block our none for add course itream add listner event to view our romve form display
coressAddBtn.onclick = ()=> { displayIteam(coressAdd, coursContainer, "block");};
  //  add event for courses view button
  coressViewBtn.addEventListener("click", () => {
    displayIteam(coursContainer, coressAdd, "flex");
    // fetchCourses();
  });
});

// function to display our none diplay iteams 





//  Add New Course
addCourseForm.addEventListener("submit", function (event) {
    var message =''
    // block out Send form
    event.preventDefault();
    // get form detiels
    let formData = new FormData(this);

    // Send data by Axios
    axios .post("/api/courses/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": formData.get("csrfmiddlewaretoken"), // get from form  CSRF Token
        },
      })
      .then((response) => {
        message = "Course added successfully";
        alertMessage(message);
        document.getElementById("course_form").reset();
        console.log("Course added successfully:", response.data);
      })
      .catch((error) => {
        message = "Error adding course";
        alertMessage(message );
        console.error("Error adding course:", error);
      });
  });

    
//   document.getElementById('image').addEventListener('change', function(event) {
//     const file = event.target.files[0]; 

//     if (file) {
//         const reader = new FileReader();

//         reader.onload = function(e) {
//             document.getElementById('imagePreview').src = e.target.result; // Set image preview source
//         };

//         reader.readAsDataURL(file); 
//     }
// });

// document.getElementById('setDefaultImage').addEventListener('click', function() {
//   const defaultImageUrl = '/static/summary/img/logo.PNG'; // URL of the default image
//   document.getElementById('imagePreview').src = defaultImageUrl;
// });