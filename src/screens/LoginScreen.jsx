import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import AuthLayout from '../components/AuthLayout';
import { signIn } from '../utils/auth';

/**
 * A login screen inspired by the new design mockup.
 *
 * The screen uses a warm peach colour palette from the Tailwind config and
 * incorporates subtle food icons in the background for visual interest. Each
 * input field includes an accompanying icon to help users quickly identify
 * which information is required. Password visibility can be toggled via an
 * eye icon. A link to the sign‑up screen and a “forgot password?” link are
 * included for convenience.
 */
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const token = await signIn(email, password);
      Alert.alert('Welcome', `Token: ${token}`);
      setEmail('');
      setPassword('');
    } catch (err) {
      Alert.alert('Login failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <View className="flex-1 items-center px-6 relative">
        {/* Decorative icons in the background */}
        <MaterialCommunityIcons
          name="pizza"
          size={96}
          color="#FFC999"
          style={{ position: 'absolute', top: 40, left: 20, opacity: 0.15 }}
        />
        <MaterialCommunityIcons
          name="french-fries"
          size={96}
          color="#FFC999"
          style={{ position: 'absolute', top: 120, right: 20, opacity: 0.15 }}
        />
        <MaterialCommunityIcons
          name="cup"
          size={96}
          color="#FFC999"
          style={{ position: 'absolute', top: 220, left: 80, opacity: 0.15 }}
        />
        {/* Header with logo and greeting */}
        <View className="mt-24 items-center">
          <MaterialCommunityIcons
            name="storefront-outline"
            size={64}
            color="#F07F13"
          />
          <Text className="mt-2 text-4xl font-extrabold text-peach-500">
            TechnoMart
          </Text>
          <Text className="mt-1 text-lg text-sub">Hello. Welcome back</Text>
        </View>
        {/* Form fields */}
        <View className="w-full mt-20 space-y-4">
          <View className="flex-row items-center rounded-xl bg-peach-100 px-4 py-3">
            <Feather name="mail" size={20} color="#F07F13" />
            <TextInput
              className="ml-4 flex-1 text-base text-text"
              placeholder="Enter Email"
              placeholderTextColor="#BF7642"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View className="flex-row items-center rounded-xl bg-peach-100 px-4 py-3">
            <Feather name="lock" size={20} color="#F07F13" />
            <TextInput
              className="ml-4 flex-1 text-base text-text"
              placeholder="Enter Password"
              placeholderTextColor="#BF7642"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <Feather
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#F07F13"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={loading}
            onPress={handleLogin}
            className="rounded-xl bg-peach-500 py-3"
          >
            <Text className="text-center text-lg font-semibold text-white">
              {loading ? 'Loading...' : 'Log In'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="self-end">
            <Text className="text-sm text-peach-500">Forgot password?</Text>
          </TouchableOpacity>
        </View>
        {/* Sign up link */}
        <View className="mt-8 flex-row justify-center">
          <Text className="text-sub">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-peach-500">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
}