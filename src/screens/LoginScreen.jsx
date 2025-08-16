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
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-center p-6">
        <View className="mb-8">
          <Text className="text-center text-3xl font-bold text-black">TechnoMart</Text>
        </View>
        <View className="gap-4">
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
          <AuthButton title="Log In" onPress={handleLogin} loading={loading} />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="pt-2">
            <Text className="text-center text-blue-600">Create an account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
