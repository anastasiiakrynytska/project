let radioBase1 = document.querySelector("#base1");
let imgBase1 = document.querySelector(".base1");
let radioBase2 = document.querySelector("#base2");
let imgBase2 = document.querySelector(".base2");
var customProduct = {
    id: 777,
    img: null,
    ingredients: null,
    price: 50,
    name: 'Вершкова основа, Капкейк без глазурі'
}

radioBase1.addEventListener("click", function () {
    imgBase2.classList.remove("visible");
    imgBase1.classList.add("visible");
});

radioBase2.addEventListener("click", function () {
    imgBase1.classList.remove("visible");
    imgBase2.classList.add("visible");
});



let radioGlaze1 = document.querySelector("#glaze1");
// let allGlaze = document.querySelectorAll(".glaze");
let radioGlaze2 = document.querySelector("#glaze2");
let imgGlaze2 = document.querySelector(".glaze2");
let radioGlaze3 = document.querySelector("#glaze3");
let imgGlaze3 = document.querySelector(".glaze3");
let radioGlaze4 = document.querySelector("#glaze4");
let imgGlaze4 = document.querySelector(".glaze4");
let radioGlaze5 = document.querySelector("#glaze5");
let imgGlaze5 = document.querySelector(".glaze5");
let radioGlaze6 = document.querySelector("#glaze6");
let imgGlaze6 = document.querySelector(".glaze6");


radioGlaze1.addEventListener("click", function () {
    imgGlaze2.classList.remove("visible");
    imgGlaze3.classList.remove("visible");
    imgGlaze4.classList.remove("visible");
    imgGlaze5.classList.remove("visible");
    imgGlaze6.classList.remove("visible");
});

radioGlaze2.addEventListener("click", function () {
    imgGlaze3.classList.remove("visible");
    imgGlaze4.classList.remove("visible");
    imgGlaze5.classList.remove("visible");
    imgGlaze6.classList.remove("visible");
    imgGlaze2.classList.add("visible");
    var parts = customProduct.name.split(', ');
    parts[1] = 'Вершкова глазур з вишнею';
    customProduct.name = parts.join(', ');
});

radioGlaze3.addEventListener("click", function () {
    imgGlaze2.classList.remove("visible");
    imgGlaze4.classList.remove("visible");
    imgGlaze5.classList.remove("visible");
    imgGlaze6.classList.remove("visible");
    imgGlaze3.classList.add("visible");
});

radioGlaze4.addEventListener("click", function () {
    imgGlaze2.classList.remove("visible");
    imgGlaze3.classList.remove("visible");
    imgGlaze5.classList.remove("visible");
    imgGlaze6.classList.remove("visible");
    imgGlaze4.classList.add("visible");
});

radioGlaze5.addEventListener("click", function () {
    imgGlaze2.classList.remove("visible");
    imgGlaze3.classList.remove("visible");
    imgGlaze4.classList.remove("visible");
    imgGlaze6.classList.remove("visible");
    imgGlaze5.classList.add("visible");
});

radioGlaze6.addEventListener("click", function () {
    imgGlaze2.classList.remove("visible");
    imgGlaze3.classList.remove("visible");
    imgGlaze4.classList.remove("visible");
    imgGlaze5.classList.remove("visible");
    imgGlaze6.classList.add("visible");
}); 


// var product = {
//     id: 777,
//     name: 'atat1 atat2',
//     price: 50,
//     img: null,
// }

// cart.add(product);
