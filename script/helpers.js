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
        attributes.forEach(function(attr) {
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
function createProduct(product) {
    var li = createElement("li", "product-list__item", [
        { name: "data-id", value: product.id },
        { name: "data-price", value: product.price}
    ]);

    var imgWrap = createElement("a", "product__image");
    var img = createElement("img", null, [
        { name: "src", value: product.img },
        { name: "alt", value: "" }
    ]);
    imgWrap.appendChild(img);
    li.appendChild(imgWrap);

    var productColumn = createElement("div", "product__column");

    var productColumnA = createElement("a");
    var productHeader = createElement(
        "div",
        "product__header",
        null,
        product.name
    );
    productColumnA.appendChild(productHeader);
    productColumn.appendChild(productColumnA);

    var productCountList = createElement("div", "product__count-list");
    var productButtonDecrease = createElement(
        "div",
        "product__button-decrease",
        null,
        "-"
    );
    var input = createElement("input", null, [
        { name: "readonly", value: true },
        { name: "value", value: product.quantity }
    ]);
    var productButtonIncrease = createElement(
        "div",
        "product__button-increase",
        null,
        "+"
    );
    productCountList.appendChild(productButtonDecrease);
    productCountList.appendChild(input);
    productCountList.appendChild(productButtonIncrease);
    productColumn.appendChild(productCountList);

    var productButtonRemove = createElement(
        "div",
        "product__button-remove",
        null,
        "×"
    );
    productColumn.appendChild(productButtonRemove);

    var productPriceColumn = createElement("div", "product__price-column");
    var productPrice = createElement(
        "div",
        "product__price",
        null,
        product.price * product.quantity + " грн"
    );
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
    products.forEach(function(product) {
        fragment.appendChild(createProduct(product));
    });
    cart.appendChild(fragment);
}

function parseProduct(dataProduct) {
    var product = {};
    product.id = dataProduct.getAttribute("data-pid");
    product.name = dataProduct.getAttribute("data-name");
    product.price = dataProduct.getAttribute("data-price");
    product.ingredients = dataProduct.getAttribute("data-ingredients");
    product.img = dataProduct.getAttribute("data-img");
    product.quantity = 1;
    return product;
}