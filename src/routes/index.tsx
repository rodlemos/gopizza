import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import React from 'react';
import { UserStackRoutes } from './userStack.routes';
import { SignIn } from '@screens/SignIn';

export function Routes() {
  const {user} = useAuth();
  return (
    <NavigationContainer>
      {user?.id ? <UserStackRoutes/> : <SignIn/>}
    </NavigationContainer>
  );
}