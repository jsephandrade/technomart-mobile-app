import React, { useState } from 'react';
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
import AuthCard from '../components/AuthCard';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import { signUpSchema } from '../utils/validation';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

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
        className="flex-1"
      >
        <View className="items-center mt-6">
          <Image
            source={require('../../assets/logo.png')}
            className="w-40 h-24"
            resizeMode="contain"
          />
        </View>
        <AuthCard>
          <Text className="text-4xl font-extrabold text-text">Create Account</Text>
          <Text className="text-base text-sub mt-1">Sign up to get started</Text>
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
            className="rounded-full py-3 items-center mt-6 shadow-md"
            style={({ pressed }) => ({ backgroundColor: pressed ? '#FF9833' : '#FFB066' })}
          >
            <Text className="text-text font-semibold">Create Account</Text>
          </Pressable>
        </AuthCard>
        <View className="flex-row justify-center mt-6">
          <Text className="text-sub">Already have an account? </Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            accessibilityRole="link"
            accessibilityLabel="Log In"
          >
            <Text className="text-peach-400 font-bold underline">Log In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
