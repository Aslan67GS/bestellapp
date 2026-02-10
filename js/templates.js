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