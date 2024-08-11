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

const favorite=`<svg width="40px" height="40px" viewBox="0 0 20.00 20.00" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(10,10), scale(0)"><rect x="0" y="0" width="20.00" height="20.00" rx="10" fill="#7ed0ec" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.08"></g><g id="SVGRepo_iconCarrier"> <g id="layer1"> <path d="M 4.7402344 2.0039062 L 4.21875 2.0605469 L 3.7070312 2.1699219 L 3.2070312 2.3300781 L 2.7304688 2.5429688 L 2.2773438 2.8066406 L 1.8554688 3.1132812 L 1.4667969 3.4628906 L 1.1132812 3.8515625 L 0.80664062 4.2753906 L 0.546875 4.7285156 L 0.33398438 5.2070312 L 0.16992188 5.7050781 L 0.0625 6.2167969 L 0.0078125 6.7363281 L 0.0078125 7.2617188 L 0.0625 7.7832031 L 0.16992188 8.2929688 L 0.33398438 8.7910156 L 0.546875 9.2695312 L 0.80664062 9.7207031 L 1.1132812 10.146484 L 1.4667969 10.535156 L 9.9980469 19.070312 L 18.533203 10.535156 L 18.882812 10.146484 L 19.193359 9.7207031 L 19.453125 9.2695312 L 19.666016 8.7910156 L 19.830078 8.2929688 L 19.9375 7.7832031 L 19.992188 7.2617188 L 19.992188 6.7363281 L 19.9375 6.2167969 L 19.830078 5.7050781 L 19.666016 5.2070312 L 19.453125 4.7285156 L 19.193359 4.2753906 L 18.882812 3.8515625 L 18.533203 3.4628906 L 18.144531 3.1132812 L 17.722656 2.8066406 L 17.267578 2.5429688 L 16.789062 2.3300781 L 16.292969 2.1699219 L 15.78125 2.0605469 L 15.259766 2.0039062 L 14.738281 2.0039062 L 14.21875 2.0605469 L 13.705078 2.1699219 L 13.207031 2.3300781 L 12.728516 2.5429688 L 12.277344 2.8066406 L 11.853516 3.1132812 L 11.464844 3.4628906 L 9.9980469 4.9296875 L 8.5351562 3.4628906 L 8.1464844 3.1132812 L 7.7226562 2.8066406 L 7.2695312 2.5429688 L 6.7910156 2.3300781 L 6.2949219 2.1699219 L 5.78125 2.0605469 L 5.2617188 2.0039062 L 4.7402344 2.0039062 z M 4.7578125 3.0058594 L 5.2402344 3.0058594 L 5.7226562 3.0644531 L 6.1894531 3.1796875 L 6.640625 3.3535156 L 7.0703125 3.5761719 L 7.4667969 3.8496094 L 7.828125 4.1699219 L 9.9980469 6.3417969 L 12.171875 4.1699219 L 12.533203 3.8496094 L 12.929688 3.5761719 L 13.359375 3.3535156 L 13.810547 3.1796875 L 14.277344 3.0644531 L 14.759766 3.0058594 L 15.240234 3.0058594 L 15.720703 3.0644531 L 16.1875 3.1796875 L 16.640625 3.3535156 L 17.068359 3.5761719 L 17.464844 3.8496094 L 17.828125 4.1699219 L 18.148438 4.5332031 L 18.421875 4.9296875 L 18.646484 5.3574219 L 18.818359 5.8085938 L 18.933594 6.2773438 L 18.990234 6.7578125 L 18.990234 7.2402344 L 18.933594 7.71875 L 18.818359 8.1894531 L 18.646484 8.6425781 L 18.421875 9.0703125 L 18.148438 9.4667969 L 17.828125 9.8261719 L 9.9980469 17.65625 L 2.171875 9.8261719 L 1.8515625 9.4667969 L 1.5761719 9.0703125 L 1.3535156 8.6425781 L 1.1816406 8.1894531 L 1.0664062 7.71875 L 1.0097656 7.2402344 L 1.0097656 6.7578125 L 1.0664062 6.2773438 L 1.1816406 5.8085938 L 1.3535156 5.3574219 L 1.5761719 4.9296875 L 1.8515625 4.5332031 L 2.171875 4.1699219 L 2.5332031 3.8496094 L 2.9316406 3.5761719 L 3.3574219 3.3535156 L 3.8085938 3.1796875 L 4.2792969 3.0644531 L 4.7578125 3.0058594 z " style="fill:#222222; fill-opacity:1;  stroke-width:0.0002;"></path> </g> </g></svg>`
const renderCards = (data) => {
    cardsContainer.innerHTML='' 
    cardsContainer.innerHTML += data.map(item => `
        <div class="card" id="${item.id}" >
            <a class="nav-link btn" href="/">         
            
                  <img src="${item.image}" alt="${item.name}">
                  <div class="card-content">
                      <h2 class="card-title">${item.name}</h2>
                      <p class="card-description">${item.description}</p>
                  </div>

   
            </a>
            <button id="card-view " class="btn btn-light">View</button>
            <button id="card-favorit" class=" btn btn-inf card-button">${favorite}</button>


        </div>


    `).join('');


    
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', (event) => {
          event.preventDefault(); // block aout link redireact 
          const itemId = card.id;
          console.log(itemId)

          // // العثور على العنصر المقابل للبطاقة
          // const item = data.find(i => i.id == itemId);
          // if (item) {
          //     // هنا يمكنك عرض جميع البيانات المرتبطة بالعنصر
          //     displayItemDetails(item);
          // }
      });
    });
};




const fetchOneCourse = async (id) => {
  try {
    const course = await getCourse(id);
    console.log('1:', course);
    renderoneCard(course)
  } catch (error) {
    console.error('Error:', error);
  }
};
// fetchOneCourse()

const renderoneCard= (data) => {
  console.log("data",data)
  // تفريغ محتوى الحاوية قبل إضافة البطاقات الجديدة
  cardsContainer.innerHTML = ''; 

  // إضافة البطاقات الجديدة إلى الحاوية
  cardsContainer.innerHTML += data.map(item => `
      <div class="card" id="${item.id}">
          <a class="nav-link btn" href="#">         
              <img src="${item.image}" alt="${item.name}">
              <div class="card-content">
                  <h2 class="card-title">${item.name}</h2>
                  <p class="card-description">${item.description}</p>
              </div>
          </a>
      </div>
  `).join('');

  // إضافة مستمعات الأحداث لكل بطاقة
  document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', (event) => {
          event.preventDefault(); // منع الانتقال الافتراضي للرابط
          const itemId = card.id;
          // العثور على العنصر المقابل للبطاقة
          const item = data.find(i => i.id == itemId);
          if (item) {
              // هنا يمكنك عرض جميع البيانات المرتبطة بالعنصر
              displayItemDetails(item);
          }
      });
  });
};

// // دالة لعرض البيانات المرتبطة بالعنصر
const displayItemDetails = (item) => {
  // هنا يمكنك إضافة الكود لعرض التفاصيل
  // مثلاً: فتح نافذة جديدة، أو عرض التفاصيل في نافذة منبثقة (modal)
  console.log('Displaying details for:', item);
  // مثال على عرض البيانات في نافذة منبثقة (modal)
  alert(`Name: ${item.name}\nDescription: ${item.description}`);
};

// fetchOneCourse(1)