import React, { useState } from 'react';
import { ScrollView, View, Text, Image, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import AuthCard from '../components/AuthCard';
import { signUpSchema } from '../utils/validation';

export default function SignUpScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = async () => {
    try {
      await signUpSchema.validate(form, { abortEarly: false });
      setErrors({});
      Alert.alert('Account created!');
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
        <Text className="text-4xl font-extrabold text-text">Sign Up</Text>
        <Text className="text-base text-sub mt-1 mb-5">Create your account</Text>

        <TextField
          label="Name"
          iconName="person-outline"
          placeholder="Enter Name"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
          error={errors.name}
        />

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

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          error={errors.confirmPassword}
        />

        <Pressable
          className="bg-peach-300 rounded-2xl py-3 items-center mt-5"
          onPress={handleSubmit}
          accessibilityLabel="Create account"
        >
          <Text className="text-text font-semibold">Create Account</Text>
        </Pressable>

        <View className="flex-row justify-center mt-6">
          <Text className="text-sub mr-1">Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')} accessibilityRole="button" accessibilityLabel="Log in">
            <Text className="text-text font-semibold underline">Log In</Text>
          </Pressable>
        </View>
      </AuthCard>
    </ScrollView>
  );
}
