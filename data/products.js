export function loadProductsFetch() {
	const promise = fetch('../backend/products.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			// Parse the JSON data
			const products = data;

			// Log the products to the console
			return (products);
		})
		.catch((error) => {
			console.log('Unexpected error. Please try again later.', error);
		});

	return promise;
}

// Assuming the loadProductsFetch function is defined somewhere in your code

async function fetchAndProcessProducts() {
	try {
		const products = await loadProductsFetch();
		return products;
		
	} catch (error) {
		console.log('An error occurred:', error);
	}
}

export const products = await fetchAndProcessProducts();

export function getProduct(productId) {
	let matchingProduct;

	products.forEach((product) => {
		if (product.id === productId) {
			matchingProduct = product;
		}
	});
	return matchingProduct;
}
