import React from 'react';
import { View } from 'react-native';

export default function AuthCard({ children }) {
  return (
    <View className="bg-cream/90 rounded-3xl p-8 mx-6 mt-6 shadow-2xl">
      {children}
    </View>
  );
}
