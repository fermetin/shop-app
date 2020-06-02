
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSentryMiddleware from "redux-sentry-middleware";
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider, useSelector } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './navigation/AppNavigator'



const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})
const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(ReduxThunk,)),
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
