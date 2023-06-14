import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { Products } from '@screens/Products';
import { useAuth } from '@hooks/auth';
import { Order } from '@screens/Order';
import { UserTabRoutes } from './userTab.routes';

export function UserStackRoutes() {
  const { user } = useAuth();
  const { Navigator, Screen, Group } = createNativeStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {
        user?.isAdmin
          ? (<Group>
            <Screen name='home' component={Home} />
            <Screen name='products' component={Products} />
          </Group>)
          : (<Group>
            <Screen name='UserTabRoutes' component={UserTabRoutes} />
            <Screen name='order' component={Order} />
          </Group>)
      }
    </Navigator>
  );
}