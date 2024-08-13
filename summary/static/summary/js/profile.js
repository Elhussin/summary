
import {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse,
  } from "./api.js";


document.addEventListener('DOMContentLoaded', (event) => {
const coursContainer = document.getElementById("cours-container");

//  add listner event to view our romve form display 
const coressAddBtn=document.getElementById("course-add-btn");
coressAddBtn.addEventListener('click',()=>{
    const coressAdd=document.getElementById("coress-add")
    coressAdd.innerHTML=`
        <h3>New Course</h3>
        <form enctype="multipart/form-data" method="post" id="course_form" >
       
        <div class="form-group">
            <label for="user_id">Title</label>
            <input class="form-control" type="text" name="name" id="name">
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" name="description" id="description" cols="30" rows="10"></textarea>
        </div>
        <div class="mb-3">
            <label for="id_image" class="form-label">Image:</label>
            <input class="form-control" type="file" name="image" id="id_image"  accept="image/*">
        </div>
        <input type="submit" id="send" class="btn btn-primary float-right m-3" value="Add Course"/>
    </form>
    `
    if(coressAdd.style.display=='none'){
        coressAdd.style.display='block'
    }else{
        coressAdd.style.display='none'
    }
})



// featc  courses add by thise user  end view
const fetchCourses = async () => {
  try {
    const courses = await getCourses();
    renderCardsUser(courses)
  } catch (error) {
    console.error("Error:", error);
  }
};

//  add event for courses view button 
const coressViewBtn=document.getElementById("course-view-btn");
coressViewBtn.addEventListener('click',()=>{
    console.log("clike")
    fetchCourses()
})

//  render course dat to view in course view 
const renderCardsUser = (data) => {
    const userId=document.getElementById('user_id').value;
    const  filteredData= data.filter(item => item.user_id == userId);
    console.log("render",userId,filteredData)
    coursContainer.innerHTML += filteredData
      .map(
        (item) => `
          <div class="card" id="${item.id}" >
                    <img src="${item.image}" alt="${item.name}">
                    <div class="card-content">
                        <h2 class="card-title">${item.name}</h2>
                        <p class="card-description">${item.description}</p>
                    </div>
          </div>`
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
    setInterval(function(){messageAlrt.style.display='none'},100*100);
}