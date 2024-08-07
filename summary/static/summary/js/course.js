import { getCourses, getCourse, addCourse, updateCourse, deleteCourse } from './api-script.js';

// الحصول على جميع الدورات وعرضها في وحدة التحكم
const fetchCourses = async () => {
  try {
    const courses = await getCourses();
    console.log('Courses:', courses);
  } catch (error) {
    console.error('Error:', error);
  }
};

// إضافة دورة جديدة
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

// تحديث دورة
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

// حذف دورة
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
