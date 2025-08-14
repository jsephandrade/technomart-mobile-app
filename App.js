import React from 'react';
import { TailwindProvider } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TailwindProvider>
  );
}
