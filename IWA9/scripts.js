const salary = 4000;
const lodging = 'apartment';
const size = 'large';

// Only change the syntax below (not the values or key names)

const expenses = {
  food: 51.7501,
  transport: 10.2,
};

const tax = {
  
  913: '12%',
};

const rent = {

  'room-large': 300,
  'apartment-large': 800,

};

// You can change below however you want

const taxAsDecimal = parseFloat(tax['913']) / 100;
const startingAfterTax = salary * (1 - taxAsDecimal);
const type = `${lodging}-${size}`;
const balance = startingAfterTax - expenses.food - expenses.transport - rent[type];
const currency = 'R'
console.log(currency, balance.toFixed(2));
