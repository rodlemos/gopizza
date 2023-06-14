import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '@screens/Home';
import { Orders } from '@screens/Orders';
import { BottomtabsMenu } from '@components/BottomTabsMenu';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import firestore from '@react-native-firebase/firestore';

export function UserTabRoutes() {
  const [notifications, setNotifications] = useState('0');
  const { Navigator, Screen } = createBottomTabNavigator();
  const { COLORS } = useTheme();

  useEffect(() => {
    const subscribe = firestore().collection('orders').where('status', '==', 'Pronto')
      .onSnapshot(querySnapshot => {
        setNotifications(String(querySnapshot.docs.length));
      })

    return () => subscribe();
  }, []);

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 72,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0
        }
      }}
    >
      <Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomtabsMenu title='Cardápio' color={color}/>
          )
        }}
      />

      <Screen
        name='orders'
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomtabsMenu title='Pedidos' color={color} notifications={notifications}/>
          )
        }}
      />
    </Navigator>
  );
}