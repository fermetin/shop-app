import React, { useState, useEffect } from 'react'
import { createStackNavigator, } from '@react-navigation/stack'
import MainDrawerNavigator from './MainDrawerNavigator'
import StartScreen from '../../screens/user/StartScreen'
import AuthScreen from '../../screens/user/AuthScreen'
import colors from '../../constants/colors'
import { useSelector } from 'react-redux'
const Stack = createStackNavigator()

const AppNavigator = () => {
    const isAuth = useSelector(state => !!state.auth.isAuth)
    return (
        <Stack.Navigator >
            {
                !isAuth ? (
                    <>
                        <Stack.Screen
                            name="StartScreen"
                            component={StartScreen}
                        />
                        <Stack.Screen
                            name="AuthScreen"
                            component={AuthScreen}
                            options={({ navigation, route }) => ({
                                title: "WELCOME",
                                headerTitleAlign: 'center',
                                headerTintColor: colors.primary
                            })}
                        />
                    </>) : (
                        <>
                            <Stack.Screen
                                name="MainDrawerNavigator"
                                component={MainDrawerNavigator}
                                options={({ navigation, route }) => ({
                                    headerShown: false
                                })}
                            />
                        </>)
            }
        </Stack.Navigator>
    )
};

export default AppNavigator