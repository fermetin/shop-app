import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'
import { Platform } from 'react-native'
import colors from '../constants/colors'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import ShopBtn from '../components/UI/ShopBtn'
import DrawerBtn from '../components/UI/DrawerBtn'


const Stack = createStackNavigator()


const ShopNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="ProductsOverviewScreen"
            headerMode="screen"
            screenOptions={defaultScreenOptions}
        >
            <Stack.Screen
                name="ProductsOverviewScreen"
                component={ProductsOverviewScreen}
                options={({ route, navigation }) => ({
                    title: "All Products",
                    //headerRight:()=><ShopBtn route={route} navigation={navigation} />,
                    headerLeft:()=><DrawerBtn iconStyle={{marginLeft:10}} color={colors.primary} route={route} navigation={navigation} />
                })
                }
            />
            <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
                options={({ route, navigation }) => ({
                    title: route.params.title,
                    headerRight:()=><ShopBtn route={route} navigation={navigation} />
                })} />
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={({ navigation }) => ({
                    title: 'GoodProducts!!!'
                })}
            />
        </Stack.Navigator>
    )
}

const defaultScreenOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : '',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
    headerTitleAlign: 'center',
}



export default ShopNavigator