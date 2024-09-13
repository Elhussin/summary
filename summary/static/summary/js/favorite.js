import { checkUserLogin,favoriteCourses } from './function.js';
import { getCourses } from './api.js';
import { viewCourses } from './dat_view_html.js';
document.addEventListener('DOMContentLoaded', () => {
  favoriteCourses();

});


