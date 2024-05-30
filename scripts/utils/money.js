export function formatCurrency(inCents) {
	const toDollar = (inCents / 100).toFixed(2);
	return toDollar;
}
