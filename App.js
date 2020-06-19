
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider, } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './models/navigation/AppNavigator'



const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})
const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(ReduxThunk)),
  )

export default function App() {


  return (
    <SafeAreaProvider>
      <Provider store={store} >
        <PaperProvider>
          <NavigationContainer >
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  )
}

