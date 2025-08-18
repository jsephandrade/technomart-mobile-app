import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import AccountCreatedScreen from '../screens/AccountCreatedScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import FaceScanScreen from '../screens/FaceScanScreen' // make sure this path is correct
// import FoodOrdersScreen from '../screens/FoodOrdersScreen'
import ProfileScreen from "../screens/ProfileScreen"
import PersonalInfoScreen from "../screens/PersonalInfoScreen"
import ShareFeedbackScreen from "../screens/ShareFeedbackScreen"

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="AccountCreated" component={AccountCreatedScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="FaceScan" component={FaceScanScreen} />
      {/* <Stack.Screen name="Home" component={FoodOrdersScreen} /> */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="Feedback" component={ShareFeedbackScreen} />
    </Stack.Navigator>
  )
}
