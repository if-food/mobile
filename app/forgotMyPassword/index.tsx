import { View, Text, Form } from 'tamagui';
import imageOne from '../../assets/images/login/icon-01.png';
import { Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../schemas/Login';
import ButtonCustom from 'components/ButtonCustom';
import { ChevronRight } from 'lucide-react-native';
import InputCustom from 'components/InputCustom';

import { useRouter } from 'expo-router';

export default function forgotMyPassword() {
  const router = useRouter();

  const irParaLogin = () => {
    router.push('../login');
  };
  
  const irParaNovaSenha = () => {
    router.push('./newPassword');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View className="flex-1 justify-between items-center h-full bg-[#2c2d33] pt-6">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <View>
          <Text className="text-[24px] font-bold text-[#fff]">Esqueceu sua senha?</Text>
          <InputCustom textoSubtitulo='Insira seu E-mail' placeholder='Insira seu e-mail' />
        </View>
      </Form>

      <View className="items-center">
        <View className="flex-row items-center justify-center">
          <Text className="text-[#fff] font-bold">Lembra sua senha?</Text>
          <Text> </Text>
          <Pressable onPress={irParaLogin} className="py-6">
            <Text className="text-[#fff] font-thin underline">Faça login</Text>
          </Pressable>
        </View>
        <ButtonCustom onPress={irParaNovaSenha} icon={ChevronRight} texto="Continuar" />
      </View>
    </View>
  );
}
