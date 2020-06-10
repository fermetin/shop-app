
import { AsyncStorage } from 'react-native'
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const AUTH = 'AUTH'

let timerRef;
export const authenticate = (token, userId, expiresTime) => {
    return (dispatch) => {
        dispatch(setLogoutTimerandLogOut(expiresTime))
        dispatch({
            type: AUTH,
            userId: userId,
            token: token
        })

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
            const expireMSeconds = parseInt(resData.expiresIn) * 1000
            dispatch(authenticate(resData.idToken, resData.localId, expireMSeconds))
            const tokenExpiresIn = new Date(new Date().getTime() + expireMSeconds)
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
            const expireMSeconds = parseInt(resData.expiresIn) * 1000
            dispatch(authenticate(resData.idToken, resData.localId, expireMSeconds))
            const tokenExpiresIn = new Date(new Date().getTime() + expireMSeconds)
            saveDataToDevice(resData.idToken, resData.localId, tokenExpiresIn)
        } catch (err) {
            throw err
        }
    }
}

export const logOut = () => {
    return async (dispatch) => {
        clearTimerRef()
        AsyncStorage.removeItem('userData')
        dispatch({
            type: LOGOUT
        })
    }

}
const clearTimerRef = () => {
    if (timerRef) {
        clearTimeout(timerRef)
    }
}

const setLogoutTimerandLogOut = (expiresTime) => {
    return (dispatch) => {
        timerRef = setTimeout(() => {
            dispatch(logOut())
        }, expiresTime)
    }
}
const saveDataToDevice = async (token, userId, tokenExpiresIn) => {
    await AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            tokenExpiresIn: tokenExpiresIn.toISOString()
        }))
}