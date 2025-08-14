import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TailwindProvider } from 'nativewind';
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
