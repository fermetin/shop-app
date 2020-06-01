
import { AsyncStorage } from 'react-native'

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const AUTH = 'AUTH'


export const authenticate = (token, userId) => {
    return {
        type: AUTH,
        userId: userId,
        token: token
    }
}

export const singUp = (email, password) => {
    return async dispatch => {
        try {
            const respond = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuAWfWoq3LOaohCsEHu_Y7CrjciZzu1AA', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "returnSecureToken": true
                })
            })

            if (!respond.ok) {
                throw new Error('Something Went Wrong to Sign Up');
            }
            const resData = await respond.json();

            dispatch(authenticate(resData.idToken, resData.localId))
            const tokenExpiresIn = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
            saveDataToDevice(resData.idToken, resData.localId, tokenExpiresIn)
        } catch (err) {
            throw err
        }
    }
}

export const logIn = (email, password) => {
    return async dispatch => {
        try {
            const respond = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuAWfWoq3LOaohCsEHu_Y7CrjciZzu1AA', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "returnSecureToken": true
                })
            })
            if (!respond.ok) {
                const errorData = await respond.json()
                const emsg = errorData.error.message
                let mesg = "Something Went Wrong!!!"
                if (emsg === "INVALID_PASSWORD" || emsg === "EMAIL_NOT_FOUND") {
                    mesg = " Your Email or Password is Invalid."
                } else if (emsg.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
                    mesg = "Too many unsuccessful login attempts. Please try again later."
                }
                throw new Error(mesg)
            }
            const resData = await respond.json()
            dispatch(authenticate(resData.idToken, resData.localId))
            const tokenExpiresIn = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
            saveDataToDevice(resData.idToken, resData.localId, tokenExpiresIn)
        } catch (err) {
            throw err
        }
    }
}
const saveDataToDevice = async (token, userId, tokenExpiresIn) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            tokenExpiresIn: tokenExpiresIn.toISOString()
        }))
}