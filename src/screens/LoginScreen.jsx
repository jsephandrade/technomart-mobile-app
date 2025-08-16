import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    // Validate input locally and display inline errors rather than alerts
    if (!email.trim() || !password.trim()) {
      if (!email.trim() && !password.trim()) {
        setErrorMessage('Please enter email and password');
      } else if (!email.trim()) {
        setErrorMessage('Please enter your email');
      } else {
        setErrorMessage('Please enter your password');
      }
      return;
    }
    // clear any existing error message
    setErrorMessage('');
    setLoading(true);
    try {
      const token = await signIn(email, password);
      // On success we can still welcome the user via an alert
      Alert.alert('Welcome', `Token: ${token}`);
      setEmail('');
      setPassword('');
    } catch (err) {
      // Display API errors inline
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <View className="flex-1 px-6 relative">
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
        <View className="mt-20 w-full items-start">
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
            accessibilityLabel="TechnoMart logo"
          />
          <Text className="mt-2 text-2xl font-bold text-sub">Hello!</Text>
          <Text className="text-xl font-semibold text-sub">Get Started!</Text>
        </View>
        {/* Form fields */}
        <View className="w-full mt-auto pb-16">
          <View className="rounded-xl bg-[#f5f5f5] p-6 space-y-3">
            <View>
              <Text className="mb-1 text-sub">Email</Text>
              <View className="flex-row items-center rounded-xl bg-peach-100 px-4 py-2.5">
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
            </View>
            <View>
              <Text className="mb-1 text-sub">Password</Text>
              <View className="flex-row items-center rounded-xl bg-peach-100 px-4 py-2.5">
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
            </View>
            <TouchableOpacity
              disabled={loading}
              onPress={handleLogin}
              className="rounded-xl bg-peach-500 py-3"
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
          {/* Inline error message */}
          {errorMessage ? (
            <Text className="pt-1 text-sm text-red-500">{errorMessage}</Text>
          ) : null}
        </View>
        {/* Sign up link */}
        <View className="mt-4 flex-row justify-center">
          <Text className="text-sub">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-peach-500">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
}