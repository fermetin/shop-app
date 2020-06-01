import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, RefreshControl } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from '../../store/actions/orders'

const OrderScreen = (props) => {
    const [isLoading, setisLoading] = useState(false)
    const [refreshing, setrefreshing] = useState()
    const [error, seterror] = useState()
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders.orders)

    const loadingOrders = useCallback(async () => {
        seterror()
        setrefreshing(true)
        try {
            await dispatch(ordersActions.refreshOrders())
        } catch (err) {
            seterror(err)
        }
        setrefreshing(false)
    }, [setisLoading, dispatch])

    useEffect(() => {
        props.navigation.addListener('focus', loadingOrders)

    }, [loadingOrders])

    useEffect(() => {
        setisLoading(true)
        loadingOrders().then(()=>{
            setisLoading(false)
        })

    }, [dispatch, loadingOrders])

    if (error) {
        return (
            <View style={styles.middelstaff}>
                <Text style={{ fontSize: 20 }} >Something went wrong!!!</Text>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.middelstaff}>
                <ActivityIndicator size={100} color="#00f0ff" />
            </View>)
    } if (orders.length === 0 && !isLoading) {
        return (
            <View style={styles.middelstaff}>
                <Text style={{ fontSize: 20 }} >You Don't have any Order yet, Let's some Shopping !!!</Text>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadingOrders}/>}
                data={orders}
                renderItem={(itemData) => <OrderItem order={itemData.item} />} />
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginBottom: 10
    },
    middelstaff: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})



export default OrderScreen