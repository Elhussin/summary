import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  alertMessage,
  displayIteam,
  viewUploudImage,
} from "./api.js";
//   boxes
import { removeCourse, modifyCourse,fetchCourses,fetchOneCourses,updateCourseForm} from "./edit.js";
import {displayItemDetails,viewCourses} from "./displayItem.js";

document.addEventListener("DOMContentLoaded", function () {

  fetchCourses();
});

