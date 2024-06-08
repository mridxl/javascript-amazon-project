export function loadProductsFetch() {
	const promise = fetch('../backend/products.json')
		.then((response) => {
			// Parse the JSON data
			return response.json();
		})
		.catch((error) => {
			alert('Unexpected error. Please try again later.', error);
		});

	return promise;
}


async function fetchAndProcessProducts() {
	try {
		const products = await loadProductsFetch();
		return products;
		
	} catch (error) {
		alert('An error occurred:', error);
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
