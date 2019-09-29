/**
 * 
 * @param {string} elementName
 * @param {string} [className] 
 * @param {string} [id] 
 * @param {Array<{name: string, value: string}>} [attributes] Array of key-value pairs. 
 * @param {string} [elementText] 
 */
function createElement(elementName, className, attributes, elementText) {
    var el = document.createElement(elementName.toUpperCase());
    if(className) {
        el.className = className;
    }
    if (attributes && attributes.length) {
        attributes.forEach(function (attr) {
            el.setAttribute(attr.name, attr.value);
        });
    }
    el.textContent = elementText;
    return el;
}

/**
 * 
 * @param {Object} product 
 * @param {string} product.name
 * @param {number} product.price
 * @param {string} product.ingredients
 * @param {number} product.id
 * @param {string} product.img
 * @param {number} product.quantity
 */
function createProduct(product, quantity) {
    var li = createElement(
        'li',
        'product-list__item',
        [{ name: 'data-id', value: product.id }],
    );

    var imgWrap = createElement('a', 'product__image');
    var img = createElement('img', null, [{ name: 'src', value: product.img }, { name: 'alt', value: '' }]);
    imgWrap.appendChild(img);
    li.appendChild(imgWrap);
    
    var productColumn = createElement('div', 'product__column');
    
    var productColumnA = createElement('a');
    var productHeader = createElement('div', 'product__header', null, product.name);
    productColumnA.appendChild(productHeader);
    productColumn.appendChild(productColumnA);

    var productCountList = createElement('div', 'product__count-list');
    var productButtonDecrease = createElement('div', 'product__button-decrease', null, '-');
    var input = createElement(
        'input', 
        null, 
        [{name: 'readonly', value: true}, {name: 'value', value: product.quantity}]
    );
    var productButtonIncrease = createElement('div', 'product__button-increase', null, '+');
    productCountList.appendChild(productButtonDecrease);
    productCountList.appendChild(input);
    productCountList.appendChild(productButtonIncrease);
    productColumn.appendChild(productCountList);
    
    var productButtonRemove = createElement('div', 'product__button-remove', null, '&times;');
    productColumn.appendChild(productButtonRemove);
    
    var productPriceColumn = createElement('div', 'product__price-column');
    var productPrice = createElement('div', 'product__price', null, product.price + ' грн');
    productPriceColumn.appendChild(productPrice);
    productColumn.appendChild(productPriceColumn);

    li.appendChild(productColumn);
    
    return  li;
}

/**
 * 
 * @param {Array} products 
 */
function renderProducts(products, cart) {
    var fragment = document.createDocumentFragment();
    products.forEach(function(product) {
        fragment.appendChild(createProduct(product));
    });
    cart.appendChild(fragment);
}

var products = {
    '1': {
        id: 1,
        name: 'М\'ятний капкейк',
        img: './images/1.jpg',
        ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, м\'ята, сметана, молоко, білий шоколад, харчовий барвник',
        price: 50
    },
    '2': {
        id: 2,
        name: 'ppp капкейк',
        img: './images/2.jpg',
        ingredients: 'борошно',
        price: 50
    }
};


//Cart service

function CartService() {
    this.storageName = 'ck-cart';
}
CartService.prototype.readAll = function() {
    var data = localStorage.getItem(this.storageName);
    if(data) {
        return JSON.parse(data);
    }
    return {};
}
CartService.prototype.add = function(product) {
    var data = this.readAll();
    var id = product.id.toString();
    if(data[id]) {
        ++data[id].quantity;
    }else{
        data[id] = product;
        data[id].quantity = 1;
    }
    localStorage.setItem(this.storageName, JSON.stringify(data));
}
CartService.prototype.decrease = function(productId) {
    var data = this.readAll();
    productId = productId.toString();
    if(data[productId] && data[productId].quantity > 1) {
        --data[productId].quantity;
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }
}
CartService.prototype.remove = function(productId) {
    var data = this.readAll();
    productId = productId.toString();
    if(data[productId]) {
        delete data[productId];
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }
}


function Cart(selector) {
    this.cart = document.querySelector(selector);
    this.storage = new CartService();
    this.products = Object.values(this.storage.readAll());
    this.render();
}

Cart.prototype.add = function(product) {
    this.storage.add(product);
    this.products = Object.values(this.storage.readAll());
    this.render();
}

Cart.prototype.remove = function(productId) {
    this.storage.remove(productId);
    this.products = Object.values(this.storage.readAll());
    this.render();
}

Cart.prototype.render = function() {
    this.cart.innerHTML = '';
    renderProducts(this.products, this.cart);   
}

var cart = new Cart('.product-list');

var g = document.querySelector('#cakesGallery');
if(g) {
    g.addEventListener('click', function(e) {
        var t = e.target;
        if(t.classList.contains('btnBuy')) {
            var product = products[t.getAttribute('data-pid')];
            cart.add(product);
        }
    }); 
}



let openPopup = document.querySelector("#openPopup");
let popupWindow = document.querySelector(".popup");
let closePopup = document.querySelector(".popup-close");

openPopup.addEventListener("click", toVisible);

function toVisible() {
    popupWindow.classList.add("visible");
}

closePopup.addEventListener("click", function () {
    popupWindow.classList.remove("visible");
})
