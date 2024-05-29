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
                $${(product.priceCents / 100).toFixed(2)}
            </div>

            <div class="product-quantity-container">
                <select>
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

            <div class="added-to-cart">
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

document.querySelector('.products-grid').innerHTML = productContainerHtml;

//add to cart functionality
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
	button.addEventListener('click', () => {
		// added data attribute to all buttons and get data using dataset

        //dataset.productId: kebab-case in data ttribute in html is converted to camelCase in js
		const productId = button.dataset.productId;

		// check if a product is already in cart
		let matchingItem;

		cart.forEach((item) => {
			if (productId === item.productId) matchingItem = item;
		});

		if (matchingItem) {
			matchingItem.quantity++;
		} else {
			cart.push({
				productId: productId,
				quantity: 1,
			});
		}
	});
});
