let shipping = null // initialized as null
let currency = '$' // initialized as USD

const shoes = 300 * 1
const toys = 100 * 5 // missing const keyword and assignment operator =
const shirts = 150 * NONE_SELECTED // changed 'NONE_SELECTED' to NONE_SELECTED constant
const batteries = 35 * 2
const pens = 5 * NONE_SELECTED // changed 'NONE_SELECTED' to NONE_SELECTED constant 

const location = 'RSA' // assigned 'RSA' string to location constant
let customers = 1 // assigned integer 1 to customers variable

// Shipping rates based on location and currency
if (location === 'RSA') {
  shipping = (currency === 'R') ? 400 : 800 // added ternary operator for currency conversion
} else if (location === 'NAM') {
  shipping = 600
} else {
  console.log(BANNED_WARNING) // added warning for other locations
}

// Calculation of total cost
const totalCost = shoes + toys + shirts + batteries + pens + shipping

// Condition for free shipping and discount
if (totalCost > 1000) {
  if (location === 'NAM' && customers < 2) {
    shipping = 0 // free shipping for NAM location and less than 2 customers
  } else if (location === 'RSA') {
    shipping = 0 // free shipping for RSA location
  }
}

// Condition for warning message
if (shipping === 0 && customers !== 1) {
  console.log(FREE_WARNING)
}

// Condition for invalid location
if (location === 'NK') {
  console.log(BANNED_WARNING)
} else {
  console.log('price', currency, totalCost) // print the total cost with currency symbol
}
