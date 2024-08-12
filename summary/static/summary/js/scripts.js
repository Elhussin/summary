
document.getElementById('course_form').addEventListener('submit', function(event) {
    event.preventDefault(); // منع الإرسال الافتراضي للنموذج

    // get form detiels
    let formData = new FormData(this);

    // Send data by Axios
    axios.post('/api/courses/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': formData.get('csrfmiddlewaretoken') // إضافة CSRF Token
        }
    })
    .then(response => {
        const message= "Course added successfully"
        alert(message)
        console.log('Course added successfully:', response.data);

    })
    .catch(error => {
        console.error('Error adding course:', error);
    });
});