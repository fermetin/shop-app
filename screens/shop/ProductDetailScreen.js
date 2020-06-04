import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Button } from 'react-native'
import colors from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import NestedButtons from '../../components/UI/NestedButtons';

const ProductDetailsScreen = ({ route, navigation }) => {
    const { productId, user } = route.params;
    const dispatch = useDispatch();
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => productId === product.id))

    return (
        <View style={{flex:1}} >
            <ScrollView>
                <Image style={styles.img} source={{ uri: selectedProduct && selectedProduct.imageUrl }} />
                {!user && <View style={styles.btn}>
                    <Button
                        color="darkblue"
                        title="Add to Card"
                        onPress={() => {
                            dispatch(cartActions.addToCart(selectedProduct));
                        }} />
                </View>}
                <Text style={styles.price}>$ {parseFloat(selectedProduct.price).toFixed(2)}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </ScrollView>
                <NestedButtons route={route} navigation={navigation} />
        </View>
    )
};
const styles = StyleSheet.create({
    img: {
        width: "100%",
        height: 280
    },
    btn: {
        margin: 15,
        marginHorizontal: 80,
    },
    price: {
        fontSize: 34,
        textAlign: 'center',
        color: colors.primary,
        marginVertical: 30
    },
    description: {
        fontSize: 20,
        textAlign: 'center'
    }
});

export default ProductDetailsScreen;
