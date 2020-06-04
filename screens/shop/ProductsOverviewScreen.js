
import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, View, Text, StyleSheet, Button, ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Product from '../../components/shop/Products'
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import { SafeAreaView } from 'react-native-safe-area-context'
import ShopBtn from '../../components/UI/ShopBtn'
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler'
import colors from '../../constants/colors'

const ProductsOverviewScreen = props => {
    const [isloading, setisloading] = useState(true)
    const [refreshing, setrefreshing] = useState(false)
    const [btmdrawerBtn, setbtmdrawerBtn] = useState(false)
    const [err, seterr] = useState()
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadingProducts = useCallback(async () => {
        seterr()
        setrefreshing(true)
        try {
            await dispatch(productActions.refresh_products())
        } catch (err) {
            seterr(err.message)
        }
        setrefreshing(false)
    }, [dispatch, setrefreshing, seterr])

    useEffect(() => {
        props.navigation.addListener('focus', loadingProducts)

    }, [loadingProducts])

    useEffect(() => {
        setisloading(true)
        loadingProducts().then(() => {
            setisloading(false)
        })

    }, [dispatch, loadingProducts])

    if (err) {
        return (
            <View style={styles.middlestaff}>
                <Text style={{ fontSize: 14 }}>ERROR OCCURED </Text>
                <Button title='TRYAGAIN' color='red' onPress={loadingProducts} />
            </View>
        )
    }

    if (isloading) {
        return (
            <View style={styles.middlestaff}>
                <ActivityIndicator size={100} color="#00f0ff" />
            </View>)
    }
    if (products.length === 0 && !isloading) {
        return (
            <View style={styles.middlestaff}>
                <Text style={{ fontSize: 14 }}>You dont have products.Maybe You Can Try Add Some </Text>
            </View>
        )
    }

    const detailScreen = (title, productId) => {
        props.navigation.navigate('ProductDetailScreen', {
            title,
            productId
        })
    }
    const openOtherButtons = () => {
        setbtmdrawerBtn(!btmdrawerBtn)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadingProducts} />}
                data={products}
                renderItem={(itemData) =>
                    <Product
                        user={false}
                        item={itemData.item}
                        clickDetails={() => detailScreen(itemData.item.title, itemData.item.id)}
                    >
                        <View style={styles.btns}>
                            <Button title="Details" color={colors.accent} onPress={() => detailScreen(itemData.item.title, itemData.item.id)} />
                            <Button title="to Cart" color={colors.accent} onPress={() => dispatch(cartActions.addToCart(itemData.item))} />
                        </View>
                    </Product>}

            />
            <View style={styles.btnConatinerStyle}>
                {btmdrawerBtn ?
                    <View>
                        <ShopBtn name="ios-cart" to='CartScreen' customColor={colors.primary} route={props.route} navigation={props.navigation} />
                        <ShopBtn name="ios-archive" to='Orders' customColor={colors.primary} route={props.route} navigation={props.navigation} />
                    </View>
                    : null}
                <ShopBtn name={btmdrawerBtn ? 'ios-close':'md-reorder'} customColor={colors.primary} size={btmdrawerBtn ? 90:70}  route={props.route} navigation={props.navigation} to={openOtherButtons} />
            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    btnConatinerStyle: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 25,
        right: 25
    }
    , cont: {
        elevation: 5,
        borderRadius: 10,
        margin: 20,
        height: 300,
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    image: {
        width: "100%",
        height: "60%",
    },
    title: {
        fontSize: 24,
        marginVertical: 4,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: '#888'
    },
    detailcont: {
        alignItems: 'center',
        marginVertical: 10,
        height: "20%",
        padding: 10
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 5
    }, middlestaff: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default ProductsOverviewScreen