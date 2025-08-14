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
import { loginSchema } from '../utils/validation';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      Alert.alert('Logged in with Google!');
    }
  }, [response]);

  const handleSubmit = async () => {
    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
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
          <Text className="text-4xl font-bold text-text">Welcome Back</Text>
          <Text className="mt-1 text-base text-sub">Sign in to continue</Text>
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
          <Pressable
            onPress={handleSubmit}
            accessibilityRole="button"
            accessibilityLabel="Log in"
            className="items-center rounded-full bg-peach-400 py-3 mt-6 shadow-md"
            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
          >
            <Text className="font-semibold text-white">Log In</Text>
          </Pressable>
          <GoogleButton onPress={() => promptAsync()} />
          <Pressable
            className="mt-3"
            onPress={() => {}}
            accessibilityRole="link"
            accessibilityLabel="Forgot password"
          >
            <Text className="text-center text-peach-400 underline">Forgot password?</Text>
          </Pressable>
        </AuthCard>
        <View className="mt-6 flex-row justify-center">
          <Text className="text-sub">Don’t have an account? </Text>
          <Pressable
            onPress={() => navigation.navigate('SignUp')}
            accessibilityRole="link"
            accessibilityLabel="Sign Up"
          >
            <Text className="font-bold text-peach-400 underline">Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}