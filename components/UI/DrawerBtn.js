import React from 'react'
import { Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import colors  from '../../constants/colors';


const DrawerBtn = ({route, navigation,iconStyle,color}) =>{
    return(
        <FontAwesome5.Button 
            backgroundColor={color}
            size={35}
            iconStyle={{
                color:colors.accent,
                ...iconStyle,
            }} 
            name='bars' 
            onPress={()=>navigation.toggleDrawer()} />
        )
}


export default DrawerBtn


