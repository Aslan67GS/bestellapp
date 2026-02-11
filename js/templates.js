function dishTemplate(dish) {
    let priceFormatted = dish.price.toFixed(2).replace(".", ",") + "€";

    return `
    <div class="dish-groupe" data-id="${dish.id}">
        <h3>${dish.name}</h3>
        <p>${dish.desc}</p>
        <span class="dishPrice">${priceFormatted}</span>
        <button class="orderButton" type="button" aria-label="${dish.name} in den Warenkorb legen"> 
            <img src="./img/plus.jpg" alt="Plus">
        </button>
    </div>
    `;
}

function basketItemTemplate(id, item) {
    const linePrice = item.price * item.amount; // Gesamtpreis für diese Zeile

    return `
    <div class="basket-item">
        <div class="basket-item-left">
            <div class="basket-item-name">${item.name}</div>
        </div>

        <div class="basket-item-right">
            <button class="basket-qty-btn" data-id="${id}" data-delta="-1">-</button>
            <span class="basket-qty">${item.amount}</span>
            <button class="basket-qty-btn" data-id="${id}" data-delta="1">+</button>
            <div class="basket-line-total">${formatPrice(linePrice)}</div> <!-- nur hier -->
        </div>
    </div>
    `;
}
