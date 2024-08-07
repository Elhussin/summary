import { getCourses, getCourse, addCourse, updateCourse, deleteCourse } from './api.js';
const cardsContainer = document.getElementById('cards-container');
//featc all course end view
const fetchCourses = async () => {
  try {
    const courses = await getCourses();
    console.log('Courses:', courses);
    renderCards(courses);

  } catch (error) {
    console.error('Error:', error);
  }
};
fetchCourses()
// Add new Course 
const createCourse = async () => {
  const newCourse = {
    title: 'New Course',
    description: 'This is a new course',
    // إضافة بيانات الدورة الأخرى هنا
  };

  try {
    const addedCourse = await addCourse(newCourse);
    console.log('Added Course:', addedCourse);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Updat Course
const modifyCourse = async (id) => {
  const updatedData = {
    title: 'Updated Course Title',
    // إضافة بيانات الدورة المحدثة هنا
  };

  try {
    const updatedCourse = await updateCourse(id, updatedData);
    console.log('Updated Course:', updatedCourse);
  } catch (error) {
    console.error('Error:', error);
  }
};

// delate Course
const removeCourse = async (id) => {
  try {
    await deleteCourse(id);
    console.log(`Course with id ${id} deleted successfully`);
  } catch (error) {
    console.error('Error:', error);
  }
};

// يمكنك استدعاء هذه الدوال حسب الحاجة في تطبيقك
// fetchCourses();
// createCourse();
// modifyCourse(1);  // استبدل 1 بـ ID الدورة التي تريد تحديثها
// removeCourse(1);  // استبدل 1 بـ ID الدورة التي تريد حذفها


const renderCards = (data) => {
    cardsContainer.innerHTML = data.map(item => `
       <a href="api/courses/${item.id}">
        <div class="card">
            <img src="${item.image}" alt="${item.name}">
            <div class="card-content">
                <h2 class="card-title">${item.name}</h2>
                <p class="card-description">${item.description}</p>
            </div>
        </div>
        <a>
    `).join('');
};

