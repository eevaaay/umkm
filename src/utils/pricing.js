export function priceAfterDiscount(product) {
  return Math.round(product.price * (1 - (product.discount || 0) / 100));
}
