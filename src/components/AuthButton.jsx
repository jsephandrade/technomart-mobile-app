import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function AuthButton({ title, onPress, loading, className = 'bg-blue-500' }) {
  return (
    <TouchableOpacity
      className={`mt-2 rounded p-3 ${className}`.trim()}
      onPress={onPress}
      disabled={loading}>
      <Text className="text-center font-semibold text-white">{loading ? 'Loading...' : title}</Text>
    </TouchableOpacity>
  );
}
