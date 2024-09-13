import {  removeCourse,fetchCourses,fetchOneCourses, updateCourseForm } from "./api_connect.js";
import {    alertMessage, displayIteam, viewUploudImage, createCommaneElmeant, viewCommants,} from "./function.js";
import {getCourses, getCourse, addCourseData, updateCourse, deleteCourse  } from "./api.js";
import { viewCourses } from "./dat_view_html.js";



const coursContainer = document.getElementById("cours-container");
const coressViewBtn = document.getElementById("course-view-btn");
const coressAddBtn = document.getElementById("course-add-btn");

document.addEventListener("DOMContentLoaded", (event) => {
//  fetch all courses from api_connect
  fetchCourses();

});


const LastAddCourses = async () => {
  const courses = await getCourses();
  const lastAddCourses = courses.slice(-3);
  console.log("lastAddCourses",lastAddCourses);
  viewCourses(lastAddCourses)
};




const TopLikeCourses = async () => {
  const courses = await getCourses();
  let iteams = [];
  courses.forEach(iteam => {
    const likecount= iteam.likes.filter((item) => item.likes).length
    if(likecount > 4){
      console.log("iteam",iteam);
      iteams.push(iteam);
    }
    viewCourses(iteams)
 });
};

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

const TopRateCourse= async () => {
  const courses = await getCourses();
  
  let iteams = [];
  courses.forEach(iteam => {
    const ratecount= iteam.rate.filter((item) => item.rate).length
    const totalrate= iteam.rate.reduce((acc, item) => acc + item.rate, 0) // ratecount;
    console.log("rate",totalrate);
    console.log("ratecount",ratecount);
    if(totalrate/ratecount > 4){
      console.log("iteam",iteam);
      iteams.push(iteam);
    }
    viewCourses(iteams)
 });
};


document.getElementById("Last-add").addEventListener("click", LastAddCourses);
document.getElementById("top-fav").addEventListener("click", TopAddToFavoriteCourses);
document.getElementById("top-like").addEventListener("click", TopLikeCourses);
document.getElementById("top-rate").addEventListener("click", TopRateCourse);


