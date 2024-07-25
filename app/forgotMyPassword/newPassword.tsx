import { View, Text, Form, Input, Image, Button, Separator } from 'tamagui';
import imageOne from '../../assets/images/login/icon-01.png';
import { Pressable, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../schemas/Login';
import ButtonCustom from 'components/ButtonCustom';
import { useRouter } from 'expo-router';
import CustomInput from './../../components/customInput/index';

export default function newPassword() {
  const router = useRouter();

  const irParaLogin = () => {
    router.push('../login');
  };

  const irParaIntroducao = () => {
    router.push('../introduction');
  };

  return (
    <View className="flex-1 justify-between items-center h-full bg-[#2c2d33] pt-6">
      <View>
        <CustomInput titleInput="Nova senha" subtitleInput="Digite uma nova senha abaixo." placeholder="Insira sua nova senha" />
        <CustomInput placeholder="Insira novamente sua nova senha" />
      </View>

      <View className="items-center">
        <View className="flex-row items-center">
          <Text className="text-[#fff] font-bold">Lembra sua senha? {' '}</Text>
          <Pressable onPress={irParaLogin} className="py-6">
            <Text className="text-[#fff] font-thin underline">Faça login</Text>
          </Pressable>
        </View>
        <ButtonCustom onPress={irParaIntroducao} texto="Continuar" />
      </View>
    </View>
  );
}
