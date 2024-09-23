window.addEventListener("load", function (e) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  function updateTotal() {
    let total = cartItems.reduce((sum, item) => sum + item.price, 0);

    document.querySelectorAll(".js-cart-total-full").forEach((item) => {
      item.innerHTML = `${total}`;
    });
  }

  document.querySelectorAll(".add_to_cart").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (!button.classList.contains("i-add-to-cart-button_added")) {
        const productElement = this.closest(".product-add-to-cart");
        let priceCredit = productElement.querySelector(
          ".js-product-payment-option.is-active"
        );
        let spanFinded = priceCredit.querySelector(
          ".i-product-payment-option__header-price"
        );

        let spanOne = spanFinded.querySelector("span");
        const product = {
          id: productElement.getAttribute("data-id"),
          name: productElement.getAttribute("data-name"),
          image: productElement
            .querySelector(".i-product-page__gallery-image")
            .getAttribute("src"),
        };
        let span = spanOne?.querySelector("span");

        if (span) {
          product.price = parseFloat(span.innerHTML);
        } else {
          product.price = parseFloat(spanOne.innerHTML);
        }

        cartItems.push(product);
        localStorage.setItem("cart", JSON.stringify(cartItems));

        updateTotal();

        setTimeout(() => {
          button.classList.add("i-add-to-cart-button_added");
          button.disabled = true;
        }, 500);
      } else {
        button.disabled = true;
      }
    });
  });

  document.addEventListener("DOMContentLoaded", updateTotal);
});
