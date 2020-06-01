import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import OrderNavigator from './OrderNavigator'
import ShopNavigator from './ShopStackNavigator'
import { DrawerContent } from './DrawerContent'
import UserNavigator from './UserNavigator'
const Drawer = createDrawerNavigator()



const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Shop"
      drawerContent={({navigation}) => <DrawerContent navigation={navigation} />}
    >
      <Drawer.Screen
        name='Shop'
        component={ShopNavigator}
      />
      <Drawer.Screen 
        name='Orders'
        component={OrderNavigator}
        />
        <Drawer.Screen 
          name = 'UserNavigator'
          component={UserNavigator}
        />
    </Drawer.Navigator >
  )
}

export default DrawerNavigator


