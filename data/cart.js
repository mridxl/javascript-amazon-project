export const cart=[];

export function addToCart(productId) {
	// check if a product is already in cart
	let matchingItem;
	cart.forEach((cartItem) => {
		if (productId === cartItem.productId) matchingItem = cartItem;
	});

	// adding products to cart, making use of the qty selector
	const selectButton = document.querySelector(
		`.js-quantity-selector-${productId}`
	);

	const quantity = Number(selectButton.value);

	if (matchingItem) {
		matchingItem.quantity += quantity;
	} else {
		cart.push({
			productId,
			quantity,
		});
	}
}

