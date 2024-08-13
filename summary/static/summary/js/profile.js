
import {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse,
  } from "./api.js";

document.addEventListener('DOMContentLoaded', (event) => {
const cardsContainer = document.getElementById("cards-container");

//  add listner event to view our romve form display 
const coressAddBtn=document.getElementById("course-add-btn");
coressAddBtn.addEventListener('click',()=>{
    const coressAdd=document.getElementById("coress-add")
    if(coressAdd.style.display=='none'){
        coressAdd.style.display='block'
    }else{
        coressAdd.style.display='none'
    }
})
// featc all course end view

const fetchCourses = async () => {
  try {
    const courses = await getCourses();
    return courses
  } catch (error) {
    console.error("Error:", error);
  }
};
fetchCourses(); 

const coressViewBtn=document.getElementById("course-view-btn");
coressViewBtn.addEventListener('click',()=>{
    const userId=document.getElementById('user_id').value;
    const allData=fetchCourses(); 
    renderCards(allData,userId)

})


const renderCards = (data, userId) => {
    // Filter the data based on the userId
    console.log(data)
    const filteredData = data.filter(item => item.userId === userId);

    
    // Render the filtered cards
    cardsContainer.innerHTML += filteredData
      .map(
        (item) => `
          <div class="card" id="${item.id}" >
                    <img src="${item.image}" alt="${item.name}">
                    <div class="card-content">
                        <h2 class="card-title">${item.name}</h2>
                        <p class="card-description">${item.description}</p>
                    </div>
          </div>
      `
      ).join("");
}




//  Add New Course 
document.getElementById('course_form').addEventListener('submit', function(event) {
    // block out Send form
    event.preventDefault(); 
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
        let message= "Course added successfully"
        alert(message)
        document.getElementById('course_form').reset();
        console.log('Course added successfully:', response.data);
    })
    .catch(error => {
        message= "Error adding course:"
        alert(message)
        console.error('Error adding course:', error);
    });
});

})

// declear alert meesage 
function alert(message){
    const messageAlrt=document.getElementById('message-alrt')
    messageAlrt.style.display='block'
    messageAlrt.innerHTML=`<p>`+message+`</p>`
    setInterval(function(){messageAlrt.style.display='none'},10*100);
}