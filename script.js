let basket = {};

const deliverySwitch = document.querySelector(".basket-switch input");
const basketItems = document.querySelector(".basket-items");
const subtotalText = document.querySelector(".basket-subtotal");
const deliveryText = document.querySelector(".basket-delivery-cost");
const totalText = document.querySelector(".basket-total-value");

function convertPrice(text) {
    let newText = text.replace("€", "").trim();
    newText = newText.replace(/\s/g, "");
    newText = newText.replace(",", ".");
    return Number(newText);
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

function addToBasket(dishEl) {
    if (!dishEl) return;

    const id = dishEl.dataset.id || dishEl.querySelector("h3")?.innerText.trim();
    const name = dishEl.querySelector("h3")?.innerText.trim() || "Unbekannt";
    const priceText = dishEl.querySelector("span:last-of-type")?.innerText || "0";
    const price = convertPrice(priceText);

    if (!basket[id]) {
        basket[id] = { name, price, amount: 1 };
    } else {
        basket[id].amount++;
    }

    showBasket();
}

function changeAmount(id, value) {
    if (!basket[id]) return;

    basket[id].amount += value;

    if (basket[id].amount <= 0) {
        delete basket[id];
    }

    showBasket();
}

function getDeliveryCost() {
    if (Object.keys(basket).length === 0) return 0;
    return deliverySwitch && deliverySwitch.checked ? 5 : 0;
}

// rendewr basket

function showBasket() {
    basketItems.innerHTML = "";

    let subtotal = 0;
    const ids = Object.keys(basket);

    if (ids.length === 0) {
        basketItems.innerHTML = `<div class="basket-empty">Noch leer</div>`;
        updateTotals(0);
        return;
    }

    let html = "";

    ids.forEach((id) => {
        const item = basket[id];
        subtotal += item.price * item.amount;
        html += basketItemTemplate(id, item);
    });

    basketItems.innerHTML = html;
    updateTotals(subtotal);
}


function updateTotals(subtotal) {
    const delivery = getDeliveryCost();
    const total = subtotal + delivery;

    subtotalText.innerText = formatPrice(subtotal);
    deliveryText.innerText = formatPrice(delivery);
    totalText.innerText = formatPrice(total);
}

// Click on the plus sign next to the dishes.

document.addEventListener("click", (event) => {
    const btn = event.target.closest(".orderButton");
    if (!btn) return;

    const dish = btn.closest(".dish-groupe");
    addToBasket(dish);
});

// +/- cart

basketItems.addEventListener("click", (event) => {
    const btn = event.target.closest(".basket-qty-btn");
    if (!btn) return;

    const id = btn.dataset.id;
    const delta = Number(btn.dataset.delta);
    changeAmount(id, delta);
});

// change delivery

if (deliverySwitch) {
    deliverySwitch.addEventListener("change", () => showBasket());
}

// order

document.addEventListener("DOMContentLoaded", () => {
    const orderBtn = document.querySelector(".basket-order-btn");
    const orderModal = document.querySelector("#orderModal");

    if (!orderBtn) console.warn("❌ .basket-order-btn nicht gefunden");
    if (!orderModal) console.warn("❌ #orderModal nicht gefunden");

    function openModal() {
        orderModal.classList.add("is-open");
        orderModal.setAttribute("aria-hidden", "false");
    }

    function closeModal() {
        orderModal.classList.remove("is-open");
        orderModal.setAttribute("aria-hidden", "true");
    }

    orderModal?.addEventListener("click", (e) => {
        if (e.target.dataset.close === "true") closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && orderModal?.classList.contains("is-open")) closeModal();
    });

    orderBtn?.addEventListener("click", () => {
        if (Object.keys(basket).length === 0) {
            alert("Dein Warenkorb ist leer!");
            return;
        }

        basket = {};
        showBasket();

        
        openModal();
    });
});

// Start
renderDishes();
showBasket();