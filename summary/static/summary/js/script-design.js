const translations = {
    en: {

        title: "Summaries",
        "link-home": "Home",
        "link-about": "About",
        "link-contact": "Contact",
        "link-project": "Project",
        "about-title": "About Me",
        
        "about-description": "I am a web developer with a passion for creating beautiful and functional websites To help my community and make our life more easier."
    },
    ar: {
        title:"الملخص",
        "link-home": "الصفحة الرئيسية",
        "link-about": "حول",
        "link-contact": "اتصل",
        "link-project": "المشاريع",
        "about-title": "عنّي",
        "about-description": "أنا مطور ويب شغوف بإنشاء مواقع جميلة وعملية."
    }
};


document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("nav-view").onclick = function() {navIteam()};
    const toggleButton = document.getElementById('dark-mode');
    const currentMode = localStorage.getItem('theme');
    const body = document.body;
    const header = document.getElementById('header');

    // set dark mode or light mode and save it in local storge 
    if (currentMode === 'dark') {
        body.classList.add('dark-mode');
        header.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode');
        header.classList.add('light-mode');
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        header.classList.toggle('dark-mode');
        header.classList.toggle('light-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });
});



const languageSwitcher = document.getElementById('languageSwitcher');

// Function to apply translations
function applyTranslations(language) {
    const elementsToTranslate = document.querySelectorAll('[id]');
    elementsToTranslate.forEach(element => {
        const translationKey = element.id;
        if (translations[language][translationKey]) {
            element.textContent = translations[language][translationKey];
        }
    });
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

}

// Event listener for language switcher
languageSwitcher.addEventListener('change', function() {
    const selectedLanguage = this.value;

    localStorage.setItem('selectedLanguage', selectedLanguage);
    applyTranslations(selectedLanguage);
});

// Initialize with the selected or default language
window.addEventListener('load', () => {
    
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSwitcher.value = savedLanguage;
    applyTranslations(savedLanguage);
});





//  nav for small screen view and display button 
function navIteam(){
    const navigation=document.getElementById('navigation');
// //const modeImage2=`
//  <svg fill="#143d80" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 297 297" xml:space="preserve" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(90)" stroke="#143d80"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M280.214,39.211H16.786C7.531,39.211,0,46.742,0,55.997v24.335c0,9.256,7.531,16.787,16.786,16.787h263.428 c9.255,0,16.786-7.531,16.786-16.787V55.997C297,46.742,289.469,39.211,280.214,39.211z"></path> <path d="M280.214,119.546H16.786C7.531,119.546,0,127.077,0,136.332v24.336c0,9.255,7.531,16.786,16.786,16.786h263.428 c9.255,0,16.786-7.531,16.786-16.786v-24.336C297,127.077,289.469,119.546,280.214,119.546z"></path> <path d="M280.214,199.881H16.786C7.531,199.881,0,207.411,0,216.668v24.335c0,9.255,7.531,16.786,16.786,16.786h263.428 c9.255,0,16.786-7.531,16.786-16.786v-24.335C297,207.411,289.469,199.881,280.214,199.881z"></path> </g> </g> </g> </g></svg>`
// const modeImage1=`
//  <svg fill="#143d80" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 297 297" xml:space="preserve" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)" stroke="#143d80"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M280.214,39.211H16.786C7.531,39.211,0,46.742,0,55.997v24.335c0,9.256,7.531,16.787,16.786,16.787h263.428 c9.255,0,16.786-7.531,16.786-16.787V55.997C297,46.742,289.469,39.211,280.214,39.211z"></path> <path d="M280.214,119.546H16.786C7.531,119.546,0,127.077,0,136.332v24.336c0,9.255,7.531,16.786,16.786,16.786h263.428 c9.255,0,16.786-7.531,16.786-16.786v-24.336C297,127.077,289.469,119.546,280.214,119.546z"></path> <path d="M280.214,199.881H16.786C7.531,199.881,0,207.411,0,216.668v24.335c0,9.255,7.531,16.786,16.786,16.786h263.428 c9.255,0,16.786-7.531,16.786-16.786v-24.335C297,207.411,289.469,199.881,280.214,199.881z"></path> </g> </g> </g> </g></svg>`
//  
    if(navigation.style.display == 'none'){
        navigation.style.display='block'
        // document.getElementById('nav-view').innerHTML=modeImage2;
    }else{
        navigation.style.display='none';
        // document.getElementById('nav-view').innerHTML=modeImage1;
    }
}