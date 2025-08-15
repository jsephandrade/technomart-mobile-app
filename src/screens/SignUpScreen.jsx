import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthCard from '../components/AuthCard';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import GoogleButton from '../components/GoogleButton';
import { signUpSchema } from '../utils/validation';
import PrimaryButton from '../components/PrimaryButton';

export default function SignUpScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value.trim() }));
  };

  const handleSubmit = async () => {
    try {
      await signUpSchema.validate(form, { abortEarly: false });
      setErrors({});
      Alert.alert('Account created!');
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
            <Text className="text-4xl font-bold text-text">Create Account</Text>
            <Text className="mt-1 text-base text-sub">Join us to get started</Text>
            <TextField
              label="Name"
              value={form.name}
              onChangeText={(text) => handleFieldChange('name', text)}
              placeholder="Enter Name"
              iconName="person-outline"
              error={errors.name}
            />
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
            <PasswordField
              label="Confirm Password"
              value={form.confirmPassword}
              onChangeText={(text) => handleFieldChange('confirmPassword', text)}
              placeholder="Confirm Password"
              error={errors.confirmPassword}
            />
            <PrimaryButton
              title="Create Account"
              onPress={handleSubmit}
              accessibilityLabel="Create account"
              className="mt-6"
            />
            <GoogleButton onPress={() => Alert.alert('Google sign-in is not available yet')} />
          </AuthCard>
          <View className="mt-6 flex-row justify-center">
            <Text className="text-sub">Already have an account? </Text>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              hitSlop={8}
              accessibilityRole="link"
              accessibilityLabel="Log In">
              <Text className="font-bold text-peach-400 underline">Log In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
