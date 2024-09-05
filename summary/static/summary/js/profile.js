    // Load the user profile data when the page is loaded
    // confirm that the user is logged in using JWT
    document.addEventListener('DOMContentLoaded', () => {
        checkUserLoggedIn();
    });
async function checkUserLoggedIn() {
    const accessToken = localStorage.getItem("accessToken");

    // If there is no access token, redirect to login page
    if (!accessToken) {
      window.location.href = "/login/?next=/profile/";
      return;
    }
    try {
      // Fetch user profile data using the access token
      const response = await api.get("/user-profile/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      window.location.href = "/profile/";
      // Display the user profile data
      displayUserProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile:",error.response ? error.response.data : error.message);
      if (error.response.status === 401) {
        
        // If the token has expired, refresh it or redirect the user to login
        await refreshToken();
        // Retry after refreshing the token
        checkUserLoggedIn(); 
      } else {

        window.location.href = "/login/?next=/profile/";
      }
    }
  }


    // دالة للتحقق من أن المستخدم مسجل الدخول باستخدام JWT
    async function checkUserLoggedIn() {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن الرمز موجودًا
            window.location.href = '/login/?next=/profile/';
            return;
        }

        try {
            // جلب بيانات المستخدم باستخدام JWT
            const response = await axios.get('/api/user-profile/', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            // مسح الرموز وإعادة التوجيه إلى تسجيل الدخول
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login/?next=/profile/';
        }
    }
