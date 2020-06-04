import React ,{useState}from 'react'
import { View,StyleSheet} from 'react-native'
import ShopBtn from '.././UI/ShopBtn';
import colors from '../../constants/colors'


const NestedButtons = ({route,navigation})=>{
    const [btmdrawerBtn, setbtmdrawerBtn] = useState(false)

    
    const openOtherButtons = () => {
        setbtmdrawerBtn(!btmdrawerBtn)
    }

    return(
        <View style={styles.btnConatinerStyle}>
        {btmdrawerBtn ?
            <View>
                <ShopBtn name="ios-cart" to='CartScreen' customColor={colors.primary} route={route} navigation={navigation} />
                <ShopBtn name="ios-archive" to='Orders' customColor={colors.primary} route={route} navigation={navigation} />
            </View>
            : null}
        <ShopBtn name={btmdrawerBtn ? 'ios-close':'md-reorder'} customColor={colors.primary} size={btmdrawerBtn ? 90:70}  route={route} navigation={navigation} to={openOtherButtons} />
    </View>
    )
} 
const styles = StyleSheet.create({
        btnConatinerStyle: {
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 25,
            right: 25
    }
});
export default NestedButtons;