import {
  removeCourse,
  fetchCourses,
  fetchOneCourses,
  updateCourseForm,
} from "./api_connect.js";
import {
  getActiveUsre,
  AddComment,
  addSummary,
  addSummaryComments,
  delateOneSummary,
  addUpdateSummaryForm,
  getCourses,getOneSummary
} from "./api.js";
import {
  checkAccessToken,
  displayIteam,
  viewUploudImage,
  createCommaneElmeant,
  viewCommants,
  updatpageurl,
  checkUserLogin,
  getdate,
  capitalizeFirstLetter,getRate,getrateValue,createRateeButton
  
} from "./function.js";
import {
  AddCourseDataToHTml,
  viewCourseDatiles,
  viewSummary,
  viewOneSummary,
  AddNewSummary,
  favoriteLikeButtonGroup,
  delateEditButtonGroup,
  loginMassage,
  confiarmUserLike,
  confiarmUserFavorite,
  confiarmUserUnLike,
  addSummaryLikes,
  addSummaryunLikes,
  addSummaryFavorites,
  updateSummaryForm,
} from "./viewElmeantFunctian.js";
// main continer in body to view courses
const viewContinear = document.getElementById("cours-container");
// to view course details
const viewDatilesBox = document.getElementById("cours-detieals");

const viewCourses = (data) => {
  viewDatilesBox.innerHTML = "";
  viewContinear.innerHTML = "";
  // view all courses
  //  return all courses data in html elements
  viewContinear.innerHTML += data
    .reverse()
    .map(
      (item) => `
            <div class="card" id="${item.id}" >
              <img src="${item.image}" alt="${item.title}">
              <div class="card-content">
                  <h2 class="card-title">${capitalizeFirstLetter(
        item.title
      )}</h2>
              </div>
              <div class="card-footer bg-primary-color">
                  <p class="card-author" id="${item.user.id
        }">By: ${capitalizeFirstLetter(item.user.username)}</p>
                  <p class="card-date">Date: ${getdate(item.created_at)}</p>
                  <p >Rate: ${getRate(item)} </p>
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
      //  re set url & page Title
      // updatpageurl function from function.js
      // updatpageurl will re set url
      updatpageurl("courses", itemTitle, itemId);

      //fetchOneCourses will fetch one course from api.js then render data to displayItemDetails
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
    viewDatilesBox.appendChild(favoriteLikeButtonGroup(data, userDatiles));

    // check if the user is the one who add the course
    if (userDatiles.id == data.user.id) {
      // Add new summary
      viewContinear.appendChild(AddNewSummary());

      // delate and edit button group for the user who add the course
      viewDatilesBox.appendChild(delateEditButtonGroup(data));

      // delate course
      document
        .getElementById("delate-course")
        .addEventListener("click", (e) => {
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
      document
        .getElementById("summaryForm")
        .addEventListener("submit", async (e) => {
          const userid = checkUserLogin().id;
          console.log("id", id);
          e.preventDefault();
          const summary = new FormData(e.target);

          summary.append("course", id);
          summary.append("user", userid);
          addSummary(summary);
        });
    }
  } else {
    // if the user not loged in display login message
    viewDatilesBox.appendChild(loginMassage());
  }

  // view all summary for the course
  viewContinear.appendChild(viewSummary(data.summary));


  if (document.getElementById("course_form")) {
    document
      .getElementById("course_form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        // const id = checkUserLogin()

        // console.log("id",id);
        const formData = new FormData(e.target);
        updateCourseForm(id, formData);
      });
  }

  // viewCourseDatiles will return the course details in html elements
  viewDatilesBox.appendChild(viewCourseDatiles(data));
  getUsers();

  // add commant box - createCommaneElmeant will return the course comments in html elements
  if (token) {
    viewDatilesBox.appendChild(createRateeButton(data));
    getrateValue()
    viewDatilesBox.appendChild(createCommaneElmeant());
  }

  // get course id
  var id = document.getElementById("course-id").dataset.courseid;

  // viewCommants will return  All comments for the course in html elements
  viewDatilesBox.appendChild(viewCommants(data.comments));
  // check if the user loged in
  if (token) {
    // add event listener to like
    document.getElementById("like-course").addEventListener("click", (e) => {
      e.preventDefault();
      confiarmUserLike(data, userDatiles);
    });

    // add event listener to unlike
    document.getElementById("unlike-course").addEventListener("click", (e) => {
      e.preventDefault();
      confiarmUserUnLike(data, userDatiles);
    });

    // add event listener to add favorite
    document.getElementById("favorite").addEventListener("click", (e) => {
      e.preventDefault();
      confiarmUserFavorite(data, userDatiles);
    });
  
    // add event listener to add comment
    document
      .getElementById("comment-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const comment = new FormData(e.target);
        comment.append("course", id);
        comment.append("user", userDatiles.id);
        AddComment(comment, id);
      });
  }

  // add event listener when click on the summary card it will display his details
  summaryViewEventListeners();
};
// end of displayItemDetails

// get summary view event listeners
const summaryViewEventListeners = () => {
  document.querySelectorAll(".summary-box").forEach((card) => {
    card.addEventListener("click",async (event) => {
      event.preventDefault();
      const itemId = card.id;
      // get elemant title
      const itemTitle = card.querySelector(".card-title").textContent;
      //  re set urupdatpageurll
      updatpageurl("summaries", itemTitle, itemId);
      const getSummary = await getOneSummary(itemId);
      // const course = data.summary.find((item) => item.id == itemId);
      fetchOneSummary(getSummary);
    });
  });
};

// fetch one summary
const fetchOneSummary = async (data) => {
  viewDatilesBox.innerHTML = "";
  viewContinear.innerHTML = "";

  const token = checkAccessToken();
  if (token) {
    var userDatiles = await getActiveUsre(token);

    viewContinear.appendChild(viewOneSummary(data));
    getUsers();
    viewContinear.appendChild(createCommaneElmeant());
    viewContinear.appendChild(viewCommants(data.comments));
    viewDatilesBox.appendChild(favoriteLikeButtonGroup(data, userDatiles));
    if (userDatiles.id == data.user.id) {
      viewDatilesBox.appendChild(delateEditButtonGroup(data));
      document
        .getElementById("delate-course")
        .addEventListener("click", (e) => {
          e.preventDefault;
          delateOneSummary(data.id, data.course);
        });
      document.getElementById("edit-course").addEventListener("click", (e) => {
        e.preventDefault;
        viewContinear.innerHTML = "";
        viewDatilesBox.innerHTML = "";
        viewContinear.appendChild(updateSummaryForm(data));

        document
          .getElementById("updateSummary")
          .addEventListener("submit", async (e) => {
            console.log("data", e.target);
            e.preventDefault();
            const formData = new FormData(e.target);
            formData.append("course", data.course);
            formData.append("user", userDatiles.id);
            addUpdateSummaryForm(data.id, formData);
          });
      });
    }

    // add event listener to like button to add like four summary
    document.getElementById("like-course").addEventListener("click", (e) => {
      e.preventDefault();
      addSummaryLikes(data, userDatiles);
    });

    document.getElementById("unlike-course").addEventListener("click", (e) => {
      e.preventDefault();
      addSummaryunLikes(data, userDatiles);
    });

    document.getElementById("favorite").addEventListener("click", (e) => {
      e.preventDefault();
      addSummaryFavorites(data, userDatiles);
    });

    document
      .getElementById("comment-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const comment = new FormData(e.target);
        comment.append("course", data.course);
        comment.append("user", userDatiles.id);
        comment.append("summary", data.id);
        addSummaryComments(comment);
      });
  }
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

// Ensure the CKEditor initialization runs after the DOM is fully loaded

// Check if CKEDITOR is defined
if (typeof CKEDITOR !== "undefined") {
  // Initialize CKEditor on the textarea with id 'editor1'

  CKEDITOR.replace("description", {
    height: 300, // Set the editor height
    toolbar: [
      {
        name: "basicstyles",
        items: [
          "Bold",
          "Italic",
          "Underline",
          "Strike",
          "Subscript",
          "Superscript",
        ],
      },
      {
        name: "paragraph",
        items: [
          "NumberedList",
          "BulletedList",
          "-",
          "Outdent",
          "Indent",
          "-",
          "Blockquote",
        ],
      },
      { name: "editing", items: ["Scayt"] },
      { name: "links", items: ["Link", "Unlink"] },
      {
        name: "insert",
        items: ["Image", "Table", "HorizontalRule", "SpecialChar"],
      },
      { name: "styles", items: ["Styles", "Format"] },
      { name: "about", items: ["About"] },
    ],
  });
} else {
  console.error(
    "CKEDITOR is not defined. Check the script link or network connectivity."
  );
}

const getUsers = async() => {
  const GetUsersId = document.querySelectorAll('.user_id');
  let getCoursesdata = await getCourses();
if (GetUsersId.length > 0) {
  // إضافة مستمع للنقر على كل عنصر في المجموعة
  GetUsersId.forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault(); 
          const id = event.target.id; 
          const userCourses = getCoursesdata.filter(course => course.user.id == id);
         
          viewDatilesBox.innerHTML = '';
          viewContinear.innerHTML = '';
          viewCourses(userCourses);
          
          console.log(userCourses[0].user);
          addUserdetails(userCourses[0].user);
          getUsers();
      });
  });
} else {
  console.log('No elements found');
}

}


const addUserdetails = (data) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("user_id");
  newDiv.id = data.id;
  newDiv.innerHTML=`
  <div class="Cardnavgation">
  <h2>All Courses Add By  By <a href="/users" class="user_id"   id="${data.id}">${capitalizeFirstLetter(data.username)}</a></h2>
  </div>

  <p class="m-1">User Datails</p>
  <div class="Cardnavgation">
    <p>Email :${data.email}</p>
  </div>

  <div class="Cardnavgation">
      <p>Name :${data.first_name} <span> ${data.last_name} <span></p>
  </div>
  `
  viewDatilesBox.appendChild(newDiv);
};


export {
  viewCourses,
  displayItemDetails,
  summaryViewEventListeners,
  cardViewEventListeners,
  fetchOneSummary,
  addDateToForm,
  viewSummary,
};



