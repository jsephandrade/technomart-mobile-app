import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordField({ label, placeholder, value, onChangeText, error }) {
  const [secure, setSecure] = useState(true);
  return (
    <View className="mb-4">
      <Text className="text-text font-semibold mb-2">{label}</Text>
      <View className="flex-row items-center bg-peach-200 rounded-2xl px-4 py-3">
        <Ionicons name="lock-closed-outline" size={20} className="text-sub mr-2" />
        <TextInput
          className="flex-1 text-text"
          placeholder={placeholder}
          placeholderTextColor="#1E1E1E70"
          secureTextEntry={secure}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
        <Pressable onPress={() => setSecure(!secure)} accessibilityLabel={secure ? 'Show password' : 'Hide password'}>
          <Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={20} className="text-sub" />
        </Pressable>
      </View>
      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  );
}
