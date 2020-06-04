import React, { useState } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Icon } from 'react-native-elements';
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'
import CustomProductButton from '../../components/UI/CustomProductButton';
import NestedButtons from '../../components/UI/NestedButtons';
import colors from '../../constants/colors';


const CartScreen = props => {
    const [isLoading, setisLoading] = useState(false)
    const dispatch = useDispatch();
    const total = useSelector(state => parseFloat(state.cart.totalAmount));
    const cartItems = useSelector(state => {
        const properItemsList = [];
        for (const key in state.cart.items) {
            properItemsList.push({
                id: key,
                productPrice: state.cart.items[key].productPrice,
                productTitle: state.cart.items[key].productTitle,
                productDescription: state.cart.items[key].productDescription,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,

            })
        }
        return properItemsList.sort((a, b) => a.id > b.id ? 1 : -1);
    });

    const sendOrder = async()=>{
       setisLoading(true)
       await dispatch(ordersActions.addOrder(cartItems, total))
        setisLoading(false)
    }

    const RenderProducts = ({ item }) => {
        return (
            <View style={styles.itemcont}>
                <Text style={{ fontSize: 25 }} maxFontSizeMultiplier={1}  >{item.productTitle}</Text>
                <Text style={{ fontSize: 20 }}>x{item.quantity}</Text>
                <Button icon={<Icon
                    color='white'
                    name="delete"
                    size={30}
                    containerStyle={styles.btnicn} />}
                    onPress={() => { dispatch(cartActions.deleteFromCart(item.id)) }}
                />
            </View>
        )
    }



    return (
        <View style={styles.screen}>
            <View style={styles.amountcont} >
                <Text style={styles.txt}>Total: ${total}</Text>
                {isLoading ? <ActivityIndicator size='large' color='red' />:<CustomProductButton
                    btnName="Order"
                    btnColor={colors.primary}
                    disabled={cartItems.length === 0}
                    onClickHandler={sendOrder}
                />}
                
            </View>
            <View style={styles.list}>
                <Text style={styles.header}>Items</Text>
                <FlatList data={cartItems} renderItem={RenderProducts} />
            </View>
            <NestedButtons route={props.route} navigation={props.navigation} />
        </View>
    );
};
/**
                    icon={<Icon
                        color='white'
                        name="payment"
                        size={20}
                        title="Order Now"
                        containerStyle={styles.btnicn} />} */
const styles = StyleSheet.create({
    screen: {
        flex:1,
        margin: 20,
    },
    amountcont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
        padding: 10,
        borderRadius: 6,
        backgroundColor: 'white',
        marginHorizontal: 10
    },
    txt: {
        fontSize: 20,
    }
    ,
    btnicn: {
        width: '50%',
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 80
    }
    ,
    itemcont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
        padding: 10,
        borderRadius: 6,
        backgroundColor: 'white',
        margin: 10
    }
});

export default CartScreen;