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
      <Text className="mb-2 font-semibold text-text">{label}</Text>
      <View className="flex-row items-center rounded-2xl bg-peach-200 px-4 py-3">
        {iconName ? <Ionicons name={iconName} size={20} color="#5F5F5F" /> : null}
        <TextInput
          className={`flex-1 text-text ${iconName ? 'ml-3' : ''}`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(30,30,30,0.7)"
          keyboardType={keyboardType}
          autoCapitalize="none"
          {...rest}
        />
      </View>
      {error ? <Text className="mt-1 text-sm text-red-500">{error}</Text> : null}
    </View>
  );
}
