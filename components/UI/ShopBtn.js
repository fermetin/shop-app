import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import colors from '../../constants/colors';


const ShopBtn = ({ route, style, navigation, iconStyle, to, name, size,customColor }) => {

    const pressHandler = () => {
        if (typeof to === 'string') {
            navigation.navigate(to);
        } else {
            to()
        }
    }

    return (
        <TouchableOpacity>
            <Ionicons
                backgroundColor="transparent"
                color={customColor}
                size={size && size || 45}
                iconStyle={{
                    color: colors.accent,
                    ...iconStyle,
                }}
                name={name}
                onPress={pressHandler} />
        </TouchableOpacity>
    )
}


export default ShopBtn


