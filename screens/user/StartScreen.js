import React, { useEffect } from 'react'
import { View, ActivityIndicator, Text, StyleSheet, AsyncStorage } from 'react-native'
import * as authAction from '../../store/actions/auth'
import { useDispatch } from 'react-redux'



const StartScreen = ({ navigation }) => {
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        const tryToLogin = async () => {
            const rawData = await AsyncStorage.getItem('userData')
            if (!rawData) {
                navigation.replace('AuthScreen')
                return
            }
            const userData = JSON.parse(rawData)
            const { token, userId, tokenExpiresIn } = userData
            const expiredDateMs = new Date(tokenExpiresIn)
            if ( expiredDateMs <= new Date() || !token || !userId) {
                navigation.replace('AuthScreen')
                return
            }
            dispatch(authAction.authenticate(token, userId))
            navigation.replace("MainDrawerNavigator")
        }
        tryToLogin()
        return
    }, [dispatch])

    return (
        <View style={styles.container}>
            <ActivityIndicator size={50} color="gray" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartScreen;