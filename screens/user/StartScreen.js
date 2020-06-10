import React, { useEffect } from 'react'
import { View, ActivityIndicator, Text, StyleSheet, AsyncStorage } from 'react-native'
import * as authAction from '../../store/actions/auth'
import { useDispatch } from 'react-redux'



const StartScreen = ({ navigation }) => {
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        //if user token expired or not
        const tryToLogin = async () => {
            const rawData = await AsyncStorage.getItem('userData')
            if (!rawData) {
                navigation.replace('AuthScreen')
                return
            }
            const userData = JSON.parse(rawData)
            const { token, userId, tokenExpiresIn } = userData
            const expiredDate = new Date(tokenExpiresIn)
            //if token expired 
            if ( expiredDate <= new Date() || !token || !userId) {
                navigation.replace('AuthScreen')
                return
            }
            const expiredMSeconds = expiredDate.getTime() - new Date().getTime()
            //token is still valid so we can go through app 
            dispatch(authAction.authenticate(token, userId,expiredMSeconds))
            
        }
        tryToLogin()
        return
    }, [dispatch])
    //if its takes long time show spinner
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