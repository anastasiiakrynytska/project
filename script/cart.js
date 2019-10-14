class Cart {
    constructor(selector) {
        this.storage = new CartServcie();
        this.products = Object.values(this.storage.readAll());

        this.popup = document.querySelector(selector);
        this.cart = this.popup.querySelector(".product-list");
        this.total = this.popup.querySelector(
            ".product-list__result .total span"
        );
        this.closeIcon = this.popup.querySelector(".popup-close");
        this.orderButton = this.popup.querySelector(".align-center .button");
        this.continueButton = this.popup.querySelector(".align-center .link");

        this.listenEvents();
        this.render();
    }

    incDecListener(e) {
        const t = e.target;
        const parent = t.parentNode.parentNode.parentNode;
        const productId = parent.getAttribute("data-id");
        const productPrice = parent.getAttribute("data-price");
        const input = parent.querySelector("input");
        const value = parseInt(input.value);
        const productPriceDiv = parent.querySelector(".product__price");

        if (t.classList.contains("product__button-decrease")) {
            if (value > 1) {
                input.value = value - 1;
            }
            this.decrease(productId);
        }

        if (t.classList.contains("product__button-increase")) {
            input.value = +input.value + 1;
            this.increase(productId);
        }
        productPriceDiv.innerHTML = productPrice * input.value;
        this.renderTotals();
    }

    removeListener(e) {
        const t = e.target;
        if (t.classList.contains("product__button-remove")) {
            var parent = t.parentNode.parentNode;
            var productId = parent.getAttribute("data-id");
            cart.remove(productId);
        }
    }

    listenEvents() {
        const listeners = e => {
            this.incDecListener(e);
            this.removeListener(e);
        };

        this.cart.addEventListener("click", listeners);

        this.closeIcon.addEventListener("click", () => {
            this.storage.addAll(this.products);
        });

        this.orderButton.addEventListener("click", () => {
            this.storage.addAll(this.products);
        });

        this.continueButton.addEventListener("click", () => {
            this.storage.addAll(this.products);
        });
    }

    renderTotals() {
        const total = this.products.reduce((prev, curr) => {
            return prev + curr.price * curr.quantity;
        }, 0);
        this.total.innerHTML = `${total} грн`;
    }

    add(product) {
        this.products = [...this.products, product];
        this.render();
    }

    remove(productId) {
        this.products = this.products.filter(p => p.id !== productId);
        this.render();
    }

    increase(productId) {
        this.products = this.products.map(p => {
            if (p.id === productId) {
                return { ...p, quantity: p.quantity + 1 };
            }
            return p;
        });
    }

    decrease(productId) {
        this.products = this.products.map(p => {
            if (p.id === productId && p.quantity > 1) {
                return { ...p, quantity: p.quantity - 1 };
            }
            return p;
        });
    }

    show() {
        this.popup.classList.add('visible');
    }

    clear() {
        this.products = [];
        this.render();
    }

    render() {
        this.cart.innerHTML = "";
        renderProducts(this.products, this.cart);
        this.renderTotals();
    }
}

var cart = new Cart("#cart");





var g = document.querySelector("#cakesGallery");
if (g) {
    g.addEventListener("click", function(e) {
        var t = e.target;
        if (t.classList.contains("btnBuy")) {
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

function toVisible() {
    popupWindow.classList.add("visible");
}

orderBtn.addEventListener("click", function() {
    popupWindow.classList.remove("visible");
    popupOrder.classList.add("visible");
});

document.body.addEventListener("click", function(e) {
    if (e.target.classList.contains("popup-close")) {
        var popup = e.target.parentNode.parentNode;
        popup.classList.remove("visible");
    }
});

closeCart.addEventListener("click", function() {
    popupWindow.classList.remove("visible");
});

function handleForm() {
    const _form = document.querySelector(".orderForm");
    if (!_form) {
        return false;
    }
    const realForm = _form.querySelector("form");
    const name = document.getElementById("username2");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email2");

    const validateName = el => {
        if (el.validity.valueMissing) {
            el.setCustomValidity("Будь ласка, введіть ім'я");
        } else {
            el.setCustomValidity("");
        }
    };
    const validatePhone = el => {
        var valid = Inputmask.isValid(el.value, "+380 (99) 999-99-99");
        if (!valid) {
            el.setCustomValidity("Будь ласка, введіть номер телефону");
        } else {
            el.setCustomValidity("");
        }
    };
    const maskPhone = el => {
        $(el).inputmask("+380 (99) 999-99-99");
    };
    const validateEmail = el => {
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

    name.addEventListener("input", function(event) {
        validateName(event.target);
    });

    $(phone).on("input", function(e) {
        var el = e.target;
        validatePhone(el);
    });

    email.addEventListener("input", function(event) {
        validateEmail(event.target);
    });

    realForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let thanks = document.querySelector("#order .thankYou");
        thanks.classList.add("visible");
        var cartService = new CartService();
        cartService.clear();
        cart.clear();
        setTimeout(function() {
            popupOrder.classList.remove("visible");
            thanks.classList.remove("visible");
            realForm.reset();
        }, 3000);
        return false;
    });
}

handleForm();
