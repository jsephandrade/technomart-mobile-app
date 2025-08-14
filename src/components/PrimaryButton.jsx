import React from 'react';
import { Pressable, Text } from 'react-native';

export default function PrimaryButton({ title, onPress, accessibilityLabel, className = '', ...rest }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      className={`w-full items-center rounded-full bg-peach-400 py-4 shadow-lg ${className}`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      })}
      {...rest}
    >
      <Text className="font-semibold text-white">{title}</Text>
    </Pressable>
  );
}
