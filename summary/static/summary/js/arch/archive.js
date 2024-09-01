
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('a').forEach(button => {
    button.onclick = function() {
        const section = this.dataset.section;
        // update page header 
        history.pushState({section: section}, "", `${section}`);
        if(section == 'Courses' ){
           addPost=document.querySelector('courses').style.display='block'
        }
   
    };
    
 
});

// hend sen post 
document.querySelector("#add-courses").addEventListener("submit", (event) => {event.preventDefault(); addCourse();});


});
//

window.onpopstate = function(event) {
  get_post(event.state.section,pagNum);
 
}



 document.addEventListener('DOMContentLoaded', function() {
            fetch('/api/course/')
            .then(response => response.json())
            .then(data => {
                console.log('Items:', data);
                if (Array.isArray(data)) {
                    const courses = document.getElementById('courses');
                    data.forEach(item => {
                        const article = document.createElement('article');
                        article.classList.add('article-card');

                        article.innerHTML = `<a href="api/course/${item.id}"><h3>${item.name}</h3> <p>${item.description}</p></a>`;
                        courses.appendChild(article);
                    });
                } else {
                    console.error('Expected an array but got:', data.results);
                }
            })
            .catch(error => console.error('Error fetching items:', error));


                fetch('/api/summary/')
                .then(response => response.json())
                .then(data => {
                    console.log('Items:', data);
                    if (Array.isArray(data)) {
                        const itemList = document.getElementById('summary');
                        data.forEach(item => {
                            const listItem = document.createElement('li');
                            listItem.textContent = `${item.title}: ${item.content}
                            <p>Created at: ${new Date(data.created_at).toLocaleString()}</p>
                            <p>Updated at: ${new Date(data.updated_at).toLocaleString()}</p>`;
                            itemList.appendChild(listItem);
                        });
                    } else {
                        console.error('Expected an array but got:', data.results);
                    }
                })
                .catch(error => console.error('Error fetching items:', error));
     

            const itemId = 1; // Change this to the ID of the item you want to fetch
            fetch(`/api/summary/${itemId}/`)
                .then(response => response.json())
                .then(data => {
                    const itemDetails = document.getElementById('summary-list');
                    const detailContent = document.createElement('div');
                    detailContent.innerHTML = `
                        <h2>${data.title}</h2>
                        <p>${data.content}</p>
                        <p>Created at: ${new Date(data.created_at).toLocaleString()}</p>
                        <p>Updated at: ${new Date(data.updated_at).toLocaleString()}</p>
                    `;
                    itemDetails.appendChild(detailContent);
                })
                .catch(error => console.error('Error fetching item details:', error));
        });



        

        
    const apiUrl ='/api/course/'


    
    // Function to get courses
    async function getCourses() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log('Courses:', data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

// **********************************************

    // Function to add a new course
    function formDisplay(){
        document.querySelector("#coress-add-box").style.display = 'block';

    }

        // Function to get CSRF token from cookie
    function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        const csrftoken = getCookie('csrftoken');

    async function addCourse() {
        console.log('Adding course');
        const title= document.querySelector("#title").value;
        const description= document.querySelector("#description").value;
        const newCourse = {
            title: title,
            description: description,
            // Add other fields as necessary
        };
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(newCourse),
            });
            const data = await response.json();
            console.log('Course added:', data);
        } catch (error) {
            console.error('Error adding course:', error);
        }
    }

    // Function to update an existing course
    async function updateCourse(courseId) {
        const updatedCourse = {
            title: 'Updated Course Title',
            description: 'Updated description',
            // Add other fields as necessary
        };

        try {
            const response = await fetch(`${apiUrl}${courseId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCourse),
            });
            const data = await response.json();
            console.log('Course updated:', data);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    }

    // Function to delete a course
    async function deleteCourse(courseId) {
        try {
            const response = await fetch(`${apiUrl}${courseId}/`, {
                method: 'DELETE',
            });
            if (response.status === 204) {
                console.log('Course deleted');
            } else {
                console.error('Error deleting course:', response.status);
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    }



    
const savedLink = localStorage.getItem('index_url');

// إذا كان الرابط محفوظًا، قم بتحديث الرابط في شريط العنوان
if (savedLink) {
    window.history.replaceState(null, '', savedLink);
}

document.getElementById('fake-link').addEventListener('click', function (event) {
    // منع السلوك الافتراضي للنقرة
    event.preventDefault();

    // الرابط الحقيقي الذي تريد التوجيه إليه
    const index_url = 'http://127.0.0.1:8000/';

    // استبدال الرابط الوهمي بالرابط الحقيقي
    window.history.pushState(null, '', index_url);

    // حفظ الرابط الحقيقي في Local Storage
    localStorage.setItem('index_url', index_url);

    // تنفيذ أي عملية إضافية، مثل جلب البيانات أو عرض محتوى جديد
    alert('تم استبدال الرابط الوهمي برابط حقيقي دون إعادة تحميل الصفحة!');
});