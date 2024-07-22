import { Ionicons } from '@expo/vector-icons'; // Importe o ícone que você deseja usar, por exemplo, Ionicons
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input, View } from 'tamagui';


const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleMostrarSenha = () => {
    setMostrarSenha((prev) => !prev);
  };

  return (
    <View style={{ position: 'relative', width: '100%' }}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!mostrarSenha ? secureTextEntry : false}
        style={{
          height: 56,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 40,
        }}
      />
      <TouchableOpacity
        style={{ position: 'absolute', right: 10, top: 12 }}
        onPress={toggleMostrarSenha}
      >
        <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomInput;