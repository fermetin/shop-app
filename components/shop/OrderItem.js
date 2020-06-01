import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import colors from '../../constants/colors'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';



const OrderItem = ({ order }) => {
    const [details, setdetails] = useState(false)


    const handleDetails = () => {
        setdetails(!details)
    }


    const OrderItem = ({ item }) => {
        return (
            <View style={styles.itemcont}>
                <Text style={{ fontSize: 28 }}>{item.productTitle}</Text>
                <View style={{ flexDirection: 'row', marginEnd: 30 }}>
                    <Text style={{ fontSize: 28 }}>{item.productPrice}</Text>
                    <Text style={{ fontSize: 18, color: colors.grey2 }}>x{item.quantity}</Text>
                </View>
            </View>
        )
    }



    return (
        <SafeAreaView>
            <View style={styles.cont}>
                <View style={styles.summary}>
                    <Text style={styles.totalAmount} >${order.totalAmount}</Text>
                    <Text style={styles.date}>Date: {order.date.toDateString()}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleDetails}
                    style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                    <Text style={{ fontSize: 30, color: colors.primary }}>{details ? 'Close':'Show Details'}</Text>
                </TouchableOpacity>
                {details && <View>
                    {order.items.map((item, i) => <OrderItem key={item.id} item={item} />)}
                </View>}
            </View>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    cont: {
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 20,

    },
    itemcont: {
        flexDirection: 'row',
        elevation: 10,
        paddingStart: 20,
        justifyContent: 'space-around',
    }
    ,
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    totalAmount: {
        fontSize: 24,
        padding: 20,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 18,
        marginEnd: 30,
        color: colors.grey3
    }
});

export default OrderItem;