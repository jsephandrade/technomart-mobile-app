import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import AuthLayout from '../components/AuthLayout';
import { register } from '../utils/auth';

/**
 * A sign‑up screen inspired by the new design mockup.
 *
 * This screen follows the same warm colour palette and decorative background
 * elements as the login screen. Input fields include icons for clarity and
 * password fields allow toggling visibility. At the bottom a link back to the
 * login screen encourages existing users to switch contexts easily.
 */
export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    // basic validation for sign up inputs; show inline errors instead of alerts
    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      setErrorMessage('Please fill out all fields');
      return;
    }
    if (password !== confirm) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setErrorMessage('');
    setLoading(true);
    try {
      const id = await register(name, email, password);
      Alert.alert('Account created', `User ID: ${id}`, [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
      setName('');
      setEmail('');
      setPassword('');
      setConfirm('');
    } catch (err) {
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
        {/* Header with logo and title */}
        <View className="mt-20 w-full items-start">
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
            accessibilityLabel="TechnoMart logo"
          />
          <Text className="mt-2 text-3xl font-extrabold text-peach-500">
            Join TechnoMart
          </Text>
          <Text className="mt-1 text-lg text-sub">Create your account</Text>
        </View>
        {/* Form fields */}
        <View className="w-full mt-auto pb-16">
          <View className="rounded-xl bg-[#f5f5f5] p-6 space-y-3">
            <View>
              <Text className="mb-1 text-sub">Name</Text>
              <View className="flex-row items-center rounded-xl bg-peach-100 px-4 py-2.5">
                <Feather name="user" size={20} color="#F07F13" />
                <TextInput
                  className="ml-4 flex-1 text-base text-text"
                  placeholder="Enter Name"
                  placeholderTextColor="#BF7642"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>
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
            <View>
              <Text className="mb-1 text-sub">Confirm Password</Text>
              <View className="flex-row items-center rounded-xl bg-peach-100 px-4 py-2.5">
                <Feather name="lock" size={20} color="#F07F13" />
                <TextInput
                  className="ml-4 flex-1 text-base text-text"
                  placeholder="Confirm Password"
                  placeholderTextColor="#BF7642"
                  value={confirm}
                  onChangeText={setConfirm}
                  secureTextEntry={!showConfirm}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirm((prev) => !prev)}
                >
                  <Feather
                    name={showConfirm ? 'eye-off' : 'eye'}
                    size={20}
                    color="#F07F13"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              disabled={loading}
              onPress={handleRegister}
              className="rounded-xl bg-peach-500 py-3"
            >
              <Text className="text-center text-lg font-semibold text-white">
                {loading ? 'Loading...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
            {/* Inline error message */}
            {errorMessage ? (
              <Text className="pt-1 text-sm text-red-500">{errorMessage}</Text>
            ) : null}
          </View>
        </View>
        {/* Link back to login */}
        <View className="mt-4 flex-row justify-center">
          <Text className="text-sub">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="font-semibold text-peach-500">Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
}
