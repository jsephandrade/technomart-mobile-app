import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AuthLayout from '../components/AuthLayout';
import { signIn } from '../utils/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      <View className="mb-8">
        <Text className="text-center text-3xl font-bold text-black">TechnoMart</Text>
      </View>
      <View className="gap-4">
        <TextInput
          className="rounded border border-gray-300 p-3"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="rounded border border-gray-300 p-3"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          className="mt-2 rounded bg-blue-500 p-3"
          onPress={handleLogin}
          disabled={loading}>
          <Text className="text-center font-semibold text-white">
            {loading ? 'Loading...' : 'Log In'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="pt-2">
          <Text className="text-center text-blue-600">Create an account</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}
