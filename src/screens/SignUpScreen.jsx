import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthCard from '../components/AuthCard';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import GoogleButton from '../components/GoogleButton';
import { signUpSchema } from '../utils/validation';
import PrimaryButton from '../components/PrimaryButton';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    try {
      await signUpSchema.validate(
        { name, email, password, confirmPassword },
        { abortEarly: false }
      );
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
        className="flex-1 justify-center">
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
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
            iconName="person-outline"
            error={errors.name}
          />
          <TextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            iconName="mail-outline"
            keyboardType="email-address"
            error={errors.email}
          />
          <PasswordField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            error={errors.password}
          />
          <PasswordField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
            accessibilityRole="link"
            accessibilityLabel="Log In">
            <Text className="font-bold text-peach-400 underline">Log In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
