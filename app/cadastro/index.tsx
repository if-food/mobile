import CustomInput from 'components/customInput';
import React, { useState } from 'react';
import { View, Text, Form, Input, Image, Button } from 'tamagui';
import ButtonCustom from './../../components/ButtonCustom/index';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function Cadastro() {

  const router = useRouter();

  const irParaLogin = () => {
    router.push('../login');
  };


  return (
    <View className="flex-1 justify-between items-center bg-[#2c2d33] pt-[24px]">
      <View>
        <CustomInput titleInput="Nome" placeholder="Insira seu nome" />
        <CustomInput titleInput="E-mail" placeholder="Insira seu E-mail" />
        <CustomInput titleInput="Senha" placeholder="Insira sua senha" secureTextEntry />
        <CustomInput titleInput="Confirmação senha" placeholder="Insira novamente sua senha" secureTextEntry />
      </View>

      <View className="items-center">
        <View className="flex-row items-center">
          <Text className="text-[#fff] font-bold">Lembra sua senha? {' '}</Text>
          
          <Pressable onPress={irParaLogin} className="py-6">
            <Text className="text-[#fff] font-thin underline">Faça login</Text>
          </Pressable>
        </View>
        <ButtonCustom texto="Continuar com o Google" />
        <ButtonCustom texto="Continuar" />
      </View>
    </View>
  );
}
