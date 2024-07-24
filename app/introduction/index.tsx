import { Text, View, Image, Button } from 'tamagui'
import { useRouter } from 'expo-router';

import ButtonCustom from 'components/ButtonCustom';
import { LogIn, UserPlus } from 'lucide-react-native';

export default function Introduction() {
  const router = useRouter();


  const login = () => {
    router.push('../login');
  };
  const cadastro = () => {
    //router.push('../cadastro');
    router.push('../cadastro');
  }

  return (
    <View className='flex-1 justify-end items-center bg-[#2c2d33] pb-[24px]'>
      <View>
        <Image source={require('../../assets/images/login/logo.png')} width={160} height={145} />
      </View>
      <View className='pt-[100px]'>
        <Text className='font-bold text-center text-white text-[24px] leading-[31px] pb-[24px]'>Falta pouco para matar {'\n'}sua fome!</Text>
        <Text className='font-light text-center text-white text-[12px] leading-[15px] pb-[24px]'>O que deseja? 🍽️</Text>

        <ButtonCustom texto='Login' onPress={login} icon={LogIn} />
        <ButtonCustom texto='Cadastre-se' onPress={cadastro} icon={UserPlus} />
        <Button className='bg-[#3a953e] text-[#f5f5f5]'>Continue com Google</Button>
      </View>
    </View >
  )
}