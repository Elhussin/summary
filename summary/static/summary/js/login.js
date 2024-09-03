// static/js/login.js
import {login} from "./api.js";
import {alertMessage} from "./function.js";

// lesen for login  form submission
document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log('login form submitted');
    const username = document.getElementById('usename').value;
    const password = document.getElementById('password').value;
    try {
        login(username, password);
        alertMessage('Login successful!');
    } catch (error) {
        alertMessage('Login failed. Please check your credentials.');
    }
});
