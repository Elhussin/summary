import { getCourses,addRate } from "./api.js";
import { viewCourses } from "./dat_view_html.js";
import { translations } from "./translations.js";

// Alert Message 
const alertMessage = (message) => {
    const messageAlrt = document.getElementById("message-alrt");
    messageAlrt.style.display = "block";
    messageAlrt.innerHTML = `<p>` + message + `</p>`;
    setInterval(function () {
        messageAlrt.style.display = "none";
    }, 10 * 1000);
};

// Add iteam to view our romve 
const displayIteam = (iteamView, IteamOff, diplayType) => {
    if (iteamView.style.display == "none") {
        iteamView.style.display = diplayType;
        IteamOff.style.display = "none";
    } else {
        iteamView.style.display = "none";
    }
};

// View Uploud Image   
// const viewUploudImage = () => {
//     document
//         .getElementById("id_image")
//         .addEventListener("change", function (event) {
//             const file = event.target.files[0];
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onload = function (e) {
//                     // Set image preview source
//                     document.getElementById("imagePreview").src = e.target.result;
//                 };
//                 reader.readAsDataURL(file);
//             }
//         });
// };

function viewUploudImage() {
  const imageUrlInput = document.getElementById("id_image");
  const imagePreview = document.getElementById("imagePreview");

  const url = imageUrlInput.value;

  if (url) {
      imagePreview.src = url;
      imagePreview.style.display = "block"; // Show the image preview
  } else {
      imagePreview.style.display = "none"; // Hide the image preview if the input is empty
  }
}

// create Commane Elmeant
const createCommaneElmeant = () => {
    const newDiv = document.createElement("div");
    newDiv.className = "w-90 m-auto-top10";
    newDiv.innerHTML = `
    <form id="comment-form" method="post">
    <div class="form-group">
    <label for="comments"> Comment</label>
    <textarea class="form-control" name="comment" id="comment"  rows="5"></textarea>
    <input type="submit" id="add-comments" class="btn-bg float-right m-3" value="Comment"/>
    </div>
    </form>
    `;
    return newDiv;
};

// view   Comments
const viewCommants = (data) => {
    const newDiv = document.createElement("div");
    newDiv.className = "w-90 m-auto-top10";
    newDiv.innerHTML = `
    <h2 class="m-1">Comments</h2>
    <hr>`;
    data.reverse().forEach((iteam) => {
        newDiv.innerHTML += `
        <div class="cmment-box">
          <p> ${iteam.comment} </p> 
          <div class="Cardnavgation">
        <p id="${iteam.user}">By :  ${iteam.user.username}</p>
        <p>Date: ${getdate(iteam.created_at)} </p>
        </div>
        </div>
        `;  
    });

    return newDiv;
};

// Update Url And Page Title
const updatpageurl = (data,title,itemId) => {
    document.title = `${title}`;
    const newUrl = `/view/${data}/${itemId}`;
    history.pushState({ path: newUrl }, "", newUrl);
};

// Change Page Theme 
function setTheme(mode, body, header) {
    if (mode === "dark") {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
      header.classList.add("dark-mode");
      header.classList.remove("light-mode");
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
      header.classList.add("light-mode");
      header.classList.remove("dark-mode");
    }
  }


// apply translations to the page
function applyTranslations(language) {
    const elementsToTranslate = document.querySelectorAll("[id]");
    elementsToTranslate.forEach((element) => {
      const translationKey = element.id;
      if (translations[language] && translations[language][translationKey]) {
        element.textContent = translations[language][translationKey];
      }
    });
  
    // Update the direction of the page based on the selected language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }

  // Save Selacte  Language
function initializeLanguageSwitcher() {
    const languageSwitcher = document.getElementById("languageSwitcher");
    const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
  
    // apply the saved language
    languageSwitcher.value = savedLanguage;
    applyTranslations(savedLanguage);
  
    // lesen for language change
    languageSwitcher.addEventListener("change", function () {
      const selectedLanguage = this.value;
      localStorage.setItem("selectedLanguage", selectedLanguage);
      applyTranslations(selectedLanguage);
    });
  }


  //view nav items for mobile view
function toggleNavItems() {
    const navigation = document.getElementById("navigation");
    navigation.style.display = navigation.style.display === "none" ? "block" : "none";
  }

//  display on and off
const   toggleVisibility = (element)=> {

  if (element) {
    // Change Betwwen Display our none
    if (element.style.display === 'none') {
      element.style.display = 'block'; // إظهار العنصر
    } else {
      element.style.display = 'none'; // إخفاء العنصر
    }
  } else {
    console.log('Element not found');
  }
}

// Check If Token Save
const checkAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alertMessage("Please login to View course details");
    return ;
  } else {
    return accessToken;
  }
}

// Check Use login And Get his Detiles
const checkUserLogin = () => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (!user) {
    alertMessage("Please login to add course");
    console.log("NO accessToken");
    return;
  } else {
    return user;
  }
}

// View Date Only 
const getdate = (date) => {
  const currentDate = new Date(date);
  const dateOnly = currentDate.toISOString().split('T')[0];
  return dateOnly;
};

// Confiarm User With data
const ConfiarmActifeUserWithData = async (user, data) => {
  if (user.id === data.user.id) {
    console.log("user is the one who add the course");
    return true;
  } else {
    return false;
  }
}

// Capitalize First Lattear 
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Search In Data 
const searchFunctian=async(searchQuery)=>{
  var AllCourses=await getCourses()
  const findCourses = AllCourses.filter((course) => {
    return course.title.includes(searchQuery);
  });
  viewCourses(findCourses);
  if (findCourses.length === 0) {
    alertMessage("No courses found", "danger");
  }
  if (searchQuery === "") {
    alertMessage("Please enter a search query", "danger");
  }

}

const favoriteCourses = async () => {
  const user = checkUserLogin();

  if (user) {
    try {
      const courses = await getCourses();
 
      var  favorites = courses.filter(course => 
        course.favorites.some(favorite => favorite.user.id === user.id && favorite.followStatus === true));
        viewCourses(favorites);
        document.getElementById("cours-detieals").innerHTML = `<h2  class="m-5" >Your Favorite Courses</h2>`;
    } catch (error) {
      console.error('Error fetching courses:', error.response ? error.response.data : error.message);
    }
  }
};

// Get Rate And Calcoulte it
const getRate=(data)=> {
  let rate= data.rate.reduce((acc, item) => acc + item.rate, 0) / data.rate.length
  rate=rate.toFixed(1);
  if(isNaN(rate)){
      return 'No Rate';
  }
  return rate;
}

// creat RAte Button 
const createRateeButton=(data)=>{
  getRate(data);
  const CountRate =data.rate.length;
  const newDiv = document.createElement("div");
  newDiv.className = "w-90 m-auto-top10 ";
  newDiv.innerHTML = `
  <div class="rating">
  <div>
  <input type="radio" name="star" id="star1" value="5"><label for="star1"></label>
  <input type="radio" name="star" id="star2" value="4"><label for="star2"></label>
  <input type="radio" name="star" id="star3" value="3"><label for="star3"></label>
  <input type="radio" name="star" id="star4" value="2"><label for="star4"></label>
  <input type="radio" name="star" id="star5" value="1"><label for="star5"></label>
  </div>
  <div><p>Rate: ${getRate(data)} <p>Votes:${CountRate} </p></p></div>
`;
  return newDiv;
}

// get rate value And Add it 
const getrateValue=()=>{
  var course_id = document.getElementById("course-id").dataset.courseid;
  const getActiveUsre = checkUserLogin().id;
  document.querySelectorAll('input[name="star"]').forEach((radio) => {
    // Add event listener to each radio button
    radio.addEventListener('change', function(e) {
      e.preventDefault();
      // Get the value of the selected radio button
      const selectedRating = this.value;
      const data = {
        course: course_id,
        user: getActiveUsre,
        rate: selectedRating,
      };
      addRate(data);
    });
  });
}

export {
    alertMessage, displayIteam, viewUploudImage, createCommaneElmeant, 
    viewCommants,updatpageurl ,setTheme ,applyTranslations ,
    initializeLanguageSwitcher,toggleNavItems,toggleVisibility,
    checkAccessToken,getdate, ConfiarmActifeUserWithData ,
    checkUserLogin,capitalizeFirstLetter,searchFunctian,favoriteCourses,getRate
    ,createRateeButton,getrateValue
};
