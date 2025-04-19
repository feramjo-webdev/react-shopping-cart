export const getTotals = (products) => {
  let totalAmount = 0;
  let cartTotal = 0;
  for (let { price, amount } of products.values()) {
    totalAmount += amount;
    cartTotal += price * amount;
  }
  return { totalAmount, cartTotal };
};
