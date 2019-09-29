let openPopup = document.querySelector("#openPopup");
let popupWindow = document.querySelector(".popup");
let closePopup = document.querySelector(".popup-close");

openPopup.addEventListener("click", toVisible);

function toVisible() {
    popupWindow.classList.add("visible");
}

closePopup.addEventListener("click", function() {
    popupWindow.classList.remove("visible");
})
