import PRODUCTS from '../../data/dummy-data'
import Product from '../../models/products'

const initialState = {
    availableProducts: [],
    userProducts:[]
}


export default (state = initialState, action) =>{
    switch(action.type){
        case "REFRESH_PRODUCTS":
            return{
                ...state,
                availableProducts:action.allProducts,
                userProducts:action.userProducts
            }
        case "DELETE_PRODUCT":
                return{
                    ...state,
                    userProducts:state.userProducts.filter(el=> el.id !== action.pid),
                    availableProducts:state.userProducts.filter(el=> el.id !== action.pid),
                }
        case "UPDATE_PRODUCT":
                const product = action.product
                const productid = action.productid
                const userPindex = state.userProducts.findIndex(prd => prd.id === productid)
                const availablePindex = state.availableProducts.findIndex(prd => prd.id === productid)

                const newProd = new Product(
                    product.id,
                    product.ownerId,
                    product.title,
                    product.imageUrl,
                    product.description,
                    product.price
                )
                const uuserProds = [...state.userProducts]
                const uavailavleProds = [...state.availableProducts]
                uuserProds[userPindex] = newProd
                uavailavleProds[availablePindex] = newProd
                    return{
                        ...state,
                        userProducts:uuserProds,
                        availableProducts:uavailavleProds
                    }

        case "ADD_PRODUCT":
            const p = action.product
            const prod = new Product(p.id,p.ownerId,p.title,p.imageUrl,p.description,p.price)
            return{
                ...state,
                userProducts:state.userProducts.concat(prod),
                availableProducts:state.userProducts.concat(prod)
            }
        }
    return state 
}


/**case "ADD_PRODUCT":
            const addProd = action.product 
            const product = new Product(new Date.now,) */