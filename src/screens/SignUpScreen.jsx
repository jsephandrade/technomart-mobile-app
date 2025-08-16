import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { register } from '../utils/auth';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password || password !== confirm) {
      Alert.alert('Invalid input', 'Please fill all fields and ensure passwords match.');
      return;
    }

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
      Alert.alert('Registration failed', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-center p-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-black">Join TechnoMart</Text>
        </View>
        <View className="gap-4">
          <TextInput
            className="rounded border border-gray-300 p-3"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
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
          <TextInput
            className="rounded border border-gray-300 p-3"
            placeholder="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />
          <TouchableOpacity
            className="mt-2 rounded bg-green-500 p-3"
            onPress={handleRegister}
            disabled={loading}>
            <Text className="text-center font-semibold text-white">
              {loading ? 'Loading...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="pt-2">
            <Text className="text-center text-blue-600">Back to login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
