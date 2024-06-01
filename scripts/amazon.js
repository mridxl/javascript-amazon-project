import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

// displaying products:
let productContainerHtml = '';

products.forEach((product) => {
	const html = `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${
									product.rating.stars * 10
								}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected="" value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-${product.id}-added">
                <img src="images/icons/checkmark.png">
                Added
            </div>
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
							product.id
						}">
                Add to Cart
            </button>
            </div>
    `;
	productContainerHtml += html;
});
//updates cart quantity everytime amazon.html is loaded
updateCartQuantity();

document.querySelector('.products-grid').innerHTML = productContainerHtml;

function updateCartQuantity() {
	// updates cart quantity:
	let cartQuantity = calculateCartQuantity();
	document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

//add to cart functionality
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
	button.addEventListener('click', () => {
		/* Added data attribute to all buttons and get data using dataset
		-> dataset.productId: kebab-case in data ttribute in html is converted to camelCase in js*/
		const { productId } = button.dataset;
		addToCart(productId);
		updateCartQuantity();
		showItemAdded(productId);
	});
});

const addedTimeoutId = [];
function showItemAdded(productId) {
	const addedItem = document.querySelector(`.js-${productId}-added`);
	addedItem.classList.add('added');

	// Check if a previous timeoutId exists. If it does,
	// we will stop it.
	const prevId = addedTimeoutId[productId];
	if (prevId) {
		clearTimeout(prevId);
	}
	//set new timeout
	const timeoutId = setTimeout(() => {
		addedItem.classList.remove('added');
	}, 2000);

	//save timeoutId
	addedTimeoutId[productId] = timeoutId;
}
