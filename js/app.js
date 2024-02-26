import {productsTable} from "./data.js";


function initApp() {
    let appInit = document.createElement("p");
    appInit.style.display = "none";
    appInit.innerHTML = "Приложение создано и работает";
    document.body.appendChild(appInit);
    console.log(productsTable);
}

function app() {
    initApp();
}

app();