import React from 'react';
import { View } from 'react-native';

export default function AuthCard({ children }) {
  return (
    <View className="mx-6 mt-6 rounded-3xl border border-peach-100 bg-white/90 p-8 shadow-xl">
      {children}
    </View>
  );
}
