import {like , likeActive, unlike, unlikeActive,
     favorite, favoriteActive}  from "./svg_icons.js";

import {checkAccessToken ,getdate,ConfiarmActifeUserWithData} from "./function.js";
import {getActiveUsre, addlike,updateLike,delateLike
    ,addFavorite,delateFavorite ,likeSummary,updateLikeSummary,delatelikeSummary,
    delateSummaryFavorite ,addSummaryFavorite
} from "./api.js";

// view main data for course
const AddCourseDataToHTml = (data) => {
    const newDiv = document.createElement("div");
    newDiv.className = " w-90 m-auto-top10";
    newDiv.className = "card-datiles";
    newDiv.innerHTML = `
        <img src="${data.image}" alt="${data.title}">
        <div class="card-content">
        </div>
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
        
        <h1>Title: ${data.title.toUpperCase()}  </h1>
        <p id="course-id" data-courseid="${data.id}">Course No : ${data.id} </p>
        <p> Description: ${data.description} </p>
        <p>Add by  ${data.user.username.toUpperCase()} </p> 
        <p> Created At: ${getdate(data.created_at)} </p>
        <p> Likes: ${likesCount} </p>
        <p> Unlikes: ${unlikesCount} </p>

   
    `;
    return newDiv
  };



  const viewSummary = (data) => {

    const newDiv = document.createElement("div");
    newDiv.className = "w-90";
    newDiv.innerHTML = `<h2>Summary</h2>
    <hr>`;

    data.reverse().forEach((iteam) => {
    newDiv.innerHTML += `
        <div id="${iteam.id}" class="summary-box">
        <p>Add By ${iteam.user.username}  </p>
        <h3 class="card-title"> ${iteam.title} </h3> 
        <p> ${iteam.description} </p>
        <p>Created At: ${ getdate(iteam.created_at)} <pre> Last Update ${ getdate(iteam.updated_at)} <pre> </p> 
        `;
    });
    return newDiv;
  };

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



const viewOneSummary = (data) => {
    const newDiv = document.createElement("div");
    newDiv.className = "w-90";
    newDiv.innerHTML = `
    <h2>Summary : ${data.title}</h2>
    <hr>
    <div>
   
    <p> ${data.description} </p>
    <p>Created At: ${getdate(data.created_at)} <pre>      Add By <a href="index">  ${data.user.username}</a>  </pre> </p>
    </div>
    <hr>
    `;
    return newDiv;
}

// like , likeActive, unlike, unlikeActive, favorite, favoriteActive
const favoriteLikeButtonGroup =  (data,userDatiles) => {
    console.log(data);
    const newDiv = document.createElement("div");
    const userLike = data.likes.find((like) => like.user === userDatiles.id);
    const userFavorite = data.favorites.find((favorite) => favorite.user === userDatiles.id);    
    // add favorite and like button
    newDiv.innerHTML =`<hr>`;   
    // confirm user is follow or not
    if (userFavorite) {
        if (userFavorite.followStatus) {
            newDiv.innerHTML +=`
            <button class="btn" id='favorite' type="button" title="Romve From Favorite">${favoriteActive}</button>
            `;
        } else {
            newDiv.innerHTML +=`
            <button class="btn" id='favorite' type="button title="Add To Favorite" >${favorite}</button>
            `;
        }
    } else {
        newDiv.innerHTML +=`
        <button class="btn" id='favorite' type="button" title="Add To Favorite">${favorite}</button>
        `;
    }
    // confirm user is like or not
    if (userLike) {
        if (userLike.likes) {
        newDiv.innerHTML +=`
            <button class="btn" id="like-course" title="Romve Like"  >${likeActive}</button>
            <button class="btn" id="unlike-course" title="UnLike"  >${unlike}</button>
        `;
        } else {
        newDiv.innerHTML +=`
            <button class="btn" id="like-course" title="Like"  >${like}</button>
            <button class="btn" id="unlike-course" title="Romve Unlike" >${unlikeActive}</button>`;
        }
    } else {
        newDiv.innerHTML +=`
        <button class="btn" id="like-course" title="Like" >${like}</button>
        <button class="btn " id="unlike-course" title="UnLike" >${unlike}</button>
        `;
    }
     newDiv.innerHTML +=`<hr>`;

    return newDiv;
}



const delateEditButtonGroup = (data) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML =`
    <button class=" btn-bg" id="edit-course" >Edit</button>
    <button class=" btn-bg" id="delate-course" >Delate</button> 
    `;
    return newDiv;
}

const loginMassage = () => {   
    const newDiv = document.createElement("div");
    newDiv.innerHTML =`
    <p class="alert alert-warning"> Please Login to like or favorite and add Comments<a href="/login"> Login </a> </p>
    `;
    return newDiv;
}


const confiarmUserLike = (data,userDatiles ) => {
    const userLike = data.likes.find((like) => like.user === userDatiles.id);
    var like=true;
    if (userLike) {
        var LikesData={user:userDatiles.id,likes:like,course:userLike.course};
        if (userLike.likes) {
            delateLike(userLike.id,data.id);
        }
        else {

            updateLike(userLike.id,LikesData);

        }
    } else {

        LikesData= {user:userDatiles.id,likes:like,course:data.id}
        addlike(LikesData);

    }
}

const confiarmUserFavorite = (data,userDatiles ) => {
    const userFavorite = data.favorites.find((favorite) => favorite.user === userDatiles.id);
    var followStatus=true;
    if (userFavorite) {
        var FavoriteData={user:userDatiles.id,followStatus:followStatus,course:userFavorite.course};

        if (userFavorite.followStatus) {
            delateFavorite(userFavorite.id,data.id);
        }
    } else {

        FavoriteData= {user:userDatiles.id,followStatus:followStatus,course:data.id}
        addFavorite(FavoriteData);

    }

}


const confiarmUserUnLike = (data,userDatiles ) => {
    const userLike = data.likes.find((like) => like.user === userDatiles.id);
    var like=false;
    if (userLike) {
        var LikesData={user:userDatiles.id,likes:like,course:userLike.course};
        if (userLike.likes) {
            updateLike(userLike.id,LikesData);
        }
        else {
            delateLike(userLike.id,data.id);
        }
    } else {
        LikesData= {user:userDatiles.id,likes:like,course:data.id}
        addlike(LikesData);
    }
}

const addSummaryLikes = (data,userDatiles ) => {
    const userLike = data.likes.find((like) => like.user === userDatiles.id);
    var like=true;
    if (userLike) {
        var likeSummaryData={course:data.course,summary:data.id,user:userDatiles.id,likes:like};
        if (userLike.likes) {
            delatelikeSummary(userLike.id,data);
        }
        else {

            updateLikeSummary(userLike.id,likeSummaryData,data);

        }
    } else {
        likeSummaryData={course:data.course,summary:data.id,user:userDatiles.id,likes:like};
        likeSummary(likeSummaryData,data);

    }
}


const addSummaryunLikes = (data,userDatiles ) => {
    // updateLikeSummary,delatelikeSummary,favoriteSummary
    console.log("dddd",data);
    const userLike = data.likes.find((like) => like.user === userDatiles.id);
    var like=false;
    if (userLike) {
        var likeSummaryData={course:data.course,summary:data.id,user:userDatiles.id,likes:like};
        if (userLike.likes) {
            updateLikeSummary(userLike.id,likeSummaryData,data);
        }
        else {
            delatelikeSummary(userLike.id,data);
        }
    } else {
        likeSummaryData={course:data.course,summary:data.id,user:userDatiles.id,likes:like};
        likeSummary(likeSummaryData,data);
    }
}

const addSummaryFavorites = (data,userDatiles ) => {
    const userFavorite = data.favorites.find((favorite) => favorite.user === userDatiles.id);
    var followStatus=true;
    if (userFavorite) {
        var FavoriteData={user:userDatiles.id,followStatus:followStatus,summary:userFavorite.summary};

        if (userFavorite.followStatus) {
            delateSummaryFavorite(userFavorite.id,data.id);
        }
    } else {

        FavoriteData= {user:userDatiles.id,followStatus:followStatus,summary:data.id ,course:data.course}
        addSummaryFavorite(FavoriteData);

    }

}

export { AddCourseDataToHTml, viewCourseDatiles, viewSummary, viewOneSummary,
    favoriteLikeButtonGroup, delateEditButtonGroup, loginMassage, confiarmUserLike,confiarmUserFavorite,confiarmUserUnLike,
    AddNewSummary, addSummaryLikes,addSummaryunLikes,addSummaryFavorites,updateSummaryForm    };