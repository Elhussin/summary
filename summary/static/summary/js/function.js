const alertMessage = (message) => {
    const messageAlrt = document.getElementById("message-alrt");
    messageAlrt.style.display = "block";
    messageAlrt.innerHTML = `<p>` + message + `</p>`;
    setInterval(function () {
        messageAlrt.style.display = "none";
    }, 10 * 1000);
};

const displayIteam = (iteamView, IteamOff, diplayType) => {
    if (iteamView.style.display == "none") {
        iteamView.style.display = diplayType;
        IteamOff.style.display = "none";
    } else {
        iteamView.style.display = "none";
    }
};

const viewUploudImage = () => {
    document
        .getElementById("id_image")
        .addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Set image preview source
                    document.getElementById("imagePreview").src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
};

// create Commane Elmeant
const createCommaneElmeant = () => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <h2>Add Comment</h2>
    <hr>
    <label for="comments">Add Comment</label>
    <textarea class="form-control" name="comments" id="comments"  rows="5"></textarea>
    <input type="submit" id="add-comments" class="btn btn-primary float-right m-3" value="Comment"/>
    `;
    return newDiv;
};

// view   Comments
const viewCommants = (data) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<h2>Comments</h2>
    <hr>
    `;
    data.forEach((iteam) => {
        newDiv.innerHTML += `
        <div class="cmment-box">
        <p id="${iteam.user}">Add By ${iteam.user}  </p>
        <p> ${iteam.comment} </p> 
        <p>Created At: ${new Date(iteam.created_at)} </p>
        </div>
        `;  
    });

    return newDiv;
};

const updatpageurl = (data,title,itemId) => {
    console.log("url",data);
    // change page title
    document.title = `${title}`;
    const newUrl = `/${data.name}/summary/${itemId}`;
    history.pushState({ path: newUrl }, "", newUrl);
};

export {
    alertMessage, displayIteam, viewUploudImage, createCommaneElmeant, viewCommants,updatpageurl
};
