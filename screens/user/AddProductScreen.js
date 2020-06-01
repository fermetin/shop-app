import React, { useState, useReducer, useCallback, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator ,Text} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/products'
import { FontAwesome5 } from '@expo/vector-icons'
import InputText from '../../components/UI/InputText'

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

const AddProductScreen = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState()
    const { productid } = route.params
    const userId =  useSelector(state => state.auth.userId)
    const selectedProd = useSelector((state) => state.products.userProducts.find(prd => prd.id === productid))

    const [formState, dispatchForm] = useReducer(formReducer, {
        inputValues: {
            title: selectedProd ? selectedProd.title : "",
            description: selectedProd ? selectedProd.description : "",
            imageUrl: selectedProd ? selectedProd.imageUrl : "",
            price: selectedProd ? selectedProd.price : "",

        },
        inputValidities: {
            title: selectedProd ? true : false,
            description: selectedProd ? true : false,
            imageUrl: selectedProd ? true : false,
            price: selectedProd ? true : false,
        },
        formIsValid: selectedProd ? true : false
    })


    useEffect(()=>{
        if(error){
            Alert.alert('Error Occured',error,[{text:'OK'}])
        }
    },[error])



    const handleInputs = async () => {
        if (!formState.inputValidities.title) {
            Alert.alert('Heyy', 'Title must be Valid', [{ text: 'Okay' }])
            return
        } else if (!formState.inputValidities.imageUrl) {
            Alert.alert('Heyy', 'Url must be Valid', [{ text: 'Okay' }])
            return
        } else if (!formState.inputValidities.description) {
            Alert.alert('Heyy', 'Description must be Valid', [{ text: 'Okay' }])
            return
        } else if (!formState.inputValidities.price) {
            Alert.alert('Heyy', 'Price must be Valid', [{ text: 'Okay' }])
            return
        }

        

        const newProd = {
            ownerId: userId,
            title: formState.inputValues.title,
            description: formState.inputValues.description,
            price: formState.inputValues.price*1,
            imageUrl: formState.inputValues.imageUrl
        }
        //for spinner//and errır handling
        seterror(null)
        setisLoading(true)
        //handle editing
        try {
            if (selectedProd) {
                await dispatch(productsActions.update_product(productid, newProd))

            }
            else {
                //handle new One
                await dispatch(productsActions.add_product(newProd))
            }

            navigation.goBack()
        } catch (err) {
            seterror(err.message)
        }
        setisLoading(false)

    }


    const inputChangeHandler = useCallback((inputIdentifier, text, valid) => {
        dispatchForm({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: valid,
            input: inputIdentifier
        })
    }, [dispatchForm])
    if (error) {
        <View style={styles.middelstaff}>
            <Text>Something went wrong !!!{error}</Text>
        </View>
    }
    if (isLoading) {
        return (
            <View style={styles.middelstaff}>
                <ActivityIndicator size={100} color="#00f0ff" />
            </View>)

    }

    return (
        <KeyboardAvoidingView
            enabled
            style={{ backgroundColor: 'white', flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
        >
            <ScrollView  >
                <View style={{ flex: 1 }}>
                    <InputText
                        id='title'
                        label='Title'
                        errortext="*Title Can not be Empty or less then 5 charachter"
                        autoCorrect
                        autoCapitalize='sentences'
                        keyboardType="default"
                        returnKeyType="next"
                        underlineColorAndroid="transparent"
                        onInputChange={inputChangeHandler}
                        initialValue={selectedProd ? selectedProd.title : ""}
                        initialValid={!!selectedProd}
                        minLength={5}
                        required={true}
                    />
                    <InputText
                        id='imageUrl'
                        label='ImageUrl'
                        errortext="*ImageUrl Can not be Empty"
                        keyboardType="default"
                        returnKeyType="next"
                        underlineColorAndroid="transparent"
                        onInputChange={inputChangeHandler}
                        initialValue={selectedProd ? selectedProd.imageUrl : ""}
                        initialValid={!!selectedProd}
                        required={true}
                    />
                    <InputText
                        id='description'
                        label='Description'
                        errortext="*Description Can not be Empty or less then 10 character"
                        keyboardType="default"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        underlineColorAndroid="transparent"
                        onInputChange={inputChangeHandler}
                        initialValue={selectedProd ? selectedProd.description : ""}
                        initialValid={!!selectedProd}
                        required={true}
                        maxLength={100}
                        minLength={10}
                    />
                    <InputText
                        id='price'
                        label='Price'
                        errortext="*Price Can not be Empty"
                        keyboardType="decimal-pad"
                        returnKeyType="done"
                        underlineColorAndroid="transparent"
                        onInputChange={inputChangeHandler}
                        initialValue={selectedProd ? selectedProd.price.toString() : ""}
                        initialValid={!!selectedProd}
                        required={true}
                        min={0.1}
                        max={1000000}
                    />
                    <View style={styles.btn}>
                        <FontAwesome5.Button onPress={handleInputs} backgroundColor="white" color="#71f4a1" name="check-circle" size={80} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    middelstaff: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }

})


export default AddProductScreen