// Строки
const stringArray = ['apple', 'banana', 'cherry']
const result1 = updateArray(stringArray, 'banana') // ['apple', 'banana', 'cherry']
const result2 = updateArray(stringArray, 'date') // ['apple', 'banana', 'cherry', 'date']
 
// Числа
const numberArray = [1, 2, 3]
const result3 = updateArray(numberArray, 2) // [1, 2, 3]
const result4 = updateArray(numberArray, 4) // [1, 2, 3, 4]


function updateArray<T>(array: T[], item: T) {
  if(array.includes(item)) {
    return array
  } else {
    array.push(item)
    return array
  }
}

console.log(result1)
console.log(result2)
