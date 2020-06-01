import React from 'react'
import { } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import OrderScreen from '../screens/shop/OrdersScreen'
import DrawerBtn from '.././components/UI/DrawerBtn'
const Stack = createStackNavigator()

const OrderNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Orders' >
            <Stack.Screen 
                name='Orders'
                component={OrderScreen}
                options={({ route, navigation }) => ({
                    title: "ORDERS",
                    headerTitleAlign:'center',
                    headerTitleAllowFontScaling:true,
                    headerTintColor:'darkblue',
                    headerTitleStyle:{
                        fontSize:30
                    },
                    headerLeft:()=><DrawerBtn color='white' iconStyle={{marginLeft:10}} route={route} navigation={navigation} />
                })}
            />
        </Stack.Navigator>
    )
}


export default OrderNavigator