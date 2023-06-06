let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#cart-close');

// Open cart
cartIcon.onclick = () => {
    cart.classList.add('cart-active');
};

// Close cart
closeCart.onclick = () => {
    cart.classList.remove('cart-active');
};

// Cart working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Functionality
function ready() {
    // Remove items from the cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Add to cart
    var addCartButtons = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener('click', addCartClicked);
    }

    // Button functionality
    var orderButton = document.querySelector('#order-button');
    orderButton.addEventListener('click', placeOrder);
}

// Remove items from the cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    var cartItemNames = document.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('You have already added this item to the cart.');
            return;
        }
    }

    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartItem = document.createElement('div');
    cartItem.classList.add('cart-box');

    var cartItemHTML = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
    `;

    cartItem.innerHTML = cartItemHTML;
    cartContent.appendChild(cartItem);

    // Add event listener to the new cart item remove button
    var removeButton = cartItem.getElementsByClassName('cart-remove')[0];
    removeButton.addEventListener('click', removeCartItem);
}

// Update total
function updateTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-content')[0];
    var cartItems = cartItemContainer.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var priceElement = cartItem.getElementsByClassName('cart-price')[0];
        var quantityElement = cartItem.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    document.getElementsByClassName('total-price')[0].innerText = '$' + total.toFixed(2);
}

function placeOrder() {
    var total = document.getElementsByClassName('total-price')[0].innerText;
    alert(`Congratulations! Your order has been placed. Total: ${total}`);
}
