import {
	calculateCartQuantity,
	cart,
	removeFromCart,
	updateCart,
} from '../data/cart.js';
import { products } from '../data/products.js';
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
                Quantity: 
                  <span class="quantity-label quantity-${matchingProduct.id}">
                  ${cartItem.quantity}
                  </span>
                </span>
                <span class="update-quantity-link link-primary" data-product-id="${
									matchingProduct.id
								}">
                  Update
                </span>
                <input class="quantity-input  update-qty-${matchingProduct.id}" 
                data-product-id="${matchingProduct.id}">
                <span class="save-quantity-link link-primary save-${
									matchingProduct.id
								}" data-product-id="${matchingProduct.id}">Save</span>
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
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${
									matchingProduct.id
								}">
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
                <input type="radio" class="delivery-option-input" name="delivery-option-${
									matchingProduct.id
								}">
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
                <input type="radio" class="delivery-option-input" name="delivery-option-${
									matchingProduct.id
								}">
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
	let totalItems = calculateCartQuantity();

	document.querySelector(
		'.js-checkout-item-1'
	).innerHTML = `${totalItems} items`;
	document.querySelector(
		'.js-checkout-item-2'
	).innerHTML = `Items (${totalItems}):`;
}

document.querySelectorAll('.update-quantity-link').forEach((updateLink) => {
	updateLink.addEventListener('click', () => {
		const { productId } = updateLink.dataset;
		const itemContainer = document.querySelector(`.cart-item-${productId}`);
		itemContainer.classList.add('is-editing-quantity');
	});
});

document.querySelectorAll('.quantity-input').forEach((qtyInput) => {
	qtyInput.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			const { productId } = qtyInput.dataset;
			document.querySelector(`.save-${productId}`).click();
		}
	});
});

document.querySelectorAll('.save-quantity-link').forEach((saveLink) => {
	saveLink.addEventListener('click', () => {
		const { productId } = saveLink.dataset;
		const itemContainer = document.querySelector(`.cart-item-${productId}`);

		const newQty = Number(
			document.querySelector(`.update-qty-${productId}`).value
		);

		if (newQty > 0 && newQty <= 1000) {
			updateCart(productId, newQty);
			document.querySelector(`.quantity-${productId}`).innerHTML = `${newQty}`;

			itemContainer.classList.remove('is-editing-quantity');
			checkoutQty();
		} else {
      alert('Quantity must be between 1 and 999');
		}
	});
});
