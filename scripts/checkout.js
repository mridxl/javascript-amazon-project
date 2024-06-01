import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { updateCartQuantity } from './amazon.js';
import { formatCurrency } from './utils/money.js';

let cartContainerHtml = '';
cart.forEach((cartItem) => {
	const { productId } = cartItem;
	let matchingProduct;

	products.forEach((product) => {
		if (product.id === productId) {
			matchingProduct = product;
		}
	});

	cartContainerHtml += `
    <div class="cart-item-container cart-item-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${
										cartItem.quantity
									}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary" data-product-id="${
									matchingProduct.id
								}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked="" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
});

document.querySelector('.order-summary').innerHTML = cartContainerHtml;
checkoutQty();

document.querySelectorAll('.delete-quantity-link').forEach((deleteLink) => {
	deleteLink.addEventListener('click', () => {
		const { productId } = deleteLink.dataset;
		removeFromCart(productId);
		const deleteContainer = document.querySelector(`.cart-item-${productId}`);
		deleteContainer.remove();
    checkoutQty();
	});
});
function checkoutQty() {
  updateCartQuantity();
  
	document.querySelector(
		'.js-checkout-items-1'
	).innerHTML = `${totalItems} items`;
	document.querySelector(
		'.js-checkout-items-2'
	).innerHTML = `Items (${totalItems}):`;
}
