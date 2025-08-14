import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TextField({ label, iconName, placeholder, value, onChangeText, keyboardType='default', error }) {
  return (
    <View className="mb-4">
      <Text className="text-text font-semibold mb-2">{label}</Text>
      <View className="flex-row items-center bg-peach-200 rounded-2xl px-4 py-3">
        {iconName && <Ionicons name={iconName} size={20} className="text-sub mr-2" />}
        <TextInput
          className="flex-1 text-text"
          placeholder={placeholder}
          placeholderTextColor="#1E1E1E70"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
      </View>
      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  );
}
