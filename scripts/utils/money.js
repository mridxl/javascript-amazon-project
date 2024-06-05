export function formatCurrency(inCents) {
	return (Math.round(inCents) / 100).toFixed(2);
}
