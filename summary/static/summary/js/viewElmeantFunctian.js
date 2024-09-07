import {like , likeActive, unlike, unlikeActive, favorite, favoriteActive}  from "./svg_icons.js";
import {checkAccessToken} from "./function.js";
import {getActiveUsre} from "./api.js";

// view main data for course
const AddCourseDataToHTml = (data) => {
    const newDiv = document.createElement("div");
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
    // const likesCount = data.likes.length;

    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <h1 id="course-id" data-courseid="${data.id}">Course Id : ${data.id} </h1>
        <h1>Title: ${data.title.toUpperCase()}  </h1>
        <p> Description: ${data.description} </p>
        <p>Add by  ${data.user.username.toUpperCase()} </p> 
        <p> Created At: ${new Date(data.created_at)} </p>
        <p> Likes: ${likesCount} </p>
        <p> Unlikes: ${unlikesCount} </p>

   
    `;
    return newDiv
  };


  const viewSummary = (data) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<h2>Summary</h2>
    <hr>`;
    data.summary.forEach((iteam) => {
    newDiv.innerHTML += `
        <div id="${iteam.id}" class="summary-box">
        <p id="${iteam.user}">Add By ${iteam.user.username}  </p>
        <h3 class="card-title"> ${iteam.title} </h3> 
        <p> ${iteam.description} </p>
        <p>Created At: ${new Date(iteam.created_at)} </p>
        `;
    });
    return newDiv;
  };


const viewOneSummary = (data) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <h2>Summary : ${data.title}</h2>
    <hr>
    <div id="${data.id}" class="">
    <p id="${data.user}">Add By ${data.user}  </p>
    <h3 class="card-title"> ${data.title} </h3>
    <p> ${data.description} </p>
    <p>Created At: ${new Date(data.created_at)} </p>
    </div>
    <hr>
    `;
    return newDiv;
}


const favoriteLikeButtonGroup = async (data) => {
    console.log("like un like",data);
    const newDiv = document.createElement("div");

    const token =checkAccessToken()
    if (token){
        const user=await getActiveUsre(token);
        // console.log("user",user);

        // // const likeStatus = data.likes.filter((item) => item.likes && item.user == token).length;
        // newDiv.innerHTML =`
        // <button class="btn" id='favorite' type="button">${favorite}</button>
        // <button class="btn" id="like-course" >${like}</button>
        // <button class="btn " id="unlike-course" >${unlike}</button>
        // <hr>
        // `;
    }
    

    newDiv.innerHTML =`
    <button class="btn" id='favorite' type="button">${favorite}</button>
    <button class="btn" id="like-course" >${like}</button>
    <button class="btn " id="unlike-course" >${unlike}</button>
    <hr>
    `;
    return newDiv;
}

const delateEditButtonGroup = (data) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML =`
    <button class="btn btn-primary" id="edit-course" >Edit</button>
    <button class="btn btn-primary" id="delate-course" >Delate</button> 
    `;
    return newDiv;
}

const loginMassage = () => {   
    const newDiv = document.createElement("div");
    newDiv.innerHTML =`
    <p class="alert alert-warning"> Please Login to like or favorite and add Comments</p>
    `;
    return newDiv;
}


export { AddCourseDataToHTml, viewCourseDatiles, viewSummary, viewOneSummary,
    favoriteLikeButtonGroup,delateEditButtonGroup,loginMassage };