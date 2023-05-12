const leoName = 'Leo'
const leoSurname = 'Musvaire     '
const leoBalance = '9394'

const sarahName = 'Sarah    '
const sarahSurname = 'Kleinhans'
const sarahBalance = '4582.21000111'

const divider = '----------------------------------'

// Only change below this line
const leoOwed = parseFloat(leoBalance).toFixed(2);
const sarahOwed = parseFloat(sarahBalance).toFixed(2);
const totalOwed = (parseFloat(leoBalance) + parseFloat(sarahBalance)).toFixed(2);

const result =
`
${leoName} ${leoSurname.trim()} (Owed: R ${leoOwed})
${sarahName} ${sarahSurname.trim()} (Owed: R ${sarahOwed})

${divider}
  Total amount owed: R ${totalOwed}
${divider}
`;

console.log(result)