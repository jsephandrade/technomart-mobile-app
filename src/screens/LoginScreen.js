import React, { useState } from 'react';
import { ScrollView, View, Text, Image, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import AuthCard from '../components/AuthCard';
import { loginSchema } from '../utils/validation';

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await loginSchema.validate(form, { abortEarly: false });
      setErrors({});
      Alert.alert('Logged in!');
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <ScrollView className="flex-1 bg-peach-100" contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={['#FFE0C2', '#FFC999']} className="w-full items-center pt-10">
        <Image source={require('../../assets/logo.png')} className="h-24 w-24" resizeMode="contain" />
      </LinearGradient>
      <AuthCard>
        <Text className="text-4xl font-extrabold text-text">Hello.</Text>
        <Text className="text-base text-sub mt-1 mb-5">Welcome back</Text>

        <TextField
          label="Email"
          iconName="mail-outline"
          placeholder="Enter Email"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
          error={errors.email}
        />

        <PasswordField
          label="Password"
          placeholder="Enter Password"
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
          error={errors.password}
        />

        <Pressable
          className="bg-peach-300 rounded-2xl py-3 items-center mt-5"
          onPress={handleSubmit}
          accessibilityLabel="Log in"
        >
          <Text className="text-text font-semibold">Log In</Text>
        </Pressable>

        <Pressable
          className="mt-3"
          onPress={() => Alert.alert('Forgot password tapped')}
          accessibilityRole="button"
          accessibilityLabel="Forgot password"
          accessibilityHint="Resets your password"
        >
          <Text className="text-sub underline text-center">Forgot password?</Text>
        </Pressable>

        <View className="flex-row justify-center mt-6">
          <Text className="text-sub mr-1">Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('SignUp')} accessibilityRole="button" accessibilityLabel="Sign up">
            <Text className="text-text font-semibold underline">Sign Up</Text>
          </Pressable>
        </View>
      </AuthCard>
    </ScrollView>
  );
}
