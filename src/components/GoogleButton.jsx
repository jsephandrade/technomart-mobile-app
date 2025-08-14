import React from 'react';
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GoogleButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Continue with Google"
      className="flex-row items-center justify-center mt-4 rounded-full bg-white py-3 shadow-md"
    >
      <Ionicons name="logo-google" size={20} color="#1E1E1E" />
      <Text className="ml-2 font-semibold text-text">Continue with Google</Text>
    </Pressable>
  );
}