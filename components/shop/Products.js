import React from 'react'
import { Text, View, StyleSheet, Image, Button, Platform } from 'react-native'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'

//each products item
const Products = props => {
    const { item } = props;

    let Touch = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        Touch = TouchableNativeFeedback;
    }

    return (

        <View style={styles.cont}>
            <Touch onPress={props.clickDetails} activeOpacity={1}>
                <Image style={styles.image} source={{ uri: item.imageUrl }} />
                <View style={styles.detailcont}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price} $ </Text>
                </View>
            </Touch>
                {props.children}
        </View>
    );
};
const styles = StyleSheet.create({
    cont: {
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
    
});

export default Products