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
        const product = {
          id: productElement.getAttribute("data-id"),
          name: productElement.getAttribute("data-name"),
          price: parseFloat(productElement.getAttribute("data-price")),

          image: productElement
            .querySelector(".i-product-page__gallery-image")
            .getAttribute("src"),
        };
  
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
