import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AuthCard from '../components/AuthCard';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import GoogleButton from '../components/GoogleButton';
import { signUpSchema } from '../utils/validation';

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      Alert.alert('Signed up with Google!');
    }
  }, [response]);

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
        className="flex-1 justify-center"
      >
        <View className="items-center mb-6">
          <Image
            source={require('../../assets/logo.png')}
            className="w-40 h-24"
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
          <Pressable
            onPress={handleSubmit}
            accessibilityRole="button"
            accessibilityLabel="Create Account"
            className="items-center rounded-full bg-peach-400 py-3 mt-6 shadow-md"
            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
          >
            <Text className="font-semibold text-white">Create Account</Text>
          </Pressable>
          <GoogleButton onPress={() => promptAsync()} />
        </AuthCard>
        <View className="mt-6 flex-row justify-center">
          <Text className="text-sub">Already have an account? </Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            accessibilityRole="link"
            accessibilityLabel="Log In"
          >
            <Text className="font-bold text-peach-400 underline">Log In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}