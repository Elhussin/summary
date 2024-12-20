import {
    like, likeActive, unlike, unlikeActive,
    favorite, favoriteActive
} from "./svg_icons.js";
import { getdate, capitalizeFirstLetter } from "./function.js";
import {
    addlike, updateLike, delateLike
    , addFavorite, delateFavorite, likeSummary, updateLikeSummary, delatelikeSummary,
    delateSummaryFavorite, addSummaryFavorite
} from "./api.js";

// view main data for course
const AddCourseDataToHTml = (data) => {
    const newDiv = document.createElement("div");
    newDiv.className = " w-90 m-auto-top10";
    newDiv.className = "card-datiles";
    newDiv.innerHTML = `
        <img src="${data.image}" alt="${data.title}">
    `;
    return newDiv;
};



// view  iteams Datiles
const viewCourseDatiles = (data) => {
    const likesCount = data.likes.filter((item) => item.likes).length;
    const unlikesCount = data.likes.filter((item) => !item.likes).length;
    const newDiv = document.createElement("div");
    newDiv.className = " w-90 m-auto-top10";
    newDiv.innerHTML = `   
        <h1 class="white-space" >Title: ${capitalizeFirstLetter(data.title)}  </h1>
        <p class="white-space"> Description: ${data.description} </p>
        <div class="Cardnavgation">
        <p id="course-id" data-courseid="${data.id}">Course No : ${data.id} </p>
        <p>By <a href="/users" class="user_id"   id="${data.user.id}">${capitalizeFirstLetter(data.user.username)}</a> </p> 
        <p><span> Likes: ${likesCount}   </span> <span>   Unlikes: ${unlikesCount} </span> </p>
        <span> Favorites: ${data.favorites.filter((item) => item.followStatus).length} </span>
        <p> Date: ${getdate(data.created_at)} </p>
        <p> Last Update: ${getdate(data.updated_at)} </p>
        </div>
    `;
    return newDiv
};


// View All Summary 
const viewSummary = (data) => {
    const newDiv = document.createElement("div");
    newDiv.className = "w-90";
    newDiv.innerHTML = `<h2>Summaries</h2>
    <hr>`;
    data.reverse().forEach((iteam) => {
        newDiv.innerHTML += `
        <div id="${iteam.id}" class="summary-box">
        <h3 class="card-title white-space"> ${iteam.title} </h3> 
        <div class="white-space"> ${iteam.description} </div>
        <div class="Cardnavgation">
        <p> Likes: ${iteam.likes.filter((item) => item.likes).length} </p>
        <p> Unlikes: ${iteam.likes.filter((item) => !item.likes).length} </p>
        <p> Favorites: ${iteam.favorites.filter((item) => item.followStatus).length} </p>
        <p>Created At: ${getdate(iteam.created_at)}</p>
         <p>  Last Update: ${getdate(iteam.updated_at)} </p> 
        <p class="card-author" >Add By: ${iteam.user.username.toUpperCase()}  </p>
        </div>
        `;
    });
    return newDiv;
};

// NEW Summary Form 
const AddNewSummary = () => {
    const newDiv = document.createElement("div");
    newDiv.className = "w-90";
    newDiv.innerHTML = `
    <h2 class="m-2"> New Summary</h2>
    <hr>
    <form id="summaryForm">
        <div class="form-group ">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="sumary-title" name="title" required>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="sumary-description" name="description" required></textarea>
        </div>
        <button type="submit" class="btn-bg" id="addSummary" title="Add New Summary" >New Summary</button>
    </form>
    `;
    return newDiv;

};

// Updat Summary 
const updateSummaryForm = (data) => {
    const newDiv = document.createElement("div");
    newDiv.className = "w-90";
    newDiv.innerHTML = `
    <h2 class="m-2"> Update Summary</h2>
    <hr>
    <form id="updateSummary">
        <div class="form-group ">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="sumary-title" name="title" value="${data.title}" required>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="sumary-description" name="description" required>${data.description}</textarea>
        </div>
        <button type="submit" class="btn-bg"  title="Update Summary" >Update Summary</button>
    </form>
    `;
    return newDiv;
};


// View One Summaryh
const viewOneSummary = (data) => {
    const newDiv = document.createElement("div");
    newDiv.className = "w-90";
    newDiv.innerHTML = `
    <h2>Summary : ${capitalizeFirstLetter(data.title)}</h2>
    <hr>
    <div>
    <div class="white-space"> ${data.description} </div>
    <div class="Cardnavgation">
    <p> Likes: ${data.likes.filter((item) => item.likes).length} </p>
    <p> Unlikes: ${data.likes.filter((item) => !item.likes).length} </p>
    <p> Favorites: ${data.favorites.filter((item) => item.followStatus).length} </p>
    <p>Date: ${getdate(data.created_at)}  </p>
    <p> Last Update: ${getdate(data.updated_at)} </p>
    <p> Add By <a href="/users" class="user_id" id="${data.user.id}">  ${capitalizeFirstLetter(data.user.username)}</a>  </p>

    </div>
    <hr>
    `;
    return newDiv;
}

// Like And Favorite Buttuns
const favoriteLikeButtonGroup = (data, userDatiles) => {
    const newDiv = document.createElement("div");
    const userLike = data.likes.find((like) => like.user === userDatiles.id);
    const userFavorite = data.favorites.find((favorite) => favorite.user.id == userDatiles.id);
    // add favorite and like button
    newDiv.innerHTML = `<hr>`;
    // confirm user is follow or not

    if (userFavorite) {
        if (userFavorite.followStatus) {
            newDiv.innerHTML += `
            <button class="btn" id='favorite' type="button" title="Romve From Favorite">${favoriteActive}</button>
            `;
        } else {
            newDiv.innerHTML += `
            <button class="btn" id='favorite' type="button title="Add To Favorite" >${favorite}</button>
            `;
        }
    } else {
        newDiv.innerHTML += `
        <button class="btn" id='favorite' type="button" title="Add To Favorite">${favorite}</button>
        `;
    }

    // confirm user is like or not
    if (userLike) {
        if (userLike.likes) {
            newDiv.innerHTML += `
            <button class="btn" id="like-course" title="Romve Like"  >${likeActive}</button>
            <button class="btn" id="unlike-course" title="UnLike"  >${unlike}</button>
        `;
        } else {
            newDiv.innerHTML += `
            <button class="btn" id="like-course" title="Like"  >${like}</button>
            <button class="btn" id="unlike-course" title="Romve Unlike" >${unlikeActive}</button>`;
        }
    } else {
        newDiv.innerHTML += `
        <button class="btn" id="like-course" title="Like" >${like}</button>
        <button class="btn " id="unlike-course" title="UnLike" >${unlike}</button>
        `;
    }
    newDiv.innerHTML += `<hr>`;

    return newDiv;
}


// Delat And Edite Buttoun
const delateEditButtonGroup = () => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <button class=" btn-bg" id="edit-course" >Edit</button>
    <button class=" btn-bg" id="delate-course" >Delate</button> 
    `;
    return newDiv;
}

// Alert messag To login
const loginMassage = () => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <p class="alert alert-warning"> Please Login to like or favorite and add Comments<a href="/login"> Login </a> </p>
    `;
    return newDiv;
}

//Add  like To like
const confiarmUserLike = (data, userDatiles) => {
    const userLike = data.likes.find((like) => like.user === userDatiles.id);
    var like = true;
    if (userLike) {
        var LikesData = { user: userDatiles.id, likes: like, course: userLike.course };
        if (userLike.likes) {
            delateLike(userLike.id, data.id);
        }
        else {
            updateLike(userLike.id, LikesData);
        }
    } else {
        LikesData = { user: userDatiles.id, likes: like, course: data.id }
        addlike(LikesData);
    }
}

//ADD  Unlike to course
const confiarmUserUnLike = (data, userDatiles) => {
    const userLike = data.likes.find((like) => like.user === userDatiles.id);
    var like = false;
    if (userLike) {
        var LikesData = { user: userDatiles.id, likes: like, course: userLike.course };
        if (userLike.likes) {
            updateLike(userLike.id, LikesData);
        }
        else {
            delateLike(userLike.id, data.id);
        }
    } else {
        LikesData = { user: userDatiles.id, likes: like, course: data.id }
        addlike(LikesData);
    }
}

// Add  Course  To Favorites
const confiarmUserFavorite = (data, userDatiles) => {
    const userFavorite = data.favorites.find((favorite) => favorite.user.id === userDatiles.id);
    var followStatus = true;
    if (userFavorite) {
        var FavoriteData = { user: userDatiles.id, followStatus: followStatus, course: userFavorite.course };

        if (userFavorite.followStatus) {
            delateFavorite(userFavorite.id, data.id);
        }
    } else {

        FavoriteData = { user: userDatiles.id, followStatus: followStatus, course: data.id }
        addFavorite(FavoriteData);

    }

}

// Add Summary Like 
const addSummaryLikes = (data, userDatiles) => {
    const userLike = data.likes.find((like) => like.user === userDatiles.id);
    var like = true;
    if (userLike) {
        var likeSummaryData = { course: data.course, summary: data.id, user: userDatiles.id, likes: like };
        if (userLike.likes) {
            delatelikeSummary(userLike.id, data.id);
        }
        else {
            updateLikeSummary(userLike.id, likeSummaryData);
        }
    } else {
        likeSummaryData = { course: data.course, summary: data.id, user: userDatiles.id, likes: like };
        likeSummary(likeSummaryData);

    }
}

// Add Summary Unlike 
const addSummaryunLikes = (data, userDatiles) => {
    const userLike = data.likes.find((like) => like.user === userDatiles.id);
    var like = false;
    if (userLike) {
        var likeSummaryData = { course: data.course, summary: data.id, user: userDatiles.id, likes: like };
        if (userLike.likes) {
            updateLikeSummary(userLike.id, likeSummaryData, data);
        }
        else {
            delatelikeSummary(userLike.id, data.id);
        }
    } else {
        likeSummaryData = { course: data.course, summary: data.id, user: userDatiles.id, likes: like };
        likeSummary(likeSummaryData, data);
    }
}

// Add Summary To Favorites
const addSummaryFavorites = (data, userDatiles) => {
    console.log("dddd", data);
    const userFavorite = data.favorites.find((favorite) => favorite.user.id === userDatiles.id);
    var followStatus = true;
    if (userFavorite) {
        var FavoriteData = { user: userDatiles.id, followStatus: followStatus, summary: userFavorite.summary };

        if (userFavorite.followStatus) {
            delateSummaryFavorite(userFavorite.id, data.id);
        }
    } else {

        FavoriteData = { user: userDatiles.id, followStatus: followStatus, summary: data.id, course: data.course }
        addSummaryFavorite(FavoriteData);

    }

}

export {
    AddCourseDataToHTml, viewCourseDatiles, viewSummary, viewOneSummary,
    favoriteLikeButtonGroup, delateEditButtonGroup, loginMassage,
    confiarmUserLike, confiarmUserFavorite, confiarmUserUnLike,
    AddNewSummary, addSummaryLikes, addSummaryunLikes, addSummaryFavorites,
    updateSummaryForm
};


