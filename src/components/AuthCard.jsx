import React from 'react';
import { View } from 'react-native';

export default function AuthCard({ children }) {
  return (
    <View className="mx-6 mt-6 rounded-2xl border border-peach-200 bg-white p-8 shadow-md">
      {children}
    </View>
  );
}
