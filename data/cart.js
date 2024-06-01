export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
	cart = [
		{
			productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
			quantity: 2,
		},
		{
			productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
			quantity: 1,
		},
	];
}
function savetoStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

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

	savetoStorage();
}
export function removeFromCart(productId) {
	const newCart = [];
	cart.forEach((cartItem) => {
		if (cartItem.productId !== productId) newCart.push(cartItem);
	});
	cart = newCart;
	savetoStorage();
}
export function calculateCartQuantity() {
	// calculates cart quantity:
	let cartQuantity = 0;
	cart.forEach((cartItem) => {
		cartQuantity += cartItem.quantity;
	});
	return cartQuantity;
}