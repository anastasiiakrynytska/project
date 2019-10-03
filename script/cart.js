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
    
    var productButtonRemove = createElement('div', 'product__button-remove', null, '×');
    productColumn.appendChild(productButtonRemove);
    
    var productPriceColumn = createElement('div', 'product__price-column');
    var productPrice = createElement('div', 'product__price', null, product.price * product.quantity + ' грн');
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
        name: 'Святковий капкейк',
        img: './images/2.jpg',
        ingredients: 'борошно, вершкове масло, цукор, розпушувач, яйця, ванілін, молоко, сметана, білий шоколад, молочний шоколад',
        price: 50
    },
    '3': {
        id: 3,
        name: 'Вершковий капкейк',
        img: './images/3.jpg',
        ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, вершки, сметана, молоко, білий шоколад, горіхи',
        price: 50
    },
    '4': {
        id: 4,
        name: 'Полунично-шоколадний капкейк',
        img: './images/4.jpg',
        ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, полуниця, сметана, молоко, білий шоколад, темний шоколад',
        price: 50
    },
    '5': {
        id: 5,
        name: 'Шоколадний капкейк',
        img: './images/5.jpg',
        ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, волоський горіх, сметана, молоко, молочний шоколад, темний шоколад',
        price: 50
    },
    '6': {
        id: 6,
        name: 'Малиновий капкейк',
        img: './images/6.jpg',
        ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, малина, сметана, молоко, білий шоколад, харчовий барвник',
        price: 50
    },
    '7': {
        id: 7,
        name: 'Горіховий капкейк',
        img: './images/7.jpg',
        ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, волоський горіх, сметана, молоко, мигдаль, темний шоколад',
        price: 50
    },
    '8': {
        id: 8,
        name: 'Ожиновий капкейк',
        img: './images/8.jpg',
        ingredients: 'борошно, вершкове масло, цукор, яйця, ванілін, ожина, сметана, молоко, білий шоколад, харчовий барвник',
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

CartService.prototype.increase = function(productId) {
    var data = this.readAll();
    productId = productId.toString();
    if(data[productId]) {
        ++data[productId].quantity;
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }
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


function Cart(productsSelector, totalsSelector) {
    this.cart = document.querySelector(productsSelector);
    this.total = document.querySelector(totalsSelector);
    this.storage = new CartService();
    this.products = Object.values(this.storage.readAll());
    this.listenEvents();
    this.render();
}

Cart.prototype.listenEvents = function() {
    if(this.cart) {
        function incDecListener(e) {
            var t = e.target;
            if(t.classList.contains('product__button-decrease')) {
                var parent = t.parentNode.parentNode.parentNode;
                var productId = parent.getAttribute('data-id');
                this.storage.decrease(productId);
                this.products = Object.values(this.storage.readAll());
                var input = parent.querySelector('input');
                var value = parseInt(input.value);
                if(value > 1) {
                    input.value = --value;
                }
                this.render();
            }

            if(t.classList.contains('product__button-increase')) {
                var parent = t.parentNode.parentNode.parentNode;
                var productId = parent.getAttribute('data-id');
                this.storage.increase(productId);
                this.products = Object.values(this.storage.readAll());
                var input = parent.querySelector('input');
                input.value = ++input.value;
                this.render();

            }

            if(t.classList.contains('product__button-remove')) {
                var parent = t.parentNode.parentNode;
                var productId = parent.getAttribute('data-id');
                cart.remove(productId);
            }
        }
        this.cart.addEventListener('click', incDecListener.bind(this));
    }
}

Cart.prototype.calculateTotals = function() {
    var total = this.products.reduce(function(prev, curr){
        return prev + curr.price * curr.quantity;
    }, 0);
    this.total.innerHTML = total + ' грн';
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
    this.calculateTotals();   
}

Cart.prototype.show = function() {
    toVisible();
}

var cart = new Cart('.product-list', '.product-list__result .total span');

var g = document.querySelector('#cakesGallery');
if(g) {
    g.addEventListener('click', function(e) {
        var t = e.target;
        if(t.classList.contains('btnBuy')) {
            var product = products[t.getAttribute('data-pid')];
            cart.add(product);
            cart.show();
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
