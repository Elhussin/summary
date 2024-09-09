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
 
    // get active user
    var userDatiles = await getActiveUsre(token);

    // favorite and like button 
    viewDatilesBox.appendChild(favoriteLikeButtonGroup(data,userDatiles));

    // check if the user is the one who add the course
    if (userDatiles.id == data.user.id) {

        // Add new summary
        viewContinear.appendChild(AddNewSummary());

        // delate and edit button group for the user who add the course
        viewDatilesBox.appendChild(delateEditButtonGroup(data));

        // delate course
        document.getElementById("delate-course").addEventListener("click", (e) => {
          e.preventDefault;
          removeCourse(id);
        });


        // fill form with data to update it
        //
        document.getElementById("edit-course").addEventListener("click", (e) => {
          e.preventDefault;
          // addDateToForm function from dat_view_html.js 
          addDateToForm(data);
        });

        // add new summary
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
      // if the user not loged in display login message
      viewDatilesBox.appendChild(loginMassage());
    }

    // view all summary for the course
    viewContinear.appendChild(viewSummary(data));


    // update course 
    if( document.getElementById("course_form"))
    {
      document.getElementById("course_form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        updateCourseForm(id, formData);
      });
  
    }


    // viewCourseDatiles will return the course details in html elements
    viewDatilesBox.appendChild(viewCourseDatiles(data));

    // add commant box - createCommaneElmeant will return the course comments in html elements
    if (token) { viewDatilesBox.appendChild(createCommaneElmeant()); }

    // get course id
    let id = document.getElementById("course-id").dataset.courseid;

    // viewCommants will return  All comments for the course in html elements
    viewDatilesBox.appendChild(viewCommants(data.comments));


    // check if the user loged in 
    if (token) {
        
      // add event listener to like
      document.getElementById("like-course").addEventListener("click", (e) => {
        e.preventDefault();      
        confiarmUserLike(data,userDatiles);
      });

      // add event listener to unlike
      document.getElementById("unlike-course").addEventListener("click", (e) => {
        e.preventDefault();
        confiarmUserUnLike(data,userDatiles);

      });

      // add event listener to add favorite
      document.getElementById("favorite").addEventListener("click", (e) => {
        e.preventDefault();
        confiarmUserFavorite(data,userDatiles);
      });

      // add event listener to add comment
      document.getElementById("comment-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const comment = new FormData(e.target);
        comment.append("course", id);
        comment.append("user", userDatiles.id);
        AddComment(comment, id);
      });


    }

    // add event listener when click on the summary card it will display his details
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
    console.log("fetchOneSummary",data);
    viewDatilesBox.innerHTML = "";
    viewContinear.innerHTML = "";

    const token = checkAccessToken();
    if (token) {
    var userDatiles = await getActiveUsre(token);
    }
    viewDatilesBox.appendChild(viewOneSummary(data));
    viewDatilesBox.appendChild(favoriteLikeButtonGroup(data,userDatiles));
    viewDatilesBox.appendChild(createCommaneElmeant());
    const summary_coman = viewCommants(data.summary.comments);
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

