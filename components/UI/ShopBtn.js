import React from 'react'
import { Text } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors';


const ShopBtn = ({ route, style, navigation, iconStyle, to, name, size }) => {

    const pressHandler = () => {
        if (typeof to === 'string') {
            navigation.navigate(to);
        } else {
            to()
        }
    }

    return (
        <Ionicons
            backgroundColor="transparent"
            size={size && size || 45}
            iconStyle={{
                color: colors.accent,
                ...iconStyle,
            }}
            name={name}
            onPress={pressHandler} />
    )
}


export default ShopBtn


