import React from 'react'
import { Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import colors from '../../constants/colors';


const AddBtn = ({ route, navigation, iconStyle, color }) => {
    return (
        <FontAwesome5.Button
            backgroundColor={color}
            size={30}
            iconStyle={{
                color: colors.primary,
                ...iconStyle,
            }}
            name='edit'
            onPress={() => {
                navigation.navigate('AddProductScreen',{
                        productid:false
                })
            }} />
    )
}


export default AddBtn


