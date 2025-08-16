import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

export default function AuthLayout({ children }) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-center p-6">
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
