import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordField({
  label,
  value,
  onChangeText,
  placeholder,
  error
}) {
  const [secure, setSecure] = useState(true);
  return (
    <View className="mt-4">
      <Text className="text-text font-semibold mb-2">{label}</Text>
      <View className="flex-row items-center bg-peach-200 rounded-2xl px-4 py-3">
        <Ionicons name="lock-closed-outline" size={20} color="#5F5F5F" />
        <TextInput
          className="flex-1 ml-3 text-text"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(30,30,30,0.7)"
          secureTextEntry={secure}
          autoCapitalize="none"
        />
        <Pressable
          onPress={() => setSecure(!secure)}
          accessibilityRole="button"
          accessibilityLabel={secure ? 'Show password' : 'Hide password'}
        >
          <Ionicons
            name={secure ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#5F5F5F"
          />
        </Pressable>
      </View>
      {error ? <Text className="text-red-500 text-sm mt-1">{error}</Text> : null}
    </View>
  );
}
