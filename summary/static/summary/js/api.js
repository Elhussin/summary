// import axios from 'axios';
const favorite = `<svg width="40px" height="40px" viewBox="0 0 20.00 20.00" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(10,10), scale(0)"><rect x="0" y="0" width="20.00" height="20.00" rx="10" fill="#7ed0ec" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.08"></g><g id="SVGRepo_iconCarrier"> <g id="layer1"> <path d="M 4.7402344 2.0039062 L 4.21875 2.0605469 L 3.7070312 2.1699219 L 3.2070312 2.3300781 L 2.7304688 2.5429688 L 2.2773438 2.8066406 L 1.8554688 3.1132812 L 1.4667969 3.4628906 L 1.1132812 3.8515625 L 0.80664062 4.2753906 L 0.546875 4.7285156 L 0.33398438 5.2070312 L 0.16992188 5.7050781 L 0.0625 6.2167969 L 0.0078125 6.7363281 L 0.0078125 7.2617188 L 0.0625 7.7832031 L 0.16992188 8.2929688 L 0.33398438 8.7910156 L 0.546875 9.2695312 L 0.80664062 9.7207031 L 1.1132812 10.146484 L 1.4667969 10.535156 L 9.9980469 19.070312 L 18.533203 10.535156 L 18.882812 10.146484 L 19.193359 9.7207031 L 19.453125 9.2695312 L 19.666016 8.7910156 L 19.830078 8.2929688 L 19.9375 7.7832031 L 19.992188 7.2617188 L 19.992188 6.7363281 L 19.9375 6.2167969 L 19.830078 5.7050781 L 19.666016 5.2070312 L 19.453125 4.7285156 L 19.193359 4.2753906 L 18.882812 3.8515625 L 18.533203 3.4628906 L 18.144531 3.1132812 L 17.722656 2.8066406 L 17.267578 2.5429688 L 16.789062 2.3300781 L 16.292969 2.1699219 L 15.78125 2.0605469 L 15.259766 2.0039062 L 14.738281 2.0039062 L 14.21875 2.0605469 L 13.705078 2.1699219 L 13.207031 2.3300781 L 12.728516 2.5429688 L 12.277344 2.8066406 L 11.853516 3.1132812 L 11.464844 3.4628906 L 9.9980469 4.9296875 L 8.5351562 3.4628906 L 8.1464844 3.1132812 L 7.7226562 2.8066406 L 7.2695312 2.5429688 L 6.7910156 2.3300781 L 6.2949219 2.1699219 L 5.78125 2.0605469 L 5.2617188 2.0039062 L 4.7402344 2.0039062 z M 4.7578125 3.0058594 L 5.2402344 3.0058594 L 5.7226562 3.0644531 L 6.1894531 3.1796875 L 6.640625 3.3535156 L 7.0703125 3.5761719 L 7.4667969 3.8496094 L 7.828125 4.1699219 L 9.9980469 6.3417969 L 12.171875 4.1699219 L 12.533203 3.8496094 L 12.929688 3.5761719 L 13.359375 3.3535156 L 13.810547 3.1796875 L 14.277344 3.0644531 L 14.759766 3.0058594 L 15.240234 3.0058594 L 15.720703 3.0644531 L 16.1875 3.1796875 L 16.640625 3.3535156 L 17.068359 3.5761719 L 17.464844 3.8496094 L 17.828125 4.1699219 L 18.148438 4.5332031 L 18.421875 4.9296875 L 18.646484 5.3574219 L 18.818359 5.8085938 L 18.933594 6.2773438 L 18.990234 6.7578125 L 18.990234 7.2402344 L 18.933594 7.71875 L 18.818359 8.1894531 L 18.646484 8.6425781 L 18.421875 9.0703125 L 18.148438 9.4667969 L 17.828125 9.8261719 L 9.9980469 17.65625 L 2.171875 9.8261719 L 1.8515625 9.4667969 L 1.5761719 9.0703125 L 1.3535156 8.6425781 L 1.1816406 8.1894531 L 1.0664062 7.71875 L 1.0097656 7.2402344 L 1.0097656 6.7578125 L 1.0664062 6.2773438 L 1.1816406 5.8085938 L 1.3535156 5.3574219 L 1.5761719 4.9296875 L 1.8515625 4.5332031 L 2.171875 4.1699219 L 2.5332031 3.8496094 L 2.9316406 3.5761719 L 3.3574219 3.3535156 L 3.8085938 3.1796875 L 4.2792969 3.0644531 L 4.7578125 3.0058594 z " style="fill:#222222; fill-opacity:1;  stroke-width:0.0002;"></path> </g> </g></svg>`;

const API_URL = 'http://127.0.0.1:8000/api/';
// const Summary_URL = 'http://127.0.0.1:8000/api/courses/';

// Get all Courses
const getCourses = async () => {
  try {
    // const response = await axios.get(`${API_URL}/courses/`);
    const response = await axios.get(`${API_URL}courses/`)
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get one course
const getCourse = async (id) => {
  try {
    const response = await axios.get(`${API_URL}summaries/ ${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error);
    throw error;
  }
};

//Add new course
const addCourse = async (courseData) => {
  try {
    const response = await axios.post(`${API_URL}courses/`, courseData,);
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};



// Edit iteam
const updateCourse = async (id, courseData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, courseData);
    return response.data;
  } catch (error) {
    console.error(`Error updating course with id ${id}:`, error);
    throw error;
  }
};

// Delate iteam
const deleteCourse = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error(`Error deleting course with id ${id}:`, error);
    throw error;
  }
};





const renderCardsUser = (data,coursContainer) => {
console.log("data",data)
  coursContainer.innerHTML += data
    .map(
      (item) => `
        <div class="card" id="${item.id}" >
          <img src="${item.image}" alt="${item.name}">
          <div class="card-content">
              <h2 class="card-title">${item.name}</h2>
              <p class="card-description">${item.description}</p>
              
             <button class="card-button" type="button">${favorite}</button>
          </div>
        </div>
      `
    ).join("");

  // إضافة مستمع الحدث لجميع البطاقات بعد إضافتها إلى DOM
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (event) => {
      event.preventDefault(); // منع الانتقال الافتراضي
      const itemId = card.id; // احصل على معرف العنصر
      console.log(itemId)
      const itemTitle = card.querySelector('.card-title').textContent; // احصل على عنوان العنصر
      document.title = `${itemTitle} - تفاصيل`; // تغيير عنوان الصفحة
      const newUrl = `/details/${itemId}`;
      history.pushState({ path: newUrl }, '', newUrl);
      fetchOneCourses(itemId,coursContainer)
      // getCourse(itemId)
      // الانتقال إلى صفحة التفاصيل
      // window.location.href = `/details/${itemId}`;

      // window.location.href = `/details/${itemId}`; // الانتقال إلى صفحة التفاصيل
    });
  });
};

const fetchOneCourses = async (id,coursContainer) => {
  try {
    const courses = await getCourse(id);
    displayItemDetails(courses,coursContainer);
  } catch (error) {
    console.error("Error:", error) ;
  }
};

const displayItemDetails = (summary,coursContainer) => {
  console.log("Displaying details for:", summary);
  console.table(summary)
  
  coursContainer.innerHTML=`
  <div class='card-datiles' id="${summary.course.id}">
  <img src="${ summary.course.image}" alt="${ summary.course.name}">
  <div class="card-content">
      <h2 class="card-title">Course Name: ${summary.course.name}</h2>
      <p class="card-description">Description:${summary.course.description}</p>
  </div>
  <div>
  <div class="form-group">
    <label for="description">Add Comment</label>
    <textarea class="form-control" name="comments" id="description" cols="20" rows="10"></textarea>
</div>
<input type="submit" id="send" class="btn btn-primary float-right m-3" value="Comment"/>
  <div>
<div>`
summary.summary_comments.forEach(comment => {
coursContainer.innerHTML+=
`
<p>${comment.id}: ${comment.user} :${comment.course} : ${comment.comment} :"Created At:", ${comment.created_at} </p>
`
});
};


export { getCourses, getCourse, addCourse, updateCourse, deleteCourse ,renderCardsUser };

// function viewSummary(summary) {
  
//   console.log("Summary ID:", summary.id);
//   console.log("Title:", summary.title);
//   console.log("Content:", summary.content);
//   console.log("Created At:", summary.created_at);
//   console.log("Updated At:", summary.updated_at);

//   console.log("\nUser Info:");
//   console.log("User ID:", summary.user.id);
//   console.log("Email:", summary.user.email);
//   console.log("Username:", summary.user.username);

//   // console.log("\nCourse Info:");
//   // console.log("Course ID:", summary.course.id);
//   // console.log("Course Name:", summary.course.name);
//   // console.log("Course Description:", summary.course.description);
//   // console.log("Course Image URL:", summary.course.image);

//   console.log("\nComments:");
//   summary.summary_comments.forEach(comment => {
//       console.log("Comment ID:", comment.id);
//       console.log("User ID:", comment.user);
//       console.log("Course ID:", comment.course);
//       console.log("Comment:", comment.comment);
//       console.log("Created At:", comment.created_at);
//   });

//   console.log("\nLikes:", summary.summary_likes.length);
//   console.log("\nFavorites:", summary.summary_favorites.length);
// }

// // Example usage
// const summaryObject = {
//   "id": 1,
//   "title": "elmeanmt",
//   "content": "elmeant : use to creat gedlinewep page",
//   "created_at": "2024-08-08T11:37:02.570228Z",
//   "updated_at": "2024-08-08T11:37:02.570228Z",
//   "user": {
//       "id": 1,
//       "email": "go@mail.com",
//       "username": "husain",
//       "first_name": "",
//       "last_name": ""
//   },
//   "course": {
//       "id": 1,
//       "name": "Html",
//       "description": "لغة ترميز للمتصفحات",
//       "created_at": "2024-08-07T11:48:06.196536Z",
//       "image": "http://127.0.0.1:8000/media/course_images/contacts-1.jpeg",
//       "updated_at": "2024-08-07T21:50:46.553131Z",
//       "user_id": 1
//   },
//   "summary_comments": [
//       {
//           "id": 1,
//           "user": 1,
//           "course": 1,
//           "summary": 1,
//           "comment": "good nice-",
//           "created_at": "2024-08-08T11:37:18.690049Z"
//       }
//   ],
//   "summary_likes": [],
//   "summary_favorites": []
// };

// viewSummary(summaryObject);
