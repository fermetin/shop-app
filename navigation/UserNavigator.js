import React from 'react'
import { Button} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import UserProductScreen from '../screens/user/UserProductsScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailScreen';
import AddProductScreen from '../screens/user/AddProductScreen';
import colors from '../constants/colors';
import {FontAwesome5} from '@expo/vector-icons'
import AddBtn from '../components/UI/AddBtn';
import DrawerBtn from '../components/UI/DrawerBtn';
const Stack = createStackNavigator()

const UserNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='UserProductScreen'
            screenOptions={{
                headerTitleAlign: 'center'
            }}>
            <Stack.Screen
                name='UserProductSecreen'
                component={UserProductScreen}
                options={({ navigation }) => ({
                    headerTintColor: colors.primary,
                    headerRight: () => <AddBtn navigation={navigation} color='white' />,
                    headerLeft: () => <DrawerBtn navigation={navigation} color='white' iconStyle={{color:colors.primary,marginStart:15}} />
                })}
            />
            <Stack.Screen
                name='ProductDetailScreen'
                component={ProductDetailsScreen}

            />
            <Stack.Screen
                name='AddProductScreen'
                component={AddProductScreen}
            />
        </Stack.Navigator>
    )
};

export default UserNavigator