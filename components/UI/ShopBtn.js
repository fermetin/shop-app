import React from 'react'
import { Text} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import colors  from '../../constants/colors';


const ShopBtn = ({route, navigation,iconStyle}) =>{
    return(
        <FontAwesome5.Button 
            backgroundColor={colors.primary}
            size={35}
            iconStyle={{
                color:colors.accent,
                ...iconStyle
            }} 
            name="shopping-cart" 
            onPress={()=>navigation.navigate('CartScreen')} />
        )
}


export default ShopBtn


