// import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/courses/';

// const API_URL = 'http://127.0.0.1:8000/api/summaries/';

// {
//   "summaries": "http://127.0.0.1:8000/api/summaries/",
//   "courses": "http://127.0.0.1:8000/api/courses/"
// }
// Get all Courses
const getCourses = async () => {
  try {
    // const response = await axios.get(`${API_URL}/courses/`);
    const response = await axios.get(API_URL)
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get one course
const getCourse = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with id ${id}:`, error);
    throw error;
  }
};

//Add new course
// const addCourse = async (courseData,headers) => {
//   try {
//     const response = await axios.post(API_URL, courseData,);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding course:', error);
//     throw error;
//   }
// };

const addCourse = async (courseData,csrfToken) => {
  try {
    const response = await axios.post(API_URL, courseData,{
      headers: {
          'X-CSRFToken': csrfToken
      }
  });
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
  coursContainer.innerHTML += data
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

const displayItemDetails = (item,coursContainer) => {
  console.log("Displaying details for:", item);
  
  coursContainer.innerHTML=`
  <div id="${item.id}" >
  <img src="${item.image}" alt="${item.name}">
  <div class="card-content">
      <h2 class="card-title">Course Name: ${item.name}</h2>
      <p class="card-description">Description:${item.description}</p>
  </div>
</div>`
};



export { getCourses, getCourse, addCourse, updateCourse, deleteCourse ,renderCardsUser };
