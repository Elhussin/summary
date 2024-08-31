import {  removeCourse, modifyCourse,fetchCourses,fetchOneCourses, updateCourseForm } from "./edit.js";
import {    alertMessage, displayIteam, viewUploudImage, createCommaneElmeant, viewCommants,updatpageurl} from "./function.js";
import {getCourses, getCourse, addCourseData, updateCourse, deleteCourse  } from "./api.js";


const viewContinear = document.getElementById("cours-container");


const viewCourses = (data) => {
  viewContinear.innerHTML = "";

  viewContinear.innerHTML += data
    .map(
      (item) => `
            <div class="card" id="${item.id}" >
              <img src="${item.image}" alt="${item.name}">
              <div class="card-content">
                  <h2 class="card-title">${item.name}</h2>
                  <p class="card-description">${item.description}</p>
              </div>
            </div>
          `
    )
    .join("");

  // ADd event listener to all cards
  cardViewEventListeners();
};


//  Event Listener for card
const cardViewEventListeners = () => {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const itemId = card.id;
      // get elemant title
      const itemTitle = card.querySelector(".card-title").textContent;
      //  re set url
      updatpageurl (data,itemTitle,itemId)

      fetchOneCourses(itemId);
    });
  });
}



// Display Item Details
const viewDatilesBox = document.getElementById("cours-detieals")
const displayItemDetails = (data) => {

  viewDatilesBox.innerHTML = '';

  // view main data for course
  viewDatilesBox.appendChild(mainCourseData(data))

  viewSummary(data);
  //  view course details
  viewDatilesBox.appendChild(viewDatiles(data));
  viewDatilesBox.appendChild(createCommaneElmeant())

  // add like and unlike event listener
  document.getElementById("like-course").addEventListener("click", (e) => {
    e.preventDefault;
  });

  document.getElementById("unlike-course").addEventListener("click", (e) => {
    e.preventDefault;
  })

  document.getElementById("favorite").addEventListener("click", (e) => {
    e.preventDefault;
  });

  // add commant box
  document.getElementById("add-comments").addEventListener("click", (e) => {
    e.preventDefault;
    document.getElementById("comments").value
  });

  // view course comments
  viewDatilesBox.appendChild(viewCommants(data.comments));

  const id = document.getElementById("course-id").dataset.courseid;

  // Delate Course
  document.getElementById("delate-course").addEventListener("click", (e) => {
    e.preventDefault;
    removeCourse(id);
  });

  // view summary deatiles 
  summaryViewEventListeners(data)

  // Edit Course
  document.getElementById("edit-course").addEventListener("click", (e) => {
    e.preventDefault;
    addDateToForm(data);
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
      updatpageurl (data,itemTitle,itemId) 

      

      const filteredSummary = data.summary.find(summary => summary.id == itemId);
      fetchOneSummary(filteredSummary)
    });
  });
}
// fetch one summary


const fetchOneSummary = (data) => {

  viewDatilesBox.appendChild(viewOneSummary(data));
  viewDatilesBox.appendChild(buttonGroup(data));
  viewDatilesBox.appendChild(createCommaneElmeant());
  const summary_coman = viewCommants(data.summary_comments)
  viewContinear.appendChild(summary_coman);
}



// Add data To  form to update it 
const addDateToForm = (data) => {
  const coursContainer = document.getElementById("cours-container");
  const coressAdd = document.getElementById("coress-add");
  document.getElementById("page-title").innerHTML = "Edit Course";
  document.getElementById("name").value = data.name;
  document.getElementById("description").value = data.description;
  document.getElementById("imagePreview").src = data.image;
  document.getElementById("send").value = "Update";
  displayIteam(coressAdd, coursContainer, "block");
  viewUploudImage();
};




export { viewCourses, displayItemDetails, summaryViewEventListeners, cardViewEventListeners,  fetchOneSummary, addDateToForm };