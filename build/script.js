let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function updateTotal() {
  let total = cartItems.reduce((sum, item) => sum + item.price, 0);

  document.querySelectorAll(".js-cart-total-full").forEach((item) => {
    item.innerHTML = `${total}`;
  });
}

document.querySelectorAll(".js-add-to-cart-grid").forEach((button) => {
  button.addEventListener("click", function (e) {
    const productElement = this.closest(".product-add-to-cart");
    const product = {
      id: productElement.getAttribute("data-id"),
      name: productElement.getAttribute("data-name"),
      price: parseFloat(productElement.getAttribute("data-price")),
      image: productElement.querySelector(".i-product-item__image-img").getAttribute("src"), // Mahsulot rasmini olish
    };

    // Mahsulotni savatchaga qo'shish
    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // Umumiy summani yangilash
    updateTotal();

    // added-to-cart sinfini tugmaga qo'shish
 

    // 1 sekunddan keyin btn-loading sinfini olib tashlash
    setTimeout(() => {
    button.classList.add("added-to-cart");
        
    }, 500); // 1 soniya (1000 ms)
  });
});

// Sahifa yuklanganda umumiy summani yangilash
document.addEventListener("DOMContentLoaded", updateTotal);


