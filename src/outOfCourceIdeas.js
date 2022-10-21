//import  {compose, pipe} from "lodash/fp"
// const arr = ["some", "new", "data"]
// function formatArr (el){return el + " some "}
//arr.map(formatArr)

// const x = 2
// const double = num => num * 2
// const square = num => num * num
// const  half = num => num/2
// console.log(half(square(double(x))))
// const  mathCalculate = compose(half, square, double)
// console.log(mathCalculate(x), "lodash-compose")
// // const divide = num2=> {
// //     return function (num1) {
// //         return num1/num2
// //     }
// // }
// const divide = num2 => num1 => num1/num2
// const mathCalc = pipe(double, square, half, divide(3))
// console.log(mathCalc(x), "lodash-pipe")

