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

  } catch (error) {
    console.error('Error:', error);
  }
};
// fetchOneCourse()

// const renderCards = (data) => {
//   // تفريغ محتوى الحاوية قبل إضافة البطاقات الجديدة
//   cardsContainer.innerHTML = ''; 

//   // إضافة البطاقات الجديدة إلى الحاوية
//   cardsContainer.innerHTML += data.map(item => `
//       <div class="card" id="${item.id}">
//           <a class="nav-link btn" href="#">         
//               <img src="${item.image}" alt="${item.name}">
//               <div class="card-content">
//                   <h2 class="card-title">${item.name}</h2>
//                   <p class="card-description">${item.description}</p>
//               </div>
//           </a>
//       </div>
//   `).join('');

//   // إضافة مستمعات الأحداث لكل بطاقة
//   document.querySelectorAll('.card').forEach(card => {
//       card.addEventListener('click', (event) => {
//           event.preventDefault(); // منع الانتقال الافتراضي للرابط
//           const itemId = card.id;
//           // العثور على العنصر المقابل للبطاقة
//           const item = data.find(i => i.id == itemId);
//           if (item) {
//               // هنا يمكنك عرض جميع البيانات المرتبطة بالعنصر
//               displayItemDetails(item);
//           }
//       });
//   });
// };

// // دالة لعرض البيانات المرتبطة بالعنصر
// const displayItemDetails = (item) => {
//   // هنا يمكنك إضافة الكود لعرض التفاصيل
//   // مثلاً: فتح نافذة جديدة، أو عرض التفاصيل في نافذة منبثقة (modal)
//   console.log('Displaying details for:', item);
//   // مثال على عرض البيانات في نافذة منبثقة (modal)
//   alert(`Name: ${item.name}\nDescription: ${item.description}`);
// };

// fetchOneCourse(1)