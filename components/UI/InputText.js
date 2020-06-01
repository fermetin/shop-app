import React, { useReducer, useEffect } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import colors from '../../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons'


const UPDATE_INPUT = "UPDATE_INPUT"
const INPUT_BLUR = "INPUT_BLUR"

const inputReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_INPUT:
            return {
                ...state,
                value: action.value,
                valid: action.valid,
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state
    }
}
const InputText = (props) => {

    const [inputState, inputDispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : "",
        valid: props.initialValid,
        touched: false
    })
    const { onInputChange, id } = props
    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.valid)
        }
    }, [inputState, id, onInputChange])

    const textChangeHandler = text => {
        if (props.id === 'price' && text.trim().length < text.length) {
            //if user inputs got a space character set invalid
        }
        const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true
        if (props.required && text.trim().length === 0) isValid = false
        if (props.email && !emailRe.test(text.toLowerCase())) isValid = false
        if (props.min != null && +text < props.min) isValid = false
        if (props.max != null && +text > props.max) isValid = false
        if (props.minLength != null && text.length < props.minLength) isValid = false

        inputDispatch({
            type: UPDATE_INPUT,
            value: text,
            valid: isValid
        })

    }
    const lostFocusHandler = () => {
        inputDispatch({
            type: INPUT_BLUR
        })
    }
    return (
        <View style={styles.tinputCont}>
            <Text style={styles.text} >{props.label}</Text>
            <TextInput
                {...props}
                style={styles.tinput}
                onChangeText={text => textChangeHandler(text)}
                value={inputState.value}
                onEndEditing={lostFocusHandler}
            />
            {!inputState.valid && inputState.touched && (
                <View style={styles.errorCont}>
                    <Text style={styles.errTxt} >{props.errortext}</Text>
                </View>
            )}
            {inputState.valid &&
                <FontAwesome5 style={{ marginHorizontal: 10, marginVertical: 2 }} size={20} name='check' color='green' />}
        </View>
    )
}


const styles = StyleSheet.create({
    tinputCont: {
        margin: 40,
    },
    text: {
        fontSize: 23,
        fontWeight: 'bold'
    },
    tinput: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomWidth: 0.8,
        borderTopWidth: 0.7,
        borderLeftWidth: 0.8,
        borderRightWidth: 0.8,
        borderColor: 'gray'
    },
    errorCont: {
        marginVertical: 5,

    }, errTxt: {
        fontWeight: 'bold',
        color: 'red'
    }, validtxt: {
        color: 'green'
    }
})

export default InputText