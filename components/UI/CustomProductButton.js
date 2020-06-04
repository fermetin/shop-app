import React from 'react'
import { TouchableHighlight, Text, StyleSheet, View,Icon } from 'react-native'
import colors from '../../constants/colors';



const CustomProductButton = ({icon,btnColor, btnName, onClickHandler ,disabled}) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight underlayColor={colors.accent} style={{...styles.button, backgroundColor:`${btnColor}`}} onPress={onClickHandler} disabled={disabled}>
                <Text  style={styles.text}>{btnName}</Text>
            </TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
      },
      text:{
          fontSize:20,
          color:'white'
      }
});

export default CustomProductButton;