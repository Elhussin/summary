import {getActiveUsre ,addCourseData } from './api.js';  
import { logout } from './login.js';
import { alertMessage ,toggleVisibility,viewUploudImage,checkAccessToken} from './function.js';

const CourseForm = document.getElementById("course_form");
const FormBox = document.getElementById("form-box");
const viewBox = document.getElementById("view-box");
const coressAddBox = document.getElementById("course-add-box");
const courseViewBox = document.getElementById("course-view-box");

    // Load the user profile data when the page is loaded
    // confirm that the user is logged in using JWT
    document.addEventListener('DOMContentLoaded', () => {
        checkUserLoggedIn();

    });

const  checkUserLoggedIn= async () => {

    const accessToken = localStorage.getItem("accessToken");

    // If there is no access token, redirect to login page
    if (!accessToken) {
      window.location.href = "/login/?next=/profile/";
      return;
    }

    try {
      const response= await getActiveUsre(accessToken);
      displayUserProfile(response);
    } catch (error) {
      console.log("error",error);
      console.error("Failed to fetch user profile:",error.response ? error.response.data : error.message);
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
  }

const displayUserProfile = (data) => {  
      console.log("data",data);
      document.getElementById('user-profile').style.display = 'block';
      document.getElementById('user-username').innerText = data.username;
      document.getElementById('user-email').innerText = data.email;
  
      // عرض الأزرار إذا كان المستخدم مشرفًا
      if (data.is_staff) {
        courseViewBox.style.display = 'block';
        coressAddBox.style.display = 'block';
        viewBox.style.display = 'block';

       
      }
  
    }


    if(coressAddBox){
      coressAddBox.addEventListener("click", function () {

        toggleVisibility(FormBox);
        viewUploudImage();

      });
    }


//  Add New Course

CourseForm.addEventListener("submit", function (event) {
  // block out Send form
  event.preventDefault();
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




