const baseImgEl = document.querySelector('.cupcakeImage img.base');
const glazeImgEl = document.querySelector('.cupcakeImage img.glaze');
const baseTextEl = document.querySelector('.constructorCard .cardBase p');
const glazeTextEl = document.querySelector('.constructorCard .cardGlaze p');
let customId = 1;

const customProduct = {
    id: `custom-${customId}`,
    img: '/images/cakeConstructor.png',
    ingredients: null,
    price: 50,
    name: 'Вершкова основа, Капкейк без глазурі',
    alt: 'Створений капкейк'
}

function parse(el) {
    const img = el.getAttribute('data-img');
    const text = el.getAttribute('data-text');
    return { img, text };
}

function getName() {
    const base = baseTextEl.textContent;
    const glaze = glazeTextEl.textContent;
    return `${base}, ${glaze}`;
}

function setBase(img, text) {
    baseImgEl.src = img;
    baseTextEl.textContent = text;
}

function setGlaze(img, text) {
    if(img) {
        glazeImgEl.src = img;
        glazeImgEl.style.display = 'block';
    }else{
        glazeImgEl.removeAttribute('src');
        glazeImgEl.style.display = 'none';
    }
    glazeTextEl.textContent = text;
}

document.querySelector('.cakeBase').addEventListener('change', (e) => {
    const {img, text} = parse(e.target);
    setBase(img, text);
    customProduct.name = getName();
});

document.querySelector('.cakeGlaze').addEventListener('change', (e) => {
    const {img, text} = parse(e.target);
    setGlaze(img, text);
    customProduct.name = getName();
});

document.querySelector('#buy-custom-cake').addEventListener('click', () => {
    customProduct.id = `custom-${++customId}`;
    cart.add(customProduct);
    cart.show();
});