import React from 'react';
import { Pressable, Text } from 'react-native';

export default function PrimaryButton({ title, onPress, className = '' }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      className={`items-center rounded-xl bg-peach-400 py-3 shadow-md ${className}`}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      <Text className="font-semibold text-white">{title}</Text>
    </Pressable>
  );
}
