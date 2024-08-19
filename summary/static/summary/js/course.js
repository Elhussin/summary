import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  renderCardsUser,
} from "./api.js";
const coursContainer = document.getElementById("cards-container");
//featc all course end view

const fetchCourses = async () => {
  try {
    const courses = await getCourses();
    renderCardsUser(courses,coursContainer)
  } catch (error) {
    console.error("Error:", error);
  }
};

fetchCourses(); 



// Updat Course
const modifyCourse = async (id) => {
  const updatedData = {
    title: "Html 5",
    // إضافة بيانات الدورة المحدثة هنا
  };

  try {
    const updatedCourse = await updateCourse(id, updatedData);
    console.log("Updated Course:", updatedCourse);
  } catch (error) {
    console.error("Error:", error);
  }
};

modifyCourse(1)
// delate Course
const removeCourse = async (id) => {
  try {
    await deleteCourse(id);
    console.log(`Course with id ${id} deleted successfully`);
  } catch (error) {
    console.error("Error:", error);
  }
};
;



// // // // دالة لعرض البيانات المرتبطة بالعنصر
// const displayItemDetails = (item,coursContainer) => {
//   console.log("Displaying details for:", item);
//   cardsContainer.innerHTML=`Name: ${item.name}\nDescription: ${item.description}`;
// };





// const renderCards = (data) => {
//   cardsContainer.innerHTML += data
//     .map(
//       (item) => `
//         <div class="card" id="${item.id}" >
//           <img src="${item.image}" alt="${item.name}">
//           <div class="card-content">
//               <h2 class="card-title">${item.name}</h2>
//               <p class="card-description">${item.description}</p>
//           </div>
//         </div>
//       `
//     ).join("");

//   // إضافة مستمع الحدث لجميع البطاقات بعد إضافتها إلى DOM
//   document.querySelectorAll('.card').forEach(card => {
//     card.addEventListener('click', () => {
//       const itemId = card.id; // احصل على معرف العنصر
//       console.log(itemId)

//       // window.location.href = `/details/${itemId}`; // الانتقال إلى صفحة التفاصيل
//     });
//   });
// };