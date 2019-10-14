class CartServcie {
    constructor(storageName = 'ck-cart') {
        this.storageName = storageName;
    }

    readAll() {
        try {
            const data = localStorage.getItem(this.storageName);
            return data ? JSON.parse(data) : {};
        } catch(e) {
            console.error(e);
            return {};
        }
    }

    add(product) {
        const products = this.readAll();
        const data = {...products, [product.id]: product};
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }

    remove(productId) {
        const data = this.readAll();
        productId = productId.toString();
        if(data[productId]) {
            delete data[productId];
            localStorage.setItem(this.storageName, JSON.stringify(data));
        }
    }

    addAll(products) {
        const data = products.reduce((prev, curr) => {
            return {...prev, [curr.id]: curr}
        }, {});
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }

    clear() {
        localStorage.removeItem(this.storageName);
    }
}