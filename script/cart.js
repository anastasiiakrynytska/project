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
    if (className) {
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
 * @param {string} product.alt
 */
function createProduct(product, quantity) {
    var li = createElement(
        'li',
        'product-list__item',
        [{ name: 'data-id', value: product.id }],
    );

    var imgWrap = createElement('a', 'product__image');
    var img = createElement('img', null, [{ name: 'src', value: product.img }, { name: 'alt', value: product.alt }]);
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
        [{ name: 'readonly', value: true }, { name: 'value', value: product.quantity }]
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

    return li;
}

/**
 * 
 * @param {Array} products 
 */
function renderProducts(products, cart) {
    var fragment = document.createDocumentFragment();
    products.forEach(function (product) {
        fragment.appendChild(createProduct(product));
    });
    cart.appendChild(fragment);
}

function parseProduct(dataProduct) {
    var product = {};
    product.id = dataProduct.getAttribute('data-pid');
    product.name = dataProduct.getAttribute('data-name');
    product.price = dataProduct.getAttribute('data-price');
    product.ingredients = dataProduct.getAttribute('data-ingredients');
    product.img = dataProduct.getAttribute('data-img');
    product.alt = dataProduct.getAttribute('data-alt');
    return product;
}

//Cart service

function CartService() {
    this.storageName = 'ck-cart';
}
CartService.prototype.readAll = function () {
    var data = localStorage.getItem(this.storageName);
    if (data) {
        return JSON.parse(data);
    }
    return {};
}
CartService.prototype.add = function (product) {
    var data = this.readAll();
    var id = product.id.toString();
    if (data[id]) {
        ++data[id].quantity;
    } else {
        data[id] = product;
        data[id].quantity = 1;
    }
    localStorage.setItem(this.storageName, JSON.stringify(data));
}

CartService.prototype.increase = function (productId) {
    var data = this.readAll();
    productId = productId.toString();
    if (data[productId]) {
        ++data[productId].quantity;
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }
}

CartService.prototype.decrease = function (productId) {
    var data = this.readAll();
    productId = productId.toString();
    if (data[productId] && data[productId].quantity > 1) {
        --data[productId].quantity;
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }
}
CartService.prototype.remove = function (productId) {
    var data = this.readAll();
    productId = productId.toString();
    if (data[productId]) {
        delete data[productId];
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }
}

CartService.prototype.clear = function () {
    localStorage.removeItem(this.storageName);
}


function Cart(productsSelector, totalsSelector, orderBtnSelector) {
    this.cart = document.querySelector(productsSelector);
    this.total = document.querySelector(totalsSelector);
    this.orderBtn = document.querySelector(orderBtnSelector);
    this.storage = new CartService();
    this.products = Object.values(this.storage.readAll());
    this.listenEvents();
    this.render();
}

Cart.prototype.listenEvents = function () {
    if (this.cart) {
        function incDecListener(e) {
            var t = e.target;
            if (t.classList.contains('product__button-decrease')) {
                var parent = t.parentNode.parentNode.parentNode;
                var productId = parent.getAttribute('data-id');
                this.storage.decrease(productId);
                this.products = Object.values(this.storage.readAll());
                var input = parent.querySelector('input');
                var value = parseInt(input.value);
                if (value > 1) {
                    input.value = --value;
                }
                this.render();
            }

            if (t.classList.contains('product__button-increase')) {
                var parent = t.parentNode.parentNode.parentNode;
                var productId = parent.getAttribute('data-id');
                this.storage.increase(productId);
                this.products = Object.values(this.storage.readAll());
                var input = parent.querySelector('input');
                input.value = ++input.value;
                this.render();

            }

            if (t.classList.contains('product__button-remove')) {
                var parent = t.parentNode.parentNode;
                var productId = parent.getAttribute('data-id');
                cart.remove(productId);
            }
        }
        this.cart.addEventListener('click', incDecListener.bind(this));
    }
}

Cart.prototype.calculateTotals = function () {
    var total = this.products.reduce(function (prev, curr) {
        return prev + curr.price * curr.quantity;
    }, 0);
    this.total.innerHTML = total + ' грн';
}

Cart.prototype.add = function (product) {
    this.storage.add(product);
    this.products = Object.values(this.storage.readAll());
    if (this.products.length !== 0) {
        this.orderBtn.style = "";
    }
    this.render();
}

Cart.prototype.remove = function (productId) {
    this.storage.remove(productId);
    this.products = Object.values(this.storage.readAll());
    if (this.products.length === 0) {
        this.orderBtn.style.backgroundColor = "rgba(202, 96, 116, 0.47)";
    }
    this.render();
}

Cart.prototype.render = function () {
    this.cart.innerHTML = '';
    renderProducts(this.products, this.cart);
    this.calculateTotals();
}

Cart.prototype.show = function () {
    toVisible();
}

Cart.prototype.clear = function () {
    this.products = [];
    this.render();
}

function handleForm() {
    const _form = document.querySelector(".orderForm");
    if (!_form) {
        return false;
    }
    const realForm = _form.querySelector("form");
    const name = document.getElementById("username2");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email2");

    const validateName = (el) => {
        if (el.validity.valueMissing) {
            el.setCustomValidity("Будь ласка, введіть ім'я");
        } else {
            el.setCustomValidity("");
        }
    };
    const validatePhone = (el) => {
        var valid = Inputmask.isValid(el.value, '+380 (99) 999-99-99');
        if (!valid) {
            el.setCustomValidity('Будь ласка, введіть номер телефону');
        } else {
            el.setCustomValidity('');
        }
    };
    const maskPhone = (el) => {
        $(el).inputmask('+380 (99) 999-99-99');
    }
    const validateEmail = (el) => {
        if (el.validity.valueMissing) {
            el.setCustomValidity("Будь ласка, введіть email");
        } else if (el.validity.typeMismatch) {
            el.setCustomValidity("Будь ласка, введіть коректний email");
        } else {
            el.setCustomValidity("");
        }
    };

    validateName(name);
    validatePhone(phone);
    validateEmail(email);
    maskPhone(phone);

    name.addEventListener("input", function (event) {
        validateName(event.target);
    });

    $(phone).on('input', function (e) {
        var el = e.target;
        validatePhone(el);
    });

    email.addEventListener("input", function (event) {
        validateEmail(event.target);
    });

    realForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let thanks = document.querySelector("#order .thankYou");
        thanks.classList.add("visible");
        var cartService = new CartService();
        cartService.clear();
        cart.clear();
        setTimeout(function () {
            popupOrder.classList.remove("visible");
            thanks.classList.remove("visible");
            realForm.reset();
            document.body.classList.remove('popupOpened'); 
        }, 3000);
        return false;
    });
}

function toVisible() {
    if (cart.products.length === 0) {
        orderBtn.style.backgroundColor = "rgba(202, 96, 116, 0.47)";
    }
    document.body.classList.add("popupOpened");
    popupWindow.classList.add("visible");
}


var cart = new Cart('.product-list', '.product-list__result .total span', '#cart .button');

var g = document.querySelector('#cakesGallery');
if (g) {
    g.addEventListener('click', function (e) {
        var t = e.target;
        if (t.classList.contains('btnBuy')) {
            var product = parseProduct(t);
            cart.add(product);
            cart.show();
        }
    });
}

let openPopup = document.querySelector("#openPopup");
let popupWindow = document.querySelector("#cart");
let orderBtn = document.querySelector(".button");
let popupOrder = document.querySelector("#order");
let closeCart = document.querySelector(".link");
let closePopupOrder = document.querySelector("#submitButton2");
let thanks = document.querySelector(".thankYou");

openPopup.addEventListener("click", toVisible);

orderBtn.addEventListener("click", function () {
    if (cart.products.length === 0) {
        return false;
    }
    popupWindow.classList.remove("visible");
    popupOrder.classList.add("visible");
});

document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('popup-close')) {
        var popup = e.target.parentNode.parentNode;
        document.body.classList.remove('popupOpened'); 
        popup.classList.remove('visible');
    }
});

closeCart.addEventListener("click", function () {
    popupWindow.classList.remove("visible");
    document.body.classList.remove('popupOpened'); 
});

handleForm();