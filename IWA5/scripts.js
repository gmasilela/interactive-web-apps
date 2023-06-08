const FREE_WARNING = 'Free shipping only applies to single customer orders';
const BANNED_WARNING = 'Unfortunately, we do not ship to your country of residence';
const NONE_SELECTED = 0;

let location = 'RSA'; // Assuming a default location of South Africa
let currency = 'R'; // Assuming a default currency of South African Rand
let customers = 1; // Assuming a default of 1 customer

let shipping = null;
let totalCost = 0;

const shoes = 300 * 1;
const toys = 100 * 5;
const shirts = 150 * NONE_SELECTED;
const batteries = 35 * 2;
const pens = 5 * NONE_SELECTED;

totalCost = shoes + toys + shirts + batteries + pens;

if (location === 'RSA') {
  shipping = 400;
} else if (location === 'NAM') {
  shipping = 600;
} else {
  shipping = 800;
}

if (location === 'NK') {
  console.log(BANNED_WARNING);
} else {
  if (totalCost >= 1000 && (location === 'RSA' || location === 'NAM') && customers === 1) {
    shipping = 0;
  }
  
  if (shipping === 0 && customers !== 1) {
    console.log(FREE_WARNING);
  }
  
  console.log('Price:', currency, totalCost + shipping);
}
