import { productsTable } from "./data.js";


class Product {
    #article;
    #productName;
    #purchasePrice;
    #sellingPrice;
    #salesQuantity;
    #salesProfit;

    constructor(article, productName, purchasePrice, sellingPrice, salesQuantity, salesProfit) {
        this.#article = article;
        this.#productName = productName;
        this.#purchasePrice = purchasePrice;
        this.#sellingPrice = sellingPrice;
        this.#salesQuantity = salesQuantity;
        this.#salesProfit = salesProfit;
    }

    set article(value) {
        this.#article = value;
    }

    set productName(value) {
        this.#productName = value;
    }

    set purchasePrice(value) {
        this.#purchasePrice = value;
    }

    set sellingPrice(value) {
        this.#sellingPrice = value;
    }

    set salesQuantity(value) {
        this.#salesQuantity = value;
    }

    set salesProfit(value) {
        this.#salesProfit = value;
    }

    get article() {
        return this.#article;
    }

    get productName() {
        return this.#productName;
    }

    get purchasePrice() {
        return this.#purchasePrice;
    }

    get sellingPrice() {
        return this.#sellingPrice;
    }

    get salesQuantity() {
        return this.#salesQuantity;
    }

    get salesProfit() {
        return this.#salesProfit;
    }
}

// Преобразование массива объектов товара в массив экземпляров класса Product
function createProducts(productsArray) {
    const products = [];

    for (const productObject of productsArray) {
        const product = new Product(productObject["article"], productObject["productName"], productObject["purchasePrice"], productObject["sellingPrice"], productObject["salesQuantity"], productObject["salesProfit"]);
        products.push(product);
    }

    return products;
}

// Сортировка массива товаров по возрастанию артикула
function sortProducts(products) {
    return products.sort((a, b) => a.article - b.article);
}

function initApp() {
    let appInit = document.createElement("p");
    appInit.style.display = "none";
    appInit.innerHTML = "Приложение создано и работает";
    document.body.appendChild(appInit);
    let products = createProducts(productsTable);


}

function app() {
    initApp();
}

app();