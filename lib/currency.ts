export const money = (n: number, currency = 'GHS') =>
  new Intl.NumberFormat('en-GH', { style: 'currency', currency }).format(n)