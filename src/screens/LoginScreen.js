import React, { useState } from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import AuthCard from '../components/AuthCard';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import { loginSchema } from '../utils/validation';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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
    <View className="flex-1 bg-peach-100">
      <View className="items-center mt-10">
        <Image
          source={require('../../assets/logo.png')}
          className="w-40 h-24"
          resizeMode="contain"
        />
      </View>
      <AuthCard>
        <Text className="text-4xl font-extrabold text-text">Hello.</Text>
        <Text className="text-base text-sub mt-1">Welcome back</Text>
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
          className="bg-peach-300 rounded-2xl py-3 items-center mt-5"
          onPress={handleSubmit}
          accessibilityRole="button"
          accessibilityLabel="Log in"
        >
          <Text className="text-text font-semibold">Log In</Text>
        </Pressable>
        <Pressable
          className="mt-3"
          onPress={() => {}}
          accessibilityRole="link"
          accessibilityLabel="Forgot password"
        >
          <Text className="text-sub underline text-center">Forgot password?</Text>
        </Pressable>
      </AuthCard>
      <View className="flex-row justify-center mt-6">
        <Text className="text-sub">Don’t have an account? </Text>
        <Pressable
          onPress={() => navigation.navigate('SignUp')}
          accessibilityRole="link"
          accessibilityLabel="Sign Up"
        >
          <Text className="text-sub font-bold underline">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
