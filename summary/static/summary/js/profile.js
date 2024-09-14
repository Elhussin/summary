import {
  getActiveUsre,
  addCourseData,
  getCourses,
  getSummaries,
  getOneSummary,
} from "./api.js";
import { logout } from "./login.js";
import {
  alertMessage,
  toggleVisibility,
  viewUploudImage,
  checkAccessToken,
  checkUserLogin,
  displayIteam,
  updatpageurl,
  favoriteCourses,
} from "./function.js";
import {
  viewCourses,
  viewSummary,
  summaryViewEventListeners,
  fetchOneSummary,
} from "./dat_view_html.js";
const CourseForm = document.getElementById("course_form");
const FormBox = document.getElementById("coress-add");
const viewBox = document.getElementById("view-box");
const coressAddBox = document.getElementById("course-add-box");
const courseViewBox = document.getElementById("course-view-box");
const viewContinear = document.getElementById("cours-container");

// to view course details
const viewDatilesBox = document.getElementById("cours-detieals");
// Load the user profile data when the page is loaded
// confirm that the user is logged in using JWT
document.addEventListener("DOMContentLoaded", () => {
  checkUserLoggedIn();
});

const checkUserLoggedIn = async () => {
  const accessToken = localStorage.getItem("accessToken");

  // If there is no access token, redirect to login page
  if (!accessToken) {
    window.location.href = "/login/?next=/profile/";
    return;
  }

  try {
    const response = await getActiveUsre(accessToken);
    displayUserProfile(response);
  } catch (error) {
    console.log("error", error);
    console.error(
      "Failed to fetch user profile:",
      error.response ? error.response.data : error.message
    );
    if (error.response.status === 401) {
      // If the token has expired, refresh it or redirect the user to login
      await refreshToken();
      // Retry after refreshing the token
      checkUserLoggedIn();
    } else {
      // If the error is not due to token expiration, log out the user
      logout();
    }
  }
};

const displayUserProfile = (data) => {
  document.getElementById("user-profile").style.display = "block";
  document.getElementById("user-username").innerText = data.username;
  document.getElementById("user-email").innerText = data.email;

  // view user courses if the user is a staff or superuser
  if (data.is_staff || data.is_superuser) {
    courseViewBox.style.display = "block";
    coressAddBox.style.display = "block";
    viewBox.style.display = "block";
  } else {
    courseViewBox.style.display = "none";
    coressAddBox.style.display = "none";
    viewBox.style.display = "none";
  }
};
if (coressAddBox) {
  coressAddBox.addEventListener("click", function () {
    displayIteam(FormBox, viewContinear, "block");
    viewUploudImage();
  });
}

//  Add New Course+
CourseForm.addEventListener("submit", function (event) {
  // block out Send form

  event.preventDefault();
  for (let instance in CKEDITOR.instances) {
    CKEDITOR.instances[instance].updateElement();
  }
  // get form detiels
  let formData = new FormData(this);
  try {
    addCourseData(formData);
    CourseForm.reset();
  } catch (error) {
    message = `Error adding course : ${error}`;
    alertMessage(message);
  }
});

courseViewBox.addEventListener("click", () => {
  displayIteam(viewContinear, FormBox, "flex");
  getUerCourses();
});

// view all courses active user
// get all courses
const getUerCourses = async () => {
  let userdatiles = checkUserLogin();
  try {
    const response = await getCourses();

    // filter courses by user id
    const userCourses = response.filter(
      (course) => course.user.id === userdatiles.id
    );
    viewCourses(userCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

const getLikedCourses = async () => {
  let user = checkUserLogin();
  try {
    const response = await getCourses();
    const likedCourses = response.filter((course) =>
      course.likes.some((like) => like.user === user.id)
    );
    console.log("likedCourses", likedCourses);
    viewCourses(likedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

const getUnlikedCourses = async () => {
  let user = checkUserLogin();
  try {
    const response = await getCourses();
    const unlikedCourses = response.filter((course) =>
      course.likes.some((like) => like.user === user.id && like.likes === false)
    );
    viewCourses(unlikedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

const getUnlikedsummary = async () => {
  const user = checkUserLogin();
  try {
    const response = await getSummaries();
    const unlikedSummary = response.filter((course) =>
      course.likes.some((like) => like.user === user.id && like.likes === false)
    );
    viewContinear.innerHTML = "";
    viewContinear.appendChild(viewSummary(unlikedSummary));
    document.querySelectorAll(".summary-box").forEach((card) => {
      // card.addEventListener("click", async (event) => {
      //   // getSummariesAndFetch(card.id);
        
      // });
      summaryViewEventListeners();
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

const getikedsummary = async () => {
  const user = checkUserLogin();
  try {
    const response = await getSummaries();
    const unlikedSummary = response.filter((course) =>
      course.likes.some((like) => like.user === user.id && like.likes === true)
    );
    viewContinear.innerHTML = "";
    viewContinear.appendChild(viewSummary(unlikedSummary));
    summaryViewEventListeners();
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// const getSummariesAndFetch = async (SummaryId) => {
//   try {
//     const response = await getOneSummary(SummaryId);
//     fetchOneSummary(response);
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     throw error;
//   }
// };

const favoriteSummaries = async () => {
  const user = checkUserLogin();

  if (user) {
    try {
      const summaries = await getSummaries();
      var userFavoritesSummaries = summaries.filter(summary => 
        summary.favorites.some(favorite => favorite.user.id === user.id && favorite.followStatus === true));
        viewContinear.innerHTML = "";
        viewContinear.appendChild(viewSummary(userFavoritesSummaries));
        summaryViewEventListeners();
    } catch (error) {
      console.error('Error fetching courses:', error.response ? error.response.data : error.message);
    }
  }
};



document
  .getElementById("liked-summary")
  .addEventListener("click", getikedsummary);
document
  .getElementById("unliked-summary")
  .addEventListener("click", getUnlikedsummary);

document
  .getElementById("liked-course")
  .addEventListener("click", getLikedCourses);
document
  .getElementById("unliked-course")
  .addEventListener("click", getUnlikedCourses);

document
  .getElementById("favorite-summaries")
  .addEventListener("click", favoriteSummaries);

document
  .getElementById("favourites-courses")
  .addEventListener("click",   favoriteCourses);