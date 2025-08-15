import React from 'react';
import { View } from 'react-native';

export default function AuthCard({ children }) {
  return (
    <View
      className="mx-6 mt-6 rounded-3xl border border-peach-100 p-8"
      style={{
        backgroundColor: 'rgba(255,255,255,0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      {children}
    </View>
  );
}
