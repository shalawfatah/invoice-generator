export const subtotal_calc = (amounts) => {
    const sum = amounts.reduce((total, currentAmount) => Number(total) + Number(currentAmount), 0);
    return sum;
}
export const gst = (amounts) => {
    const sum = amounts.reduce((total, currentAmount) => total + currentAmount, 0);
    const gst = sum * 0.05;
    return gst.toFixed(2);
}
export function calc_amount(data) {
    return data.reduce(
      (result, item) => {
        const itemSubtotal = item.number * item.quantity;
        const itemTotal = itemSubtotal * (item.tax ? 1.05 : 1);
        const itemTaxAmount = item.tax ? itemSubtotal * 0.05 : 0;
  
        result.subtotal += itemSubtotal;
        result.total += itemTotal;
        result.taxAmount += itemTaxAmount;
  
        return result;
      },
      { subtotal: 0, total: 0, taxAmount: 0 }
    );
  }
