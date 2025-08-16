import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
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
        { text: 'OK', onPress: () => navigation.navigate('Login') },
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
          <Text className="text-center text-3xl font-bold text-black">Join TechnoMart</Text>
        </View>
        <View className="gap-4">
          <AuthInput placeholder="Name" value={name} onChangeText={setName} />
          <AuthInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <AuthInput
            placeholder="Confirm Password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />
          <AuthButton
            title="Sign Up"
            onPress={handleRegister}
            loading={loading}
            className="bg-green-500"
          />
          <TouchableOpacity onPress={() => navigation.navigate('Login')} className="pt-2">
            <Text className="text-center text-blue-600">Back to login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
