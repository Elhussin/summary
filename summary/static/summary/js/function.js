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
    newDiv.innerHTML = `
    <h2>Add Comment</h2>
    <hr>
    <label for="comments">Add Comment</label>
    <textarea class="form-control" name="comments" id="comments"  rows="5"></textarea>
    <input type="submit" id="add-comments" class="btn btn-primary float-right m-3" value="Comment"/>
    `;
    return newDiv;
};

// view   Comments
const viewCommants = (data) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<h2>Comments</h2>
    <hr>
    `;
    data.forEach((iteam) => {
        newDiv.innerHTML += `
        <div class="cmment-box">
        <p id="${iteam.user}">Add By ${iteam.user}  </p>
        <p> ${iteam.comment} </p> 
        <p>Created At: ${new Date(iteam.created_at)} </p>
        </div>
        `;  
    });

    return newDiv;
};

const updatpageurl = (data,title,itemId) => {
    console.log("url",data);
    // change page title
    document.title = `${title}`;
    const newUrl = `/view/${data.title}/${itemId}`;
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

    console.log("NO accessToken");
  } else {
    return accessToken;
  }
}


export {
    alertMessage, displayIteam, viewUploudImage, createCommaneElmeant, viewCommants,updatpageurl ,
    setTheme ,applyTranslations ,initializeLanguageSwitcher,toggleNavItems,
    toggleVisibility,checkAccessToken
};
