
import {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse,
  } from "./api.js";

document.addEventListener('DOMContentLoaded', (event) => {
const cardsContainer = document.getElementById("cards-container");

const coressAddBtn=document.getElementById("course-add-btn");

coressAddBtn.addEventListener('click',()=>{
    const coressAdd=document.getElementById("coress-add")
    if(coressAdd.style.display=='none'){
        coressAdd.style.display='block'
    }else{
        coressAdd.style.display='none'
    }
    
    
})
//featc all course end view

// const fetchCourses = async () => {
//   try {
//     const courses = await getCourses();
//     console.log("courses", courses);
//     renderCards(courses);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
// fetchCourses(); 


//  Add New Course 
document.getElementById('course_form').addEventListener('submit', function(event) {
    // block out Send form
    event.preventDefault(); // منع الإرسال الافتراضي للنموذج
    // get form detiels
    let formData = new FormData(this);
    // Send data by Axios
    axios.post('/api/courses/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': formData.get('csrfmiddlewaretoken') // get from form  CSRF Token
        }
    })
    .then(response => {
        const message= "Course added successfully"

        document.getElementById('message-alrt').innerHTML=`<p>`+message+`</p>`
        alert(message)
        console.log('Course added successfully:', response.data);
    })
    .catch(error => {
        console.error('Error adding course:', error);
    });
});

})