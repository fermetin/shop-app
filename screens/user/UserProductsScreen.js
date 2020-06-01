import React, { useState, useEffect } from 'react'
import { View, Button, Alert, ActivityIndicator, Text, RefreshControl } from 'react-native'
import { FlatList, StyleSheet } from 'react-native'
import Products from '../../components/shop/Products'
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from '../../store/actions/products'
import { ScrollView } from 'react-native-gesture-handler'

const UserPrdouctScreen = ({ props, navigation }) => {
    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState()
    const userItems = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()
    console.log(userItems)
    console.log(useSelector(state => state.products.availableProducts))

    useEffect(() => {
        if (error) {
            Alert.alert('Error Occured', error, [{ text: 'OKAY' }])
        }
    }, [error])

    const deleteProduct = async (id) => {
        seterror(null)
        setisLoading(true)
        try {

            await dispatch(productActions.delete_product(id))

        } catch (error) {
            seterror(error.message)
        }
        setisLoading(false)
    }
    if (isLoading) {
        return (
            <View style={styles.middelstaff}>
                <ActivityIndicator size={100} color="#00f0ff" />
            </View>)

    } if (!isLoading && userItems.length === 0) {
        return (
            <View style={styles.middelstaff}>
                <Text>You Dont Have Any Product Now.Let's Some Add</Text>
            </View>)
    }
    return (
        <FlatList

            data={userItems} renderItem={(itemData) =>
                <Products user={true} item={itemData.item} >
                    <View style={styles.btns}>
                        <Button title="EDIT." onPress={() => navigation.navigate('AddProductScreen', {
                            productid: itemData.item.id,
                            user: true
                        })} />
                        <Button title="Delete" onPress={() =>
                            Alert.alert(
                                'Hey',
                                'Are you sure !!! You gonna delete this product',
                                [
                                    { text: 'I\'am sure', onPress: () => deleteProduct(itemData.item.id) },
                                    { text: 'Cancel', style: 'cancel' }
                                ])
                        } />
                    </View>
                </Products>} />

    )
}


const styles = StyleSheet.create({
    btns: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 5
    }, middelstaff: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserPrdouctScreen;
