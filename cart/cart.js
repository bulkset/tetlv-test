let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function removeItemFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  updateCart();
  renderCartItems();
}

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
                <div class="i-cart-item-prices i-cart-item-prices_has-discount">
 
                ${
                  item.oldPrice
                    ? `<div class="i-cart-item-price i-cart-item-price_discount">
                <span class="i-striked-text" style="color:#e94536">${(item?.oldPrice).toFixed(
                  2
                )} €</span>
              </div> `
                    : ""
                } 
 
                <div class="i-cart-item-price i-cart-item-price_full ">
                  <span style="color:#000">${(
                    item.price * (item.quantity || 1)
                  ).toFixed(2)} €</span>
                </div>
                </div>
                </div> 
            </div>
            </div> 
            </div>
            <div class="i-cart-item i-cart-item_gift"><div class="i-cart-item-gift"><span class="i-cart-item-gift__icon"><svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.6666 10.3333v1.3333h10.6667v-1.3333H1.6667Zm0-7.3333h1.4667a.9375.9375 0 0 1-.1087-.3167A2.3892 2.3892 0 0 1 3 2.3333c0-.5555.1944-1.0278.5833-1.4167C3.9722.5278 4.4444.3333 5 .3333c.3333 0 .6415.086.9246.258.2836.1725.531.3865.742.642L7 1.6666l.3333-.4333c.2-.2667.4445-.4833.7333-.65.289-.1667.6-.25.9334-.25.5555 0 1.0278.1945 1.4166.5833.3889.389.5834.8612.5834 1.4167 0 .1222-.0085.2389-.0254.35a.9247.9247 0 0 1-.108.3167h1.4667c.3667 0 .6807.1307.942.392.2609.2609.3913.5747.3913.9413v7.3333c0 .3667-.1304.6807-.3913.942-.2613.2609-.5753.3914-.942.3914H1.6667c-.3667 0-.6805-.1305-.9414-.3914-.2613-.2613-.392-.5753-.392-.942V4.3333c0-.3667.1307-.6804.392-.9413C.9862 3.1307 1.3 3 1.6667 3Zm0 5.3333h10.6667v-4h-3.4l1.4 1.9L9.2667 7 7 3.9333 4.7333 7l-1.0666-.7667 1.3666-1.9H1.6667v4ZM5 3c.1889 0 .3473-.0638.4753-.1913.1276-.128.1913-.2865.1913-.4754s-.0637-.3473-.1913-.4753c-.128-.1276-.2864-.1914-.4753-.1914-.189 0-.3471.0638-.4747.1914-.128.128-.192.2864-.192.4753s.064.3474.192.4754C4.653 2.9362 4.8111 3 5 3Zm4 0c.1889 0 .3473-.0638.4753-.1913.1276-.128.1913-.2865.1913-.4754s-.0637-.3473-.1913-.4753c-.128-.1276-.2864-.1914-.4753-.1914-.189 0-.3471.0638-.4747.1914-.128.128-.192.2864-.192.4753s.064.3474.192.4754C8.653 2.9362 8.8111 3 9 3Z" fill="#0A0B0D"></path></svg></span><div class="i-cart-item-gift__content"><span class="i-cart-item-gift__content-name">
                Iekļautā dāvana - 
                Tet TV+ mēnesi bez maksas!

                            </span><span class="i-cart-item-gift__content-btn" data-remodal-target="cart-gift-info-modal-1-gift-90">
                        Vairāk par dāvanu
                    </span></div></div></div>
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
