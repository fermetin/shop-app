
export const ADD_PRODUCT = "ADD_PRODUCT"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const REFRESH_PRODUCTS = "REFRESH_PRODUCTS"
import Product from '../../models/products'


export const refresh_products = () => {
    return async (dispatch, getState) => {
        try {
            const { userId } = getState().auth
            const response = await fetch('https://dummy-shop-app.firebaseio.com/products.json')

            if (!response.ok) {
                throw new Error('Something went wrong on fetch res.ok not ok ')
            }
            const res = await response.json()

            const loadedProducts = []

            for (let key in res) {
                loadedProducts.push(new Product(
                    key,
                    res[key].ownerId,
                    res[key].title,
                    res[key].imageUrl,
                    res[key].description,
                    res[key].price
                ))
            }
            return dispatch({
                type: REFRESH_PRODUCTS,
                allProducts: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId),
            })

        } catch (err) {
            ///send analytıcs sever
            throw err
        }

    }
}


export const add_product = (product) => {
    return async (dispatch, getState) => {
        try {
            const { token } = getState().auth
            const response = await fetch(`https://dummy-shop-app.firebaseio.com/products.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            if (!response.ok) {
                throw new Error(`Product adding went wrong on fetch res.ok not ok `)
            }

            const resData = await response.json()

            product.id = resData['name']
            return dispatch({
                type: ADD_PRODUCT,
                product: product,
            })
        } catch (err) {
            throw err
        }
    }
}
export const delete_product = (product_id) => {
    return async (dispatch, getState) => {
        try {
            const { token } = getState().auth
            const response = await fetch(`https://dummy-shop-app.firebaseio.com/products/${product_id}.json?auth=${token}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error('Something went wrong!!!')
            }
            return dispatch({
                type: DELETE_PRODUCT,
                pid: product_id
            })
        } catch (err) {
            throw err
        }

    }
}


export const update_product = (productid, alteredProduct) => {
    return async (dispatch, getState) => {
        try {
            const { token } = getState().auth
            const response = await fetch(`https://dummy-shop-app.firebaseio.com/products/${productid}.json?auth=${token}`, {
                method: 'PATCH',

                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(alteredProduct),
            })

            if (!response.ok) {
                throw new Error('Something went wrong!!!')
            }
            return dispatch({
                type: UPDATE_PRODUCT,
                product: alteredProduct,
                productid: productid
            })
        }
        catch (err) {
            throw err
        }
    }
}






