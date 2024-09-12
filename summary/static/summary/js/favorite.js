import { checkUserLogin } from './function.js';
import { getCourses,getSummaries } from './api.js';
import { viewCourses } from './dat_view_html.js';
import { viewSummary } from "./viewElmeantFunctian.js";

document.addEventListener('DOMContentLoaded', () => {
  favoriteSummaries();
  favoriteCourses();

});





// viewContinear.appendChild(viewSummary(data.summary));
// Fovorite Courses




const favoriteCourses = async () => {
  const user = checkUserLogin();

  if (user) {
    try {
      const courses = await getCourses();
        // viewCourses(userFavoritesSummaries)
      var  favorites = courses.filter(course => 
        course.favorites.some(favorite => favorite.user.id === user.id && favorite.followStatus === true));
        viewCourses(favorites);
    } catch (error) {
      console.error('Error fetching courses:', error.response ? error.response.data : error.message);
    }
  }
};