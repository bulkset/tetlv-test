let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function removeItemFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  updateCart();
  renderCartItems();
}

// Mahsulot miqdorini o'zgartirish funksiyasi
function updateItemQuantity(id, newQuantity) {
  cartItems = cartItems.map((item) => {
    if (item.id === id) {
      return { ...item, quantity: newQuantity };
    }
    return item;
  });
  updateCart();
  renderCartItems();
}

function showEmptyCartMessage() {
  const cartLayout = document.querySelector(".in-cart-page__layout");
  const cartWrap = document.querySelector(".in-cart-page-wrap");

  cartLayout.style.display = "none";

  const emptyMessage = document.createElement("div");
  emptyMessage.className =
    "i-cart-messages-container i-cart-messages-container_empty";
  emptyMessage.innerHTML = `
    <div class="i-alert">
      <div class="i-alert__content">
        <div class="i-alert__icon"></div>
        <div class="i-alert__content-text">
          <span class="i-alert__content-text-highlighted">Grozs ir tukšs</span>
          Tavā pirkumu grozā nav neviena prece
        </div>
      </div>
    </div>
  `;

  cartWrap.appendChild(emptyMessage);
}

function renderCartItems() {
  const contentCard = document.querySelector(".in-cart-page__content-card");
  const cartLayout = document.querySelector(".in-cart-page__layout");
  const cartWrap = document.querySelector(".in-cart-page-wrap");

  contentCard.innerHTML = "";

  if (cartItems.length === 0) {
    showEmptyCartMessage();
    return;
  }

  cartLayout.style.display = "flex";

  let total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  document.querySelectorAll(".total_price").forEach((item) => {
    item.innerHTML = `${total.toFixed(2)} €`;
  });

  cartItems.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.className = "i-cart-product";
    productDiv.setAttribute("data-id", item.id);
    productDiv.setAttribute("data-name", item.name);
    productDiv.setAttribute("data-price", item.price);

    productDiv.innerHTML = `
      <div class="i-cart-product__items">
        <div class="i-cart-item">
          <div class="i-cart-item__picture card__image">
            <a class="i-cart-item__picture-link" href="/veikals/matu-taisnotaji/${item.name
              .toLowerCase()
              .replace(/\s+/g, "-")}.html">
              <img class="i-cart-item__picture-img" src="${item.image}" alt="${
      item.name
    }">
            </a>
          </div>
          <div class="i-cart-item__main">
            <div class="i-cart-item__title">
              <a class="i-cart-item__title-caption" href="/veikals/matu-taisnotaji/${item.name
                .toLowerCase()
                .replace(/\s+/g, "-")}.html">
                ${item.name}
              </a>
                 <div class="i-cart-quantity">
                <div class="i-cart-quantity-selector">
                  <div class="i-cart-quantity-selector__button i-cart-quantity-selector__button_decrease js-decrease-item-quantity">
                    <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.458374 1.79168V0.208344H11.5417V1.79168H0.458374Z" fill="white"></path>
                    </svg>
                  </div>
                  <input class="i-cart-quantity-selector__input js-item-quantity" readonly type="number" value="${
                    item.quantity || 1
                  }" data-id="${item.id}">
                  <div class="i-cart-quantity-selector__button i-cart-quantity-selector__button_increase js-increase-item-quantity">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.20837 11.5417V6.79168H0.458374V5.20834H5.20837V0.458344H6.79171V5.20834H11.5417V6.79168H6.79171V11.5417H5.20837Z" fill="white"></path>
                    </svg>
                  </div>
                </div>
              <div class="i-cart-item__price">
                <div class="i-cart-item-prices">
                  <div class="i-cart-item-price i-cart-item-price_full">
                    <span>${(item.price * (item.quantity || 1)).toFixed(
                      2
                    )} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    contentCard.appendChild(productDiv);
  });

  document
    .querySelectorAll(".js-decrease-item-quantity")
    .forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let quantityInput =
          document.querySelectorAll(".js-item-quantity")[index];
        let newQuantity = parseInt(quantityInput.value) - 1;
        if (newQuantity <= 0) {
          removeItemFromCart(cartItems[index].id);
        } else {
          updateItemQuantity(cartItems[index].id, newQuantity);
        }
      });
    });

  document
    .querySelectorAll(".js-increase-item-quantity")
    .forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let quantityInput =
          document.querySelectorAll(".js-item-quantity")[index];
        let newQuantity = parseInt(quantityInput.value) + 1;
        updateItemQuantity(cartItems[index].id, newQuantity);
      });
    });
}

document.addEventListener("DOMContentLoaded", renderCartItems);
