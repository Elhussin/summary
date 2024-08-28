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
    document.getElementById('id_image').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Set image preview source
                document.getElementById('imagePreview').src = e.target.result; 
            };
            reader.readAsDataURL(file);
        }
    });
}

export { alertMessage, displayIteam, viewUploudImage };