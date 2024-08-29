// view main data for course
const mainCourseData = (data) => {
    const newDiv = document.createElement("div");
    newDiv.className = "card-datiles";
    newDiv.innerHTML = `
        <img src="${data.image}" alt="${data.name}">
        <div class="card-content">
            <h2 class="card-title">${data.name}</h2>
            <p class="card-description">Description:${data.description}</p>
        </div>
    `;
    return newDiv;
};


// view  iteams Datiles
const viewCourseDatiles = (data) => {

    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <h1 id="course-id" data-courseid="${data.id}">
        <h1>Title: ${data.name.toUpperCase()}  </h1>
        <p>Add by  ${data.user.username.toUpperCase()} </p> 
        <p> Created At: ${new Date(data.created_at)} </p>
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
        <p> ${iteam.content} </p>
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
    <p> ${data.content} </p>
    <p>Created At: ${new Date(data.created_at)} </p>
    </div>
    <hr>
    `;
    return newDiv;
}


const addButtonGroup = (data) => {
    const newDiv = document.createElement("div");
    const likesCount = data.summary_likes.filter((item) => item.likes).length;
    const unlikesCount = data.summary_likes.filter((item) => item.unlikes).length;
    `
    <p> Likes: ${likesCount} </p>
    <p> Unlikes: ${unlikesCount} </p>
    <button class="btn" id='favorite' type="button">${favorite}</button>
    <button class="btn" id="like-course" >${like}</button>
    <button class="btn " id="unlike-course" >${unlike}</button>
    <hr>
    <button class="btn btn-primary" id="edit-course" >Edit</button>
    <button class="btn btn-primary" id="delate-course" >Delate</button> 
    `;
    return newDiv;
}

const updatpageurl = (data,title,itemId) => {
          // change page title
          document.title = `${title}`;
          const newUrl = `/${data.name}/summary/${itemId}`;
          history.pushState({ path: newUrl }, "", newUrl);
};