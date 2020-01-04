import React from 'react';
import './AppContainer.css';
import MainScreen from './Containers/MainScreen'

function AppContainer() {
  // function isPalindrome(word) {
  //   if (word.length < 2) return false
  //   const lowerCaseWord = word.toLowerCase()
  //   const forwardArr = lowerCaseWord.split('')
  //   let backwardArr = []
  //   for (let i = word.length - 1; i >= 0; i -= 1) {
  //     backwardArr = [...backwardArr, lowerCaseWord[i]]
  //   }
  //   for (let i = 0; i < word.length; i += 1) {
  //     if (backwardArr[i] !== forwardArr[i]) {
  //       return false
  //     }
  //   }
  //   return true
  // }
  // function fruitPresent(arr, fruitName) {
  //   const lowerCaseFruit = fruitName.toLowerCase()
  //   return arr.filter(fruit => fruit.toLowerCase() === lowerCaseFruit).length > 0;
  // }
  // function costOfProductForQtyGreaterThan(quantity) {
  //   const productCart = [
  //     { productname:'iphone-x',qty:10, price:1000 },
  //     { productname:'macbook pro',qty:200, price:2000}, { productname:'iwatch',qty:100, price:550 },
  //     { productname:'macbook air',qty:100, price:1000}, { productname:'iphone 8',qty:300, price:700 },
  //     { productname:'iphone 7',qty:100, price:550 },
  //     { productname:'ipad Retina',qty:20, price:1000},
  //     { productname:'ipad', qty:10, price:700 },
  //     { productname:'Magic Mouse',qty:50, price:300},
  //     { productname:'Magic Trackpad',qty:75, price:200}
  //   ]
  //   let totalCost = 0
  //   productCart.forEach(product => {
  //     if (product.qty > quantity) {
  //       console.log(product)
  //       totalCost += product.price
  //     }
  //   })
  //   return totalCost
  // }
  function costOfProduct(productName) {
    const productCart = [
      { productname:'iphone-x',qty:10, price:1000 },
      { productname:'macbook pro',qty:200, price:2000}, { productname:'iwatch',qty:100, price:550 },
      { productname:'macbook air',qty:100, price:1000}, { productname:'iphone 8',qty:300, price:700 },
      { productname:'iphone 7',qty:100, price:550 },
      { productname:'ipad Retina',qty:20, price:1000},
      { productname:'ipad', qty:10, price:700 },
      { productname:'Magic Mouse',qty:50, price:300},
      { productname:'Magic Trackpad',qty:75, price:200}
    ]
    const product = productCart.find(product => product.productname === productName)
    if (product) {
      return product.qty * product.price
    }
    return null
  }
  //  const fruits = ['Apple', 'Apricot', 'Avocado', 'banana']

  function compare(key, order = 'asc') {
    return (a, b) => {
      if (order === 'asc') {
        return a[key] - b[key]
      }
      return b[key] - a[key]
    }
  }
  function sort(key, order) {
    return students.sort(compare(key, order))
  }
  let students = [
    { name: 'Andy', score: 48 },
    { name: 'Cathy', score: 72 },
    { name: 'Derek', score: 85 },
    { name: 'Zoya', score: 30 },
    { name: 'Martin', score: 65 }
  ]
  return (
    <div className="App">
      {/* {console.log(fruitPresent(fruits, 'Apple'))} */}
      {/* {console.log(isPalindrome('racecar'))} */}
      {/* {console.log(costOfProductForQtyGreaterThan(199))} */}
      {console.log(costOfProduct('ipa'))}
      {/* {console.log(sort('score', 'ds'))} */}
      <MainScreen />
    </div>
  );
}

export default AppContainer;
