import Order from "../../models/order";
export const ADD_ORDER = 'ADD_ORDER'
export const REFRESH_ORDERS = 'REFRESH_ORDERS'


export const addOrder = (cartItems, totalAmount) => {
    const date = new Date()
    return async (dispatch, getState) => {
        try {
            const { userId, token } = getState().auth
            const response = await fetch(`https://dummy-shop-app.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: cartItems,
                    totalAmount: totalAmount,
                    date: date.toISOString()
                })
            })

            if (!response.ok) {
                throw new Error('Order Post Error Occured')
            }
            const resData = await response.json()




            return dispatch({
                type: ADD_ORDER,
                orderData: {
                    items: cartItems,
                    amount: totalAmount,
                    id: resData['name'],
                    date: date
                }
            })
        } catch (err) {
            throw err
        }

    }
}
export const refreshOrders = () => {
    return async (dispatch, getState) => {
        try {
            const {userId} = getState().auth
            const response = await fetch(`https://dummy-shop-app.firebaseio.com/orders/${userId}.json`)
            
            if (!response.ok) {
                throw new Error('Orders Refresh Error Occured')
            }
            
            const res = await response.json()
            const loadedOrders = []

            for (let key in res) {
                loadedOrders.push(new Order(
                    key,
                    res[key].items,
                    res[key].totalAmount,
                    new Date(res[key].date)
                ))
            }

            return dispatch({
                type: REFRESH_ORDERS,
                loadedOrders: loadedOrders
            })
        } catch (err) {
            throw err
        }

    }
}
