import { getActiveUsre } from "./api.js";
import { translations } from "./translations.js";
const alertMessage = (message) => {
    const messageAlrt = document.getElementById("message-alrt");
    messageAlrt.style.display = "block";
    messageAlrt.innerHTML = `<p>` + message + `</p>`;
    setInterval(function () {
        messageAlrt.style.display = "none";
    }, 10 * 1000);
};

const displayIteam = (iteamView, IteamOff, diplayType) => {
    if (iteamView.style.display == "none") {
        iteamView.style.display = diplayType;
        IteamOff.style.display = "none";
    } else {
        iteamView.style.display = "none";
    }
};

const viewUploudImage = () => {
    document
        .getElementById("id_image")
        .addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Set image preview source
                    document.getElementById("imagePreview").src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
};

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
  console.log("data",data); 

    const newDiv = document.createElement("div");
    newDiv.className = "w-90 m-auto-top10";
    newDiv.innerHTML = `
    <h2 class="m-1">Comments</h2>
    <hr>
    `;
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

const updatpageurl = (data,title,itemId) => {
    document.title = `${title}`;
    const newUrl = `/view/${data}/${itemId}`;
    history.pushState({ path: newUrl }, "", newUrl);
};


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
    // التبديل بين الإخفاء والإظهار
    if (element.style.display === 'none') {
      element.style.display = 'block'; // إظهار العنصر
    } else {
      element.style.display = 'none'; // إخفاء العنصر
    }
  } else {
    console.log('Element not found');
  }
}

const checkAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alertMessage("Please login to View course details");
    console.log("NO accessToken");
  } else {
    return accessToken;
  }
}
const checkUserLogin = () => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  if (!user) {
    alertMessage("Please login to add course");
    console.log("NO accessToken");
  } else {
    return user;
  }
}

const getdate = (date) => {
  const currentDate = new Date(date);
  const dateOnly = currentDate.toISOString().split('T')[0];
  return dateOnly;
};

const ConfiarmActifeUserWithData = async (user, data) => {
  if (user.id == data.user.id) {
    console.log("user is the one who add the course");
    return true;
  } else {
    return false;
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export {
    alertMessage, displayIteam, viewUploudImage, createCommaneElmeant, viewCommants,updatpageurl ,
    setTheme ,applyTranslations ,initializeLanguageSwitcher,toggleNavItems,
    toggleVisibility,checkAccessToken,getdate, ConfiarmActifeUserWithData ,checkUserLogin,capitalizeFirstLetter
};
