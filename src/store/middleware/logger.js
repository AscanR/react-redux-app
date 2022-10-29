export function logger(store) {
    return function wrapDispatch(next) {
        return function handleAction(action) {

            return next(action)
        }
    }
}


// console.log(next)
// console.log(action)
// if (action.type === "task/update") {
//     return  dispatch({type: "task/remove", payload: {...action.payload}})
// }