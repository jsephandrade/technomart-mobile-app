import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      await signUpSchema.validate(
        { name, email, password, confirmPassword },
        { abortEarly: false }
      );
      setErrors({});
    } catch (err) {
      const formErrors = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          formErrors[e.path] = e.message;
        });
      }
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      Alert.alert('Account created!', `ID: ${data.id}`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      Alert.alert('Registration failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-peach-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View className="mb-6 items-center">
            <Image
              source={require('../../assets/logo.png')}
              className="h-24 w-40"
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
              editable={!loading}
            />
            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email"
              iconName="mail-outline"
              keyboardType="email-address"
              error={errors.email}
              editable={!loading}
            />
            <PasswordField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
              error={errors.password}
              editable={!loading}
            />
            <PasswordField
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              error={errors.confirmPassword}
              editable={!loading}
            />
            <PrimaryButton
              title="Create Account"
              onPress={handleSubmit}
              accessibilityLabel="Create account"
              className="mt-6"
              loading={loading}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
