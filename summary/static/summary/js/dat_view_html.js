import {
  removeCourse,
  fetchCourses,
  fetchOneCourses,
  updateCourseForm,
} from "./api_connect.js";
import { getActiveUsre } from "./api.js";
import {
  checkAccessToken,
  alertMessage,
  displayIteam,
  viewUploudImage,
  createCommaneElmeant,
  viewCommants,
  updatpageurl,

} from "./function.js";
// import {
//   getCourses,
//   getCourse,
//   addCourseData,
//   updateCourse,
//   deleteCourse,
// } from "./api.js";

import {
  AddCourseDataToHTml,
  viewCourseDatiles,
  viewSummary,
  viewOneSummary,
  addButtonGroup,
} from "./viewElmeantFunctian.js";
// main continer in body to view courses
const viewContinear = document.getElementById("cours-container");
// to view course details
const viewDatilesBox = document.getElementById("cours-detieals");

const viewCourses = (data) => {
  viewContinear.innerHTML = "";
  // view all courses
  //  return all courses data in html elements
  viewContinear.innerHTML += data
    .map(
      (item) => `
            <div class="card" id="${item.id}" >
              <img src="${item.image}" alt="${item.title}">
              <div class="card-content">
                  <h2 class="card-title">${item.title}</h2>
                  <p class="card-description">${item.description}</p>
              </div>
            </div>
          `
    )
    .join("");

  // ADd event listener to all cards
  // cardViewEventListeners function from dat_view_html.js 
  // cardViewEventListeners will add event listener to all cards

  cardViewEventListeners(data);
};

//  Event Listener for card
// cardViewEventListeners function 
// cardViewEventListeners will add event listener to all cards
// when click on card it will display the course details
// fetchOneCourses from api_connect.js
const cardViewEventListeners = (data) => {

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (event) => {

      // stop the default action
      event.preventDefault();
      
      // get elemant id
      const itemId = card.id;

      // get elemant title
      const itemTitle = card.querySelector(".card-title").textContent;

      // find course by id
      const course = data.find((item) => item.id == itemId);

      //  re set url & page Title 
      // updatpageurl function from function.js
      // updatpageurl will re set url
      updatpageurl(course, itemTitle, itemId);


      // view one course
      // fetchOneCourses from api_connect.js
      //fetchOneCourses will fetch one course from api.js then render data to displayItemDetails
      // and displayItemDetails will display the course details
      // displayItemDetails from dat_view_html.js
      fetchOneCourses(itemId);
    });
  });
};

// Display Item Details

const displayItemDetails = (data) => {
  //  clear the view
  viewDatilesBox.innerHTML = "";
  viewContinear.innerHTML = "";

  // view main data for course
  // AddCourseDataToHTml function from viewElmeantFunctian.js
  // AddCourseDataToHTml will return the course data in html elements
  viewDatilesBox.appendChild(AddCourseDataToHTml(data));

  // view all course Summary
  // viewSummary function from viewElmeantFunctian.js
  // viewSummary will return the course summary in html elements
  viewContinear.appendChild(viewSummary(data));

  // add button group
  // addButtonGroup function from viewElmeantFunctian.js
  // addButtonGroup will return the course buttons in html elements
  const token =checkAccessToken();
  if (token){
    viewDatilesBox.appendChild(addButtonGroup(data));
  }


  //  view course details
  // viewCourseDatiles function from viewElmeantFunctian.js
  // viewCourseDatiles will return the course details in html elements
  viewDatilesBox.appendChild(viewCourseDatiles(data));

  // add commant box
  // createCommaneElmeant function from function.js
  // createCommaneElmeant will return the course comments in html elements
  
  viewDatilesBox.appendChild(createCommaneElmeant());


  // vieew comments for course 
  // viewCommants function from function.js
  // viewCommants will return the course comments in html elements
  viewDatilesBox.appendChild(viewCommants(data.comments));


  // get course id
  const id = document.getElementById("course-id").dataset.courseid;

  // add like and unlike event listener
  document.getElementById("like-course").addEventListener("click", (e) => {
    e.preventDefault;
    console.log("like");
  });

  document.getElementById("unlike-course").addEventListener("click", (e) => {
    e.preventDefault;
  });

  document.getElementById("favorite").addEventListener("click", (e) => {
    e.preventDefault;
  });

  // add commant box
  document.getElementById("add-comments").addEventListener("click", (e) => {
    e.preventDefault;
    document.getElementById("comments").value;
  });

  // view course comments



  // Delate Course 

  document.getElementById("delate-course").addEventListener("click", (e) => {
    e.preventDefault;
    // remove course
    //  removeCourse function from api_connect.js
    // removeCourse will remove the course from api.js
    removeCourse(id);
  });

  // view summary deatiles
  summaryViewEventListeners(data);

  // Edit Course
  // when click on edit course it will add the course data to the form to update it
  document.getElementById("edit-course").addEventListener("click", (e) => {
    // stop the default action
    e.preventDefault;
    
    // add course data to the form to update it 
    // addDateToForm function from dat_view_html.js 
    addDateToForm(data);
    // call updateCourseForm function from api_connect.js
    // updateCourseForm will 
    updateCourseForm();
  });
};
// end of displayItemDetails

// get summary view event listeners
const summaryViewEventListeners = (data) => {
  document.querySelectorAll(".summary-box").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const itemId = card.id;
      // get elemant title
      const itemTitle = card.querySelector(".card-title").textContent;
      //  re set urupdatpageurll
      updatpageurl(data, itemTitle, itemId);
      const filteredSummary = data.summary.find(
        (summary) => summary.id == itemId
      );
      fetchOneSummary(filteredSummary);
    });
  });
};
// fetch one summary

const fetchOneSummary = (data) => {
  viewDatilesBox.innerHTML = "";
  viewContinear.innerHTML = "";
  viewDatilesBox.appendChild(viewOneSummary(data));
  viewDatilesBox.appendChild(addButtonGroup(data));
  viewDatilesBox.appendChild(createCommaneElmeant());
  const summary_coman = viewCommants(data.summary_comments);
  viewContinear.appendChild(summary_coman);
};

// Add data To  form to update it
const addDateToForm = (data) => {
  const coressAdd = document.getElementById("coress-add");
  document.getElementById("page-title").innerHTML = "Edit Course";
  document.getElementById("title").value = data.name;
  document.getElementById("description").value = data.description;
  document.getElementById("imagePreview").src = data.image;
  document.getElementById("send").value = "Update";
  displayIteam(coressAdd, viewContinear, "block");
  viewUploudImage();
};

export {
  viewCourses,
  displayItemDetails,
  summaryViewEventListeners,
  cardViewEventListeners,
  fetchOneSummary,
  addDateToForm,
};

