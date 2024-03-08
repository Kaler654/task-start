import { productsTable } from "./data.js";


class Product {
    #article;
    #productName;
    #purchasePrice;
    #sellingPrice;
    #salesQuantity;
    #salesProfit;

    constructor(article, productName, purchasePrice, sellingPrice, salesQuantity) {
        this.#article = article;
        this.#productName = productName;
        this.#purchasePrice = Number(purchasePrice);
        this.#sellingPrice = Number(sellingPrice);
        this.#salesQuantity = Number(salesQuantity);
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
        const product = new Product(productObject["article"], productObject["productName"], productObject["purchasePrice"], productObject["sellingPrice"], productObject["salesQuantity"]);
        products.push(product);
    }

    return sortProducts(products);
}

// Сортировка массива товаров по возрастанию артикула
function sortProducts(products) {
    return products.sort((a, b) => a.article - b.article);
}

function getButtons(product) {
    // Создаем кнопки добавления и отмены продажи, вешаем на них слушатели события по клику
    const tdButtonAdd = document.createElement("td");
    tdButtonAdd.classList.add("table__cell");

    const btnAdd = document.createElement("button");
    btnAdd.textContent = "+";
    btnAdd.classList.add("table__button", "button_add");
    btnAdd.addEventListener("click", function() {
        // Добавялем продажу и заново рендерим таблицу
        product.salesQuantity += 1;
        product.salesProfit = product.calculateProfit();
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
        product.salesProfit = product.calculateProfit();
        renderTable();
    });

    tdButtonDel.appendChild(btnDel);

    return [tdButtonAdd, tdButtonDel];
}

function renderRow(product) {
    // Получаем таблицу и создаем строку для её дальнейшего заполнения
    const tableBody = document.querySelector(".table__body");
    const tr = document.createElement("tr");
    tr.classList.add("table__row");

    const productProps = product.getProductData();

    // Проходимся по всем свойствам товара и формируем строку таблицы
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
    // Удаляем все текущие строки таблицы
    const tableBody = document.querySelector(".table__body");
    tableBody.innerHTML = "";

    // Проходимся по каждому товару и добавялем его в таблицу
    products.forEach(product => {
        renderRow(product);
    });
}

function initApp() {
    renderTable();
}

function app() {
    initApp();
}


const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);


    data["article"] = data["article"] ? data["article"] : products.at(-1).article + 1;
    data["salesQuantity"] = data["salesQuantity"] ? Number(data["salesQuantity"]) : 0;

    const newProduct = new Product(...Object.values(data));
    products.push(newProduct);
    form.reset();
    renderTable();

});

app();