import CustomInput from 'components/customInput';
import React from 'react';
import { View, Text, Form } from 'tamagui';
import ButtonCustom from './../../components/ButtonCustom/index';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerSchema from '../../schemas/Register';
import { Pressable } from 'react-native';

export default function Cadastro() {
  const router = useRouter();

  const irParaLogin = () => {
    router.push('../login');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log(data);
    irParaLogin();
  };

  return (
    <View className="flex-1 justify-between items-center bg-[#2c2d33] pt-[24px]">
      <Form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <View className="flex items-center">
          <View style={{ marginBottom: 8 }}>
            <Controller control={control} name="name" render={({ field: { onChange, onBlur, value } }) => <CustomInput titleInput="Nome" placeholder="Insira seu nome" onChangeText={onChange} onBlur={onBlur} value={value} />} />
            {errors.name && <Text style={{ color: 'red', marginBottom: 16 }}>{errors.name.message}</Text>}

            <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => <CustomInput titleInput="E-mail" placeholder="Insira seu E-mail" onChangeText={onChange} onBlur={onBlur} value={value} />} />
            {errors.email && <Text style={{ color: 'red', marginBottom: 16 }}>{errors.email.message}</Text>}

            <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => <CustomInput titleInput="Senha" placeholder="Insira sua senha" secureTextEntry onChangeText={onChange} onBlur={onBlur} value={value} />} />
            {errors.password && <Text style={{ color: 'red', marginBottom: 16, marginTop: 0 }}>{errors.password.message}</Text>}

            <Controller control={control} name="confirmPassword" render={({ field: { onChange, onBlur, value } }) => <CustomInput titleInput="Confirmação senha" placeholder="Insira novamente sua senha" secureTextEntry onChangeText={onChange} onBlur={onBlur} value={value} />} />
            {errors.confirmPassword && <Text style={{ color: 'red', marginBottom: 16 }}>{errors.confirmPassword.message}</Text>}
          </View>
        </View>
      </Form>

      <View>
        <View className="items-center">
          <View className="flex-row items-center">
            <Text className="text-[#fff] font-bold">Lembra sua senha? </Text>
            <Pressable onPress={irParaLogin} className="py-6">
              <Text className="text-[#fff] font-thin underline">Faça login</Text>
            </Pressable>
          </View>
        </View>
        <ButtonCustom texto="Continuar com o Google" />
        <ButtonCustom onPress={handleSubmit(onSubmit)} texto="Continuar" />
      </View>
    </View>
  );
}
