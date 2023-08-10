export const subtotal_calc = (amounts) => {
    const sum = amounts.reduce((total, currentAmount) => Number(total) + Number(currentAmount), 0);
    return sum;
}
export const gst = (amounts) => {
    const sum = amounts.reduce((total, currentAmount) => total + currentAmount, 0);
    const gst = sum * 0.05;
    return gst.toFixed(2);
}
export const calc_amount = (amounts) => {
    const sum = amounts.reduce((total, currentAmount) => total + currentAmount, 0);
    const gst = sum * 0.05;
    const total_sum = Number(sum) + Number(gst);
    return total_sum.toFixed(2)
}