import ADD_TO_CART from '../actions/cart'
import Cart_Item from '../../models/cart-item'

const initialState = {

    items: {},
    totalAmount: 0

}

export default (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const title = action.product.title
            const price = action.product.price
            const description = action.product.description
            let newOrupdatedCartItem
            if (state.items[action.product.id]) {
                //already have one
                
                newOrupdatedCartItem = new Cart_Item(
                    state.items[action.product.id].quantity + 1,
                    price,
                    title,
                    description,
                    state.items[action.product.id].sum + price
                )
            }
            else {
                newOrupdatedCartItem = new Cart_Item(1, price, title, description, price)

            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.product.id]: newOrupdatedCartItem
                },
                totalAmount: state.totalAmount + price
            }
        case "DELETE_FROM_CART":
            const selectedItem = state.items[action.productid]
            const currQty = selectedItem.quantity
            let updateItems
            if (currQty > 1) {

                const item = new Cart_Item(
                    selectedItem.quantity - 1,
                    selectedItem.productPrice,
                    selectedItem.productTitle,
                    selectedItem.productDescription,
                    selectedItem.sum - selectedItem.productPrice

                )
               
                updateItems = {
                    ...state.items,
                    [action.productid]: item
                }
            } else {
                updateItems = { ...state.items }
                delete updateItems[action.productid]
            }
            return {
                ...state,
                items: updateItems,
                totalAmount: state.totalAmount - selectedItem.productPrice
            }
        case 'ADD_ORDER':
            return initialState
        case 'DELETE_PRODUCT':
            if(!state.items[action.pid]){
                return state
            }   
            let updatedItems = {...state.items}
            const deletSum = state.items[action.pid].sum
            delete updatedItems[action.pid]
            return{
                ...state,
                items:updatedItems,
                totalAmount:state.totalAmount - deletSum
            }
    }
    return state
}