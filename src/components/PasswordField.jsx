import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  ...rest
}) {
  const [secure, setSecure] = useState(true);
  const [focused, setFocused] = useState(false);

  return (
    <View className="mt-4">
      <Text className="mb-2 font-semibold text-text">{label}</Text>
      <View
        className={`flex-row items-center rounded-full px-4 py-3 ${
          focused ? 'bg-cream border-2 border-peach-400 shadow-sm' : 'bg-peach-200'
        }`}
      >
        <Ionicons name="lock-closed-outline" size={20} color="#5F5F5F" />
        <TextInput
          className="ml-3 flex-1 text-text"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(30,30,30,0.7)"
          secureTextEntry={secure}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
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
      {error ? <Text className="mt-1 text-sm text-red-500">{error}</Text> : null}
    </View>
  );
}
