import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, Image,
  KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'; // ← ADDED Ionicons for Apple icon
import AuthLayout from '../components/AuthLayout';
import { signIn } from '../utils/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const insets = useSafeAreaInsets?.() || { top: 0, bottom: 0 };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      if (!email.trim() && !password.trim()) setErrorMessage('Please enter email and password');
      else if (!email.trim()) setErrorMessage('Please enter your email');
      else setErrorMessage('Please enter your password');
      return;
    }
    setErrorMessage('');
    setLoading(true);
    try {
      const token = await signIn(email, password);
      Alert.alert('Welcome', `Token: ${token}`);
      setEmail('');
      setPassword('');
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: insets.top, android: 0 })}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingHorizontal: 24,
              paddingBottom: 10,          // keep only ~10px gap above keyboard
              justifyContent: 'center',   // ← CENTER the whole stack vertically like the mock
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 relative">
              {/* (optional) Decorative icons */}
              <MaterialCommunityIcons name="pizza" size={96} color="#FFC999"
                style={{ position: 'absolute', top: 40, left: 20, opacity: 0.15 }} />
              <MaterialCommunityIcons name="french-fries" size={96} color="#FFC999"
                style={{ position: 'absolute', top: 120, right: 20, opacity: 0.15 }} />
              <MaterialCommunityIcons name="cup" size={96} color="#FFC999"
                style={{ position: 'absolute', top: 220, left: 80, opacity: 0.15 }} />

              {/* Centered logo */}
              <View className="pt-10 mt-20 w-full items-center mb-4">{/* reduced spacing so layout stays tight */}
                <Image
                  source={require('../../assets/logo.png')}
                  style={{ width: 120, height: 120 }}
                  resizeMode="contain"
                />
              </View>

              {/* CARD (dirty white) — matches the structure of your screenshot */}
              <View className="mt-10 w-full rounded-2xl bg-[#f5f5f5] p-6">
                {/* Title inside the card */}
                <Text className="text-2xl font-bold text-sub">Log in to your account</Text>

                {/* Email */}
                <Text className="mt-5 mb-1 text-sub text-sm">Your Email</Text>
                <View className="flex-row items-center rounded-lg bg-white px-3 py-2 border border-gray-200">
                  <Feather name="mail" size={18} color="#F07F13" /> {/* smaller icon */}
                  <TextInput
                    className="ml-2 flex-1 text-sm text-text" // smaller text
                    placeholder="Enter your email"
                    placeholderTextColor="#A3A3A3"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                </View>

                {/* Password */}
                <Text className="mt-3 mb-1 text-sub text-sm">Password</Text>
                <View
                  className={`flex-row items-center rounded-lg px-3 py-2 border ${errorMessage ? 'border-red-400 bg-white' : 'border-gray-200 bg-white'
                    }`}
                >
                  <Feather name="lock" size={18} color="#F07F13" /> {/* smaller icon */}
                  <TextInput
                    className="ml-2 flex-1 text-sm text-text"
                    placeholder="Enter your password"
                    placeholderTextColor="#A3A3A3"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    returnKeyType="done"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
                    <Feather name={showPassword ? 'eye' : 'eye-off'} size={18} color="#A3A3A3" />
                  </TouchableOpacity>
                </View>

                {/* Error (left) + Forgot password (right) — same row like the mock */}
                <View className="mt-2 flex-row items-center justify-between">
                  <Text className="text-xs text-red-500">
                    {errorMessage ? errorMessage : ' '}{/* reserve line height even if no error */}
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-sm text-peach-500">Forgot password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Primary button */}
                <TouchableOpacity
                  disabled={loading}
                  onPress={handleLogin}
                  className="mt-2 rounded-xl bg-peach-500 py-3"
                >
                  <Text className="text-center text-lg font-semibold text-white">
                    {loading ? 'Loading...' : 'Continue'}
                  </Text>
                </TouchableOpacity>

                {/* Divider with "Or" */}
                <View className="my-5 flex-row items-center">
                  <View className="flex-1 h-[1px] bg-gray-300" />
                  <Text className="mx-3 text-gray-400">Or</Text>
                  <View className="flex-1 h-[1px] bg-gray-300" />
                </View>

                {/* Social buttons */}
                <TouchableOpacity
                  className="flex-row items-center justify-center rounded-xl bg-white py-3 border border-gray-200"
                  onPress={() => Alert.alert('Google login', 'Stub')}
                >
                  <MaterialCommunityIcons name="google" size={20} color="#DB4437" />
                  <Text className="ml-8 text-base">Login with Google</Text>
                </TouchableOpacity>

                {/* Footer sign up
                <View className="mt-6 flex-row justify-center">
                  <Text className="text-gray-500">Don&apos;t have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text className="font-semibold text-peach-500">Sign up</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}

