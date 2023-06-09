
const data = {
    lists: [
      ['first', [15, 11, 13, 7, 5]],
      ['second', [2, 6, 8, 4, 14, 12, 10]],
      ['third', [9, 3, 1]],
    ],
  };
  
  // Only edit below
  
  const result = [];
  
  const extractBiggest = () => {
    const [_, array] = data.lists.find(([name]) => name === 'first') || [];
    const first = array && array.length > 0 ? array[array.length - 1] : -Infinity;
  
    const [__, array2] = data.lists.find(([name]) => name === 'second') || [];
    const second = array2 && array2.length > 0 ? array2[array2.length - 1] : -Infinity;
  
    const [___, array3] = data.lists.find(([name]) => name === 'third') || [];
    const third = array3 && array3.length > 0 ? array3[array3.length - 1] : -Infinity;
  
    if (first >= second && first >= third) {
      array.pop();
      return first;
    }
  
    if (second >= first && second >= third) {
      array2.pop();
      return second;
    }
  
    if (third >= first && third >= second) {
      array3.pop();
      return third;
    }
  };
  
  // Only edit above
  
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  result.push(extractBiggest());
  
  console.log(result);
  