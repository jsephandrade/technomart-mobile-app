import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  iconName,
  keyboardType = 'default',
  error,
  ...rest
}) {
  return (
    <View className="mt-4">
      <Text className="text-text font-semibold mb-2">{label}</Text>
      <View className="flex-row items-center bg-peach-200 rounded-2xl px-4 py-3">
        {iconName ? <Ionicons name={iconName} size={20} color="#5F5F5F" /> : null}
        <TextInput
          className="flex-1 ml-3 text-text"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(30,30,30,0.7)"
          keyboardType={keyboardType}
          autoCapitalize="none"
          {...rest}
        />
      </View>
      {error ? <Text className="text-red-500 text-sm mt-1">{error}</Text> : null}
    </View>
  );
}
