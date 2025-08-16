import React from 'react';
import { TextInput } from 'react-native';

export default function AuthInput({ className = '', ...props }) {
  return (
    <TextInput className={`rounded border border-gray-300 p-3 ${className}`.trim()} {...props} />
  );
}
