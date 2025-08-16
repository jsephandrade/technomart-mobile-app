import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

/**
 * The main navigation stack for authentication.
 *
 * The stack hides the default header and defines routes for logging in and
 * signing up. It can be extended to include additional auth routes (such as
 * password reset) in the future. Navigation is controlled within each
 * screen via the `navigation` prop passed automatically by React Navigation.
 */
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}