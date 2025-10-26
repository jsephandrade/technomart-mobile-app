import 'react-native-gesture-handler';
import React from 'react';
// import { TailwindProvider } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import './global.css'; // Ensure global styles are imported
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    // <TailwindProvider>
    //   <NavigationContainer>
    //     <RootNavigator />
    //   </NavigationContainer>
    // </TailwindProvider>
    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CartProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
