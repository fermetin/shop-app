import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux'
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DrawerBtn from '../components/UI/DrawerBtn';

export function DrawerContent(props) {
  const { navigation } = props
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={
          styles.drawerContent
        }
      >
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          />
          <Title style={styles.title}>Fatih Ermetin</Title>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="face-profile"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => navigation.navigate('UserNavigator')}

          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="basket"
                color={color}
                size={size}
              />
            )}
            label="Shopping"
            onPress={() => navigation.navigate('Shop')}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name='cart' color={color} size={size} />
            )}
            label="Orders"
            onPress={() => navigation.navigate('Orders')}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => { }}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          <Drawer.Item
            label="LogOut"
            icon={({ color, size }) => (
              <MaterialCommunityIcons name='exit-to-app' color={color} size={size} />
            )}
            onPress={async() => {
              navigation.replace('StartScreen')
              await AsyncStorage.clear()
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});