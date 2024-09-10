import { checkUserLogin } from './function.js';
import { getCourses } from './api.js';
import { viewCourses } from './dat_view_html.js';

document.addEventListener('DOMContentLoaded', () => {
  favoriteCourses();

});






// Fovorite Courses
const favoriteCourses = async () => {
  const user = checkUserLogin();

  if (user) {
    try {
      const courses = await getCourses();
      var  favorites = courses.filter(course => 
        course.favorites.some(favorite => favorite.user === user.id && favorite.followStatus === true));
        console.log(favorites);
        viewCourses(favorites);

    } catch (error) {
      console.error('Error fetching courses:', error.response ? error.response.data : error.message);
    }
  }
};
