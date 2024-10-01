import {getActiveUsre,addCourseData,getCourses,getSummaries,refreshToken} from "./api.js";
import { logout } from "./login.js";
import {
  alertMessage,
  viewUploudImage,
  checkUserLogin,
  displayIteam,
  favoriteCourses,
} from "./function.js";
import {
  viewCourses,
  viewSummary,
  summaryViewEventListeners,
} from "./dat_view_html.js";

const CourseForm = document.getElementById("course_form");
const FormBox = document.getElementById("coress-add");
const viewBox = document.getElementById("view-box");
const coressAddBox = document.getElementById("course-add-box");
const courseViewBox = document.getElementById("course-view-box");
const viewContinear = document.getElementById("cours-container");


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

// View User deatiles
const displayUserProfile = (data) => {
  document.getElementById("user-profile").style.display = "block";
  document.getElementById("user-username").innerText = data.username;
  document.getElementById("user-email").innerText = data.email;
  document.getElementById("user-role").innerText = data.is_staff ? "Staff" : "User";
  document.getElementById("user-id").innerText = data.id
  document.getElementById("user-joined").innerText = new Date(data.date_joined).toDateString();


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

// to creat new course
if (coressAddBox) {
  coressAddBox.addEventListener("click", function () {
    displayIteam(FormBox, viewContinear, "block");
    viewUploudImage();
  });
}

//  Add New Course+
CourseForm.addEventListener("submit", function (event) {
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
    alertMessage( `Error adding course : ${error}`);
  }
});

// get course add by user 
courseViewBox.addEventListener("click", () => {
  displayIteam(viewContinear, FormBox, "flex");
  getUerCourses();
});

// view all courses For  active user
const getUerCourses = async () => {
  let userdatiles = checkUserLogin();
  try {
    const response = await getCourses();

    // filter courses by user id
    const userCourses = response.filter((course) => course.user.id === userdatiles.id);
    viewCourses(userCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// view liked courses bu avctive user
const getLikedCourses = async () => {
  let user = checkUserLogin();
  try {
    const response = await getCourses();
    const likedCourses = response.filter((course) =>course.likes.some((like) => like.user === user.id));
    viewCourses(likedCourses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

//  get Uulike iteam bu active user
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

// Get Inlike Summary for Active USer
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
      summaryViewEventListeners();
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Get liked Summary for Active user
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

// get Favorites summary add by Active user
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


// Add event listener
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