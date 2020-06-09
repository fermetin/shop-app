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
            <View style={styles.childrenStyle}>
                {props.children}
            </View>
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
        overflow: 'hidden',
    },
    image: {
        width: "100%",
        height: "60%",
    },
    title: {
        textAlign: 'center',
        width: `100%`,
        fontSize: 30,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 22,
        color: '#888',
    },
    detailcont: {
        marginTop: 20,
        alignItems: 'center',
        height: "22%",    
    }, 
    childrenStyle: { 
        flex: 1,
        marginBottom:28,
    }
});

export default Products