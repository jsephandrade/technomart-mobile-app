import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AccountCreatedScreen from '../screens/AccountCreatedScreen';

/**
 * Auth stack with a splash intro.
 * - Splash -> Login -> SignUp
 * - Headers are hidden for all screens.
 */
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="AccountCreated" component={AccountCreatedScreen} />
    </Stack.Navigator>
  );
}
