import { translations } from './translations.js';

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
    if(navigation.style.display == 'none'){
        navigation.style.display='block'
    }else{
        navigation.style.display='none';
    }
}