import React, { useState } from 'react';
import { View, Checkbox, Text } from 'tamagui';
import { useForm } from 'react-hook-form';
import InputCustom from 'components/InputCustom';
import { CheckboxWithLabel } from 'components/Checkbox';
import ButtonCustom from './../../components/ButtonCustom/index';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Cadastro() {
  const router = useRouter();

  const irParaLogin = () => {
    router.push('../login');
  };

  return (
    <View className="flex-1 justify-between items-center bg-[#2c2d33]">
      <View>
        <InputCustom textoTitulo="Nome" placeholder="insira seu nome" />
        <InputCustom textoTitulo="E-mail" placeholder="insira seu e-mail" />
        <InputCustom textoTitulo="Senha" secureTextEntry placeholder="Insira sua senha" />
        <InputCustom textoTitulo="Confirme sua senha" secureTextEntry placeholder="Insira novamente sua senha" />
        <CheckboxWithLabel label="Aceito os termos de uso" size="$3" />
      </View>

      <View className='items-center'>
        <View className="flex-row items-center">
          <Text className="text-[#fff] font-bold">Já tem uma conta?</Text>
          <Text>{' '}</Text>
          <Pressable onPress={irParaLogin} className="py-6">
            <Text className="text-[#fff] font-thin underline">Faça login</Text>
          </Pressable>
        </View>
        <ButtonCustom texto="Continuar" />
      </View>
    </View>
  );
}
