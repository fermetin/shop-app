import React, { useReducer, useCallback, useState, useEffect } from 'react'
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, Text, Alert } from 'react-native'
import {ActivityIndicator} from 'react-native-paper';
import InputText from '../../components/UI/InputText'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../constants/colors'
import * as authactions from '../../store/actions/auth'
import { useDispatch } from 'react-redux'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === 'FORM_INPUT_UPDATE') {
        const updateValues = {
            ...state.inputValues,
            [action.input]: action.value,
        }
        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let formisValid = true
        for (let key in updateValidities) {
            formisValid = formisValid && updateValidities[key]
        }
        return {
            formIsValid: formisValid,
            inputValues: updateValues,
            inputValidities: updateValidities
        }
    }
    return state
}

const AuthScreen = ({navigation}) => {
    const [isLoading, setisLoading] = useState(false)
    const [SucMessage, setSucMessage] = useState();
    const [err, seterr] = useState("")
    const [login, setlogin] = useState(true)
    const dispatch = useDispatch()
    const [formState, dispatchForm] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: "",

        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false
    })



    const inputChangeHandler = useCallback((inputIdentifier, text, valid) => {
        setSucMessage()
        dispatchForm({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: valid,
            input: inputIdentifier
        })
    }, [dispatchForm])

    useEffect(()=>{

        if(err){
            Alert.alert("Something Went Wrong",err,[{text:'OKEY'}])
        }
    },[
        err
    ])

    const authHandler = async () => {
        seterr(null)
        try {
            if (formState.formIsValid) {
                setisLoading(true)
                if (login) {
                    await dispatch(authactions.logIn(formState.inputValues.email, formState.inputValues.password))
                    navigation.replace('MainDrawerNavigator')
                } else {
                    await dispatch(authactions.singUp(formState.inputValues.email, formState.inputValues.password))
                    setSucMessage("Success Sign Up");
                    navigation.replace('MainDrawerNavigator')
                }
            }
        } catch (err) {
            seterr(err.message)
            setisLoading(false)
        }
    }



    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 300,
                }}
            />
             {isLoading ? 
                            <ActivityIndicator
                            size={50} color={colors.primary}
                            animating={true}
                            style={{position:'absolute',backgroundColor:'transparent'}} 
                        />
                        : null}
            <ScrollView >
                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50}>

                    <View style={styles.inptCont}>
                        <InputText
                            id='email'
                            label='E-Mail'
                            email
                            errortext='*E-mail is not valid and*Can not be Empty*'
                            autoCapatialize={false}
                            keyboardtype='default'
                            returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            required={true}
                            initialValue=""

                        />
                        <InputText
                            id='password'
                            label='Password'
                            errortext='*Password is not valid*Can not be Empty*'
                            autoCapatialize={false}
                            secureTextEntry
                            minLength={5}
                            keyboardtype='default'
                            onInputChange={inputChangeHandler}
                            required={true}
                            initialValue=""
                        />
                        <View style={styles.buttoncont}>
                            <LinearGradient
                                colors={['#020024', '#6c4141']}
                                style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
                            >
                                <Text
                                    onPress={authHandler}
                                    style={{
                                        backgroundColor: 'transparent',
                                        fontSize: 20,
                                        color: '#fff',
                                    }}>
                                    {!login ? "Sign Up" : "Login"}
                                </Text>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#6c0a0a', '#160202']}
                                style={{ padding: 15, alignItems: 'center', borderRadius: 5, marginVertical: 20 }}
                            >
                                <Text
                                    onPress={() => { setlogin(!login) }}
                                    style={{
                                        backgroundColor: 'transparent',
                                        fontSize: 20,
                                        color: '#fff',
                                    }}>
                                    Switch to {!login ? "Login" : "Sign Up"}
                                </Text>
                            </LinearGradient>
                            {SucMessage ? <Text style={{ margin: 20 }}>{SucMessage}</Text> : null}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }, buttoncont: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    },
    inptCont: {
        justifyContent:'center',
        elevation: 6,
        margin: 25,
        borderColor: 'black',
    },

});
export default AuthScreen;
