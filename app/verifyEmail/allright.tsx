import ButtonCustom from 'components/ButtonCustom';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Allright() {
  const router = useRouter();

  const login = () => {
    router.push('../login');
  };

  return (
    <View className="justify-between flex-1 px-10">
      <View />
      <View className="items-center">
        <Image source={require('../../assets/images/verifyEmail_Allright/verify.png')} className="w-[128px] h-[128px]" />
        <Text className="text-[40px] text-[#fff] font-bold pt-[16px]">Tudo certo!</Text>
        <Text className="text-[16px] text-[#fff]">Prossiga com seu login!</Text>
      </View>

      <ButtonCustom onPress={login} texto="Continuar" />
    </View>
  );
}
