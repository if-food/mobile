import { Form } from 'tamagui';
import imageOne from '../../assets/images/login/icon-01.png';
import { Pressable, View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../schemas/Login';
import ButtonCustom from 'components/ButtonCustom';
import { ChevronRight } from 'lucide-react-native';
import InputCustom from 'components/InputCustom';

import { useRouter } from 'expo-router';
import CustomInput from './../../components/customInput/index';

export default function forgotMyPassword() {
  const router = useRouter();

  const irParaLogin = () => {
    router.push('../login');
  };

  const irParaNovaSenha = () => {
    router.push('./newPassword');
  };

  return (
    <View className="flex-1 justify-between items-center h-full bg-[#2c2d33] pt-6">
      <CustomInput
        titleInput="Esqueceu sua senha?"
        subtitleInput="Digite o seu E-mail abaixo"
        placeholder="Insira seu E-mail"
      />

      <View className="items-center">
        <View className="flex-row items-center">
          <Text className="text-[#fff] font-bold">Lembra sua senha? </Text>
          <Pressable onPress={irParaLogin} className="py-6">
            <Text className="text-[#fff] font-thin underline">Faça login</Text>
          </Pressable>
        </View>
        <ButtonCustom onPress={irParaNovaSenha} texto="Continuar" />
      </View>
    </View>
  );
}
