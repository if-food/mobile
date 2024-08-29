import CustomInput from 'components/customInput';
import { Form } from 'tamagui';
import ButtonCustom from './../../components/ButtonCustom/index';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registerSchema from '../../schemas/Register';
import { Pressable, View, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function Cadastro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
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
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.post("https://if-delivery-api.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente", {
        nome: data.name,
        email: data.email,
        password: data.password
      });

      if (response.data) {
        console.log('Usuário criado com sucesso');
        console.log(response.data);

        const clienteId = response.data.id;
        console.log(clienteId);

        await AsyncStorage.setItem('clienteId', clienteId.toString());

        handleLogin();
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro:', error.response.data);
        alert(`Erro: ${error.response.data.message || 'Solicitação inválida'}`);
      } else {
        console.error('Erro desconhecido:', error.message);
        alert('Erro desconhecido. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-between items-center bg-[#2c2d33] pt-[32px]">
      <Form onSubmit={handleSubmit(onSubmit)} className="w-full flex-1 justify-between">
        <View className="flex items-center justify-between">
          <View className="h-[400px]">
            <Controller control={control} name="name" render={({ field: { onChange, onBlur, value } }) => <CustomInput titleInput="Nome" placeholder="Insira seu nome" onChangeText={onChange} onBlur={onBlur} value={value} />} />
            {errors.name && <Text className="text-[#f00] leading-4 py-1">{errors.name.message}</Text>}

            <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => <CustomInput titleInput="E-mail" placeholder="Insira seu E-mail" onChangeText={onChange} onBlur={onBlur} value={value} />} />
            {errors.email && <Text className="text-[#f00] leading-4 py-1">{errors.email.message}</Text>}

            <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => <CustomInput titleInput="Senha" placeholder="Insira sua senha" secureTextEntry onChangeText={onChange} onBlur={onBlur} value={value} />} />
            {errors.password && <Text className="text-[#f00] leading-4 py-1">{errors.password.message}</Text>}

            <Controller control={control} name="confirmPassword" render={({ field: { onChange, onBlur, value } }) => <CustomInput titleInput="Confirmação senha" placeholder="Insira novamente sua senha" secureTextEntry onChangeText={onChange} onBlur={onBlur} value={value} />} />
            {errors.confirmPassword && <Text className="text-[#f00] leading-4 py-1">{errors.confirmPassword.message}</Text>}
          </View>
        </View>

        <View className="items-center">
          <View className="flex-row items-center gap-1">
            <Text className="text-[#fff] font-bold">Lembra sua senha?</Text>
            <Pressable onPress={handleLogin} className="py-6">
              <Text className="text-[#fff] font-thin underline">Faça login</Text>
            </Pressable>
          </View>
          <ButtonCustom texto="Continuar com o Google" />
          <ButtonCustom 
            onPress={handleSubmit(onSubmit)} 
            texto="Continuar" 
            loading={loading}
          />
        </View>
      </Form>
    </View>
  );
}
