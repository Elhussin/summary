# Summaries Project

## Overview

The **Summaries Project** is a web application built using **Django** and **Django REST Framework** for the backend, and **Axios** and **JWT (JSON Web Tokens)** for handling authentication and API requests on the frontend. The project allows users to interact with courses and summaries by liking, commenting, favoriting, and rating them. The application provides a clean and secure authentication mechanism using JWT for both protected and public API endpoints.

## Project Name: **Summaries**

### Modules Included:

1. **Summary**: Represents the main summary content.
2. **Course**: Holds information about different courses.
3. **Like**: Handles likes from users for various content.
4. **Comments**: Manages comments users leave on  courses.
5. **Favorite**: Allows users to mark specific courses favorite.
6. **SummaryComments**: Handles comments specific to a summary.
7. **SummaryLike**: Manages likes specific to summaries.
8. **SummaryFavorite**: Stores data related to favorite summaries.
9. **RateCourse**: Allows users to rate different courses.
10. **User**: Represents user data and handles authentication, registration, and profiles.

---

## Technology Stack

### Backend:

- **Django**: Web framework used for rapid development and pragmatic design.
- **Django REST Framework (DRF)**: Extension of Django to create REST APIs.
- **JWT (JSON Web Tokens)**: Authentication mechanism for secure token-based user authentication.
- **MySQL**: Used as the relational database management system for storing application data.


### Frontend:

- **JavaScript**: For client-side logic.
- **Axios**: HTTP client used to send requests to the backend and interact with API endpoints.
- **Frontend Styling** The frontend of the Summaries Project   styled by using CSS, SASS, and Bootstrap to create a responsive and visually appealing user interface.



### Authentication:

- **JWT (JSON Web Tokens)**: Used to manage user sessions and API security. The tokens are generated at login and stored in `localStorage`, allowing Axios to include them in headers for authenticated API requests.

---

## Database Configuration (MySQL)

This project uses **MySQL** as its database system. You can configure the database connection settings in the `.env` file.

### Steps to Configure:

1. Install MySQL and create a new database:
```bash
CREATE DATABASE summaries_db;
```

Set up the .env file to store sensitive data like your MySQL credentials. The .env file should be placed in the project root folder and contain the following settings:

```bash
DB_NAME=summaries_db
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
```

Update the settings.py file to read from the .env variables and connect to MySQL:
```bash
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '3306'),
    }
}
```

## Features

1. **User Authentication**:

   - Sign Up and Login using JWT tokens.
   - Tokens are stored locally in `localStorage`.
   - Authenticated routes for creating, liking, commenting, favoriting, and rating content.
2. **Course Management**:

   - Users can view a list of courses.
   - Courses can be rated by users using the `RateCourse` module.
   - Users can like (`Like`), comment (`Comments`), and mark courses as favorites (`Favorite`).
3. **Summaries**:

   - Users can create, edit, and view summaries related to specific courses.
   - Users can like (`SummaryLike`), comment (`SummaryComments`), and mark summaries as favorites (`SummaryFavorite`).
4. **Likes and Favorites**:

   - Users can like or unlike courses, and these likes are stored in `Like`.
   - Users can mark courses as favorites, and this information is stored in `Favorite`.
   - Users can like or unlike summaries, and these likes are stored in `SummaryLike`.
   - Users can mark summaries as favorites, and this information is stored in `SummaryFavorite`.
5. **Comments**:

   - Users can comment on courses and summaries.
   - Comments can be retrieved, created, updated, and deleted.
6. **Rate a Course**:

   - Users can rate a course from 1 to 5 stars, stored in the `RateCourse` module.

---

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Elhussin/summary.git
cd summaries
```

### 2. Setup Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows
```

### 3. Install Requirements

```bash
pip install -r requirements.txt
```


### 4. Apply Migrations

```bash
python manage.py migrate
```

### 5. Create a Superuser

```bash
python manage.py createsuperuser
```

### 6. Run the Development Server

```bash
python manage.py runserver
```

---

## API Endpoints

The following are some of the important API endpoints used in the application. They are accessible using Axios for frontend communication.

### Authentication

- **Login**: `/view/token/` (POST)Request body:

  ```json
  {
    "username": "user",
    "password": "pass"
  }
  ```

  Response:

  ```json
  {
    "access": "<JWT_TOKEN>",
    "refresh": "<JWT_REFRESH_TOKEN>"
  }
  ```
- **Token Refresh**: `/view/token/refresh/` (POST)

### Course Management

- **Get Courses**: `/view/courses/` (GET)
- **Create Course**: `/view/courses/` (POST)
- **Rate Course**: `/view/rate/<id>/` (POST)
- **Like Course**: `/view/likes/<id>` (POST)
- **Favorite Course**: `/view/favorites/<id>/` (POST)
- **Comment on Course**: `/view/comments/<id>` (POST)


### Summary Management

- **Get Summaries**: `/view/summaries/` (GET)
- **Create Summary**: `/view/summaries/` (POST)
- **Like Summary**: `/view/summaryLikes/<id>` (POST)
- **Favorite Summary**: `/view/summaryFavorites/<id>/` (POST)
- **Comment on Summary**: `/view/summaryComments/<id>` (POST)

---

## Usage with Axios and JWT

### 1. Storing JWT after Login

Once the user logs in, the `accessToken` and `refreshToken` should be stored in `localStorage`:

```javascript
localStorage.setItem('accessToken', response.data.access);
localStorage.setItem('refreshToken', response.data.refresh);
```

### 2. Sending Authenticated Requests with Axios

For every request that requires authentication, include the `accessToken` in the `Authorization` header:

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
```

### 3. Token Refresh Logic

In case the token expires, you can call the `refreshToken` function to get a new access token:

```javascript
async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await api.post('/api/token/refresh/', {
    refresh: refreshToken
  });
  localStorage.setItem('accessToken', response.data.access);
}
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

---

## Contact

For any questions or feedback, please feel free to reach out to the project owner via email at `hasin3112@gmail.com`.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

