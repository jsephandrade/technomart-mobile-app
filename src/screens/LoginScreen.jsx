import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthCard from '../components/AuthCard';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import GoogleButton from '../components/GoogleButton';
import { loginSchema } from '../utils/validation';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value.trim() }));
  };

  const handleSubmit = async () => {
    try {
      await loginSchema.validate(form, { abortEarly: false });
      setErrors({});
      Alert.alert('Logged in!');
    } catch (err) {
      const formErrors = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          formErrors[e.path] = e.message;
        });
      }
      setErrors(formErrors);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-peach-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View className="mb-6 items-center">
            <Image
              source={require('../../assets/logo.png')}
              className="h-32 w-56"
              resizeMode="contain"
            />
          </View>
          <AuthCard>
            <Text className="text-4xl font-bold text-text">Hello</Text>
            <Text className="mt-1 text-base text-sub">Sign in to continue</Text>
            <TextField
              label="Email"
              value={form.email}
              onChangeText={(text) => handleFieldChange('email', text)}
              placeholder="Enter Email"
              iconName="mail-outline"
              keyboardType="email-address"
              error={errors.email}
            />
            <PasswordField
              label="Password"
              value={form.password}
              onChangeText={(text) => handleFieldChange('password', text)}
              placeholder="Enter Password"
              error={errors.password}
            />
            <PrimaryButton
              title="Log In"
              onPress={handleSubmit}
              accessibilityLabel="Log in"
              className="mt-6"
            />
            <GoogleButton onPress={() => Alert.alert('Google sign-in is not available yet')} />
            <Pressable
              className="mt-3"
              hitSlop={8}
              onPress={() =>
                Alert.alert(
                  'Forgot password',
                  'Password reset functionality is coming soon.'
                )
              }
              accessibilityRole="link"
              accessibilityLabel="Forgot password">
              <Text className="text-center text-peach-400 underline">Forgot password?</Text>
            </Pressable>
          </AuthCard>
          <View className="mt-6 flex-row justify-center">
            <Text className="text-sub">Don't have an account? </Text>
            <Pressable
              onPress={() => navigation.navigate('SignUp')}
              hitSlop={8}
              accessibilityRole="link"
              accessibilityLabel="Sign Up">
              <Text className="font-bold text-peach-400 underline">Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
