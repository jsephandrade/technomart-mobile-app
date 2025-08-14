import React from 'react';
import { View } from 'react-native';

export default function AuthCard({ children }) {
  return (
    <View className="rounded-3xl p-8 mx-6 mt-6 bg-white/80 shadow-lg border border-peach-200">
      {children}
    </View>
  );
}
