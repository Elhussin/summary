// static/js/login.js
import {login} from "./api.js";
import {alertMessage} from "./function.js";
// التعامل مع تسجيل الدخول وإرسال البيانات إلى نقطة النهاية JWT
document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // جلب بيانات الإدخال من النموذج
    const username = document.getElementById('usename').value;
    const password = document.getElementById('password').value;
    try {
        login(username, password);
        // عرض رسالة نجاح وتوجيه المستخدم
        // document.getElementById('message-alrt').innerText = 'Login successful!';
        // console.log('Logged in successfully:', response.data);
        alertMessage('Login successful!');

        // يمكنك إعادة توجيه المستخدم إلى صفحة أخرى هنا

    } catch (error) {
        // console.error('Login failed:', error.response ? error.response.data : error.message);
        // document.getElementById('message-alrt').innerText = 'Login failed. Please check your credentials.';
        alertMessage('Login failed. Please check your credentials.');
    }
});
