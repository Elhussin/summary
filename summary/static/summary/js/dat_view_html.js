import {
  removeCourse,
  fetchCourses,
  fetchOneCourses,
  updateCourseForm,
  
} from "./api_connect.js";
import { getActiveUsre, addlike, updateLike,AddComment, addSummary } from "./api.js";
import {
  checkAccessToken, alertMessage, displayIteam,
  viewUploudImage,
  createCommaneElmeant,
  viewCommants,
  updatpageurl,ConfiarmActifeUserWithData,

} from "./function.js";
import {
  AddCourseDataToHTml,
  viewCourseDatiles,
  viewSummary,
  viewOneSummary,
  AddNewSummary,
  favoriteLikeButtonGroup,
  delateEditButtonGroup, loginMassage
,confiarmUserLike,confiarmUserFavorite,
confiarmUserUnLike} from "./viewElmeantFunctian.js";
// main continer in body to view courses
const viewContinear = document.getElementById("cours-container");
// to view course details
const viewDatilesBox = document.getElementById("cours-detieals");

const viewCourses = (data) => {
  console.log(data);
  viewContinear.innerHTML = "";
  // view all courses
  //  return all courses data in html elements
  viewContinear.innerHTML += data.reverse()
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



// displayItemDetails function
// displayItemDetails will display the course details

const displayItemDetails = async (data) => {

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
  

  const token = checkAccessToken();
  if (token) {
    
    // add delate and edit button group for the user who add the course
    var userDatiles = await getActiveUsre(token);

    // favoriteLikeButtonGroup function from viewElmeantFunctian.js
    // favoriteLikeButtonGroup will return the course buttons in html elements
    viewDatilesBox.appendChild(favoriteLikeButtonGroup(data,userDatiles));

    // check if the user is the one who add the course
    
    if (userDatiles.id == data.user.id) {

      viewContinear.appendChild(AddNewSummary());
      viewDatilesBox.appendChild(delateEditButtonGroup(data));

      document.getElementById("delate-course").addEventListener("click", (e) => {
        e.preventDefault;
        //  removeCourse function from api_connect.js
        removeCourse(id);
      });


      // Edit Course
      // when click on edit course it will add the course data to the form to update it
      document.getElementById("edit-course").addEventListener("click", (e) => {
        // stop the default action
        e.preventDefault;
        // addDateToForm function from dat_view_html.js 
        addDateToForm(data);
      });

      document.getElementById("summaryForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const summary =  new FormData(e.target);
        summary.append("course", id);
        summary.append("user", userDatiles.id);
        console.log(summary);
        addSummary(summary);
      }
      );

    }
  }
    else {
      viewDatilesBox.appendChild(loginMassage());
    }
    viewContinear.appendChild(viewSummary(data));


    // update course form
    if( document.getElementById("course_form"))
    {
      document.getElementById("course_form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        updateCourseForm(id, formData);
      });
  
    }



    //  view course details
    // viewCourseDatiles function from viewElmeantFunctian.js
    // viewCourseDatiles will return the course details in html elements

    viewDatilesBox.appendChild(viewCourseDatiles(data));

    // add commant box
    // createCommaneElmeant function from function.js
    // createCommaneElmeant will return the course comments in html elements
    if (token) { viewDatilesBox.appendChild(createCommaneElmeant()); }


      // checkAccessToken function from function.js
  // get course id
  let id = document.getElementById("course-id").dataset.courseid;

    // vieew comments for course 
    // viewCommants function from function.js
    // viewCommants will return the course comments in html elements
    viewDatilesBox.appendChild(viewCommants(data.comments));




    // add like and unlike event listener
    if (token) {
      
    document.getElementById("like-course").addEventListener("click", (e) => {
      e.preventDefault();      
      confiarmUserLike(data,userDatiles);
    });


    document.getElementById("unlike-course").addEventListener("click", (e) => {
      e.preventDefault();
      confiarmUserUnLike(data,userDatiles);

    });

    document.getElementById("favorite").addEventListener("click", (e) => {
      e.preventDefault();
      confiarmUserFavorite(data,userDatiles);
    });


    document.getElementById("comment-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const comment = new FormData(e.target);
      comment.append("course", id);
      comment.append("user", userDatiles.id);
      AddComment(comment, id);
    });


  }
    // view course comments



    // Delate Course 

    // view summary deatiles
    summaryViewEventListeners(data);


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
        fetchOneSummary(data);
        const filteredSummary = data.summary.find(
          (summary) => summary.id == itemId
        );
        fetchOneSummary(filteredSummary);
      });
    });
  };
  // fetch one summary

  const fetchOneSummary = async (data) => {
    console.log(data);
    viewDatilesBox.innerHTML = "";
    viewContinear.innerHTML = "";

    const token = checkAccessToken();
    if (token) {
    var userDatiles = await getActiveUsre(token);
    }
    viewDatilesBox.appendChild(viewOneSummary(data));
    viewDatilesBox.appendChild(favoriteLikeButtonGroup(data,userDatiles));
    viewDatilesBox.appendChild(createCommaneElmeant());
    const summary_coman = viewCommants(data.summary
      .comments);
    viewContinear.appendChild(summary_coman);
  };




  // Add data To  form to update it
  const addDateToForm = async (data) => {
    const coressAdd = document.getElementById("coress-add");
    document.getElementById("page-title").innerHTML = "Edit Course";
    document.getElementById("title").value = data.title;
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

