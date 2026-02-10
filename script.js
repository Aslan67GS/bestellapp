function convertPrice(text) {
    let newText = text.replace("€", "").trim();
    newText = newText.replace(/\s/g, "");
    newText = newText.replace(",", ".");
}

function formatPrice(number) {
    return number.toFixed(2).replace(".", ",") + "€";
}

const mainListEl = document.querySelector("#main-list");
const drinksListEl = document.querySelector("#drinks-list");
const dessertListEl = document.querySelector("#dessert-list");

function renderDishes() {
    if (!Array.isArray(DISHES)) return;

    if (mainListEl) mainListEl.innerHTML = "";
    if (drinksListEl) drinksListEl.innerHTML = "";
    if (dessertListEl) dessertListEl.innerHTML = "";

    DISHES.forEach(dish => {
        if (dish.category === "main" && mainListEl) {
            mainListEl.innerHTML += dishTemplate(dish);
        }
        else if (dish.category === "drink" && drinksListEl) {
            drinksListEl.innerHTML += dishTemplate(dish);
        }
        else if (dish.category === "dessert" && dessertListEl) {
            dessertListEl.innerHTML += dishTemplate(dish);
        }
    });
}

renderDishes();


