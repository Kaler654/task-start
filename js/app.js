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
        this.#salesProfit = this.calculateProfit();
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

    calculateProfit() {
        return (this.#sellingPrice - this.#purchasePrice) * this.#salesQuantity;
    }

    getProductData() {
        return {
            article: this.#article,
            productName: this.#productName,
            purchasePrice: this.#purchasePrice,
            sellingPrice: this.#sellingPrice,
            salesQuantity: this.#salesQuantity,
            salesProfit: this.#salesProfit
        };
    }


}

let products = createProducts(productsTable);

// Преобразование массива объектов товара в массив экземпляров класса Product
function createProducts(productsArray) {
    const products = [];

    for (const productObject of productsArray) {
        const product = new Product(productObject["article"], productObject["productName"], productObject["purchasePrice"], productObject["sellingPrice"], productObject["salesQuantity"], productObject["salesProfit"]);
        products.push(product);
    }

    return sortProducts(products);
}

// Сортировка массива товаров по возрастанию артикула
function sortProducts(products) {
    return products.sort((a, b) => a.article - b.article);
}

function getButtons(product) {
    const tdButtonAdd = document.createElement("td");
    tdButtonAdd.classList.add("table__cell");
    const btnAdd = document.createElement("button");
    btnAdd.textContent = "+";
    btnAdd.classList.add("table__button", "button_add");
    btnAdd.addEventListener("click", function() {
        product.salesQuantity += 1;
        console.log(product.salesQuantity);
        renderTable();
    });
    tdButtonAdd.appendChild(btnAdd);

    const tdButtonDel = document.createElement("td");
    tdButtonDel.classList.add("table__cell");
    const btnDel = document.createElement("button");
    btnDel.textContent = "-";
    btnDel.classList.add("table__button", "button_del");
    btnDel.addEventListener("click", function() {
        product.salesQuantity -= 1;
        console.log(product.salesQuantity);
        renderTable();
    });
    tdButtonDel.appendChild(btnDel);

    return [tdButtonAdd, tdButtonDel];
}

function renderRow(product) {
    const tableBody = document.querySelector(".table__body");
    const tr = document.createElement("tr");
    tr.classList.add("table__row");

    const productProps = product.getProductData();
    console.log();
    Object.keys(productProps).forEach(key => {
        const td = document.createElement("td");
        td.textContent = productProps[key];
        td.classList.add("table__cell");
        tr.appendChild(td);
    });

    const [tdButtonAdd, tdButtonDel] = getButtons(product);

    tr.appendChild(tdButtonAdd);
    tr.appendChild(tdButtonDel);

    tableBody.appendChild(tr);


}

function renderTable() {
    const tableBody = document.querySelector(".table__body");
    tableBody.innerHTML = "";

    products.forEach(product => {
        console.log(product.salesQuantity);
        renderRow(product);
    });
    console.log("\n");
}

function initApp() {
    renderTable();
}

function app() {
    initApp();
}

app();