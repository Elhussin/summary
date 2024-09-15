import {fetchCourses} from "./api_connect.js";
import {getCourses} from "./api.js";
import { viewCourses } from "./dat_view_html.js";

document.addEventListener("DOMContentLoaded", (event) => {
  fetchCourses();
});


// GEl Last 6 course add 
const LastAddCourses = async () => {
  const courses = await getCourses();
  const lastAddCourses = courses.slice(-6);
  viewCourses(lastAddCourses)
};



// Ge course add to like from more the 4
const TopLikeCourses = async () => {
  const courses = await getCourses();
  let iteams = [];
  courses.forEach(iteam => {
    const likecount= iteam.likes.filter((item) => item.likes).length
    if(likecount > 4){
      iteams.push(iteam);
    }
    viewCourses(iteams)
 });
};

// GEt  Courses Add Favorite from more the 4
const TopAddToFavoriteCourses = async () => {
  const courses = await getCourses();
  let iteams = [];
  courses.forEach(iteam => {
    const favoritescount= iteam.favorites.filter((item) => item.followStatus).length
    if(favoritescount > 4){
      iteams.push(iteam);
    }
    viewCourses(iteams)
 });
};

// Get Top Rate Course
const TopRateCourse= async () => {
  const courses = await getCourses();
  let iteams = [];
  courses.forEach(iteam => {
    const ratecount= iteam.rate.filter((item) => item.rate).length
    const totalrate= iteam.rate.reduce((acc, item) => acc + item.rate, 0) // ratecount;
    if(totalrate/ratecount > 4){
      iteams.push(iteam);
    }
    viewCourses(iteams)
 });
};


document.getElementById("Last-add").addEventListener("click", LastAddCourses);
document.getElementById("top-fav").addEventListener("click", TopAddToFavoriteCourses);
document.getElementById("top-like").addEventListener("click", TopLikeCourses);
document.getElementById("top-rate").addEventListener("click", TopRateCourse);


