const FREE_WARNING = 'Free shipping only applies to single customer orders'
const BANNED_WARNING = 'Unfortunately we do not ship to your country of residence'
const NONE_SELECTED = 0

const location = 'RSA'
let shipping = null
let currency = '$'
let customers = 1

if (location === 'RSA') { 
	shipping = 400;
	currency = 'R' 
}

else if (location === NAM) {
shipping = 600}
else {shipping = 800}

const shoes = 300 * 1
const toys = 100 * 5
const shirts = 150 * NONE_SELECTED
const batteries = 35 * 2
const pens = 5 * NONE_SELECTED 

const total = shoes + toys + shirts + batteries + pens

if (total >= 1000 && (location === 'RSA' || location === 'NAM') && customers === 1) {
	shipping = 0
  } 

  else if (shipping === null) {
	console.log(BANNED_WARNING)
  }
  
  if (shipping === 0 && customers !== 1) {
	console.log(FREE_WARNING)
  } 

  else {
	console.log('Price:', currency + total + shipping)
  }
  
  