import React from 'react';
// import { TailwindProvider } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import './global.css'; // Ensure global styles are imported

export default function App() {
  return (
    // <TailwindProvider>
    //   <NavigationContainer>
    //     <RootNavigator />
    //   </NavigationContainer>
    // </TailwindProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
