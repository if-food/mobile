import ButtonCustom from 'components/ButtonCustom';
import { View, Text, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function VerifyEmail() {
  const router = useRouter();

  const allright = () => {
    router.push('../verifyEmail/allright');
  };

  return (
    <View className="justify-between flex-1 px-10">
      <View />

      <View>
        <Text className="text-[24px] text-[#fff] font-bold">Verifique seu E-mail</Text>
        <Text className="text-[12px] text-[#fff]">Confira sua caixa de entrada.</Text>
        <View className="flex-row justify-between pt-8">
          <TextInput className="justify-center items-center bg-[#E3E3E3] text-[40px] w-[64px] h-[60px] rounded-[16px]" />
          <TextInput className="justify-center items-center bg-[#E3E3E3] text-[40px] w-[64px] h-[60px] rounded-[16px]" />
          <TextInput className="justify-center items-center bg-[#E3E3E3] text-[40px] w-[64px] h-[60px] rounded-[16px]" />
          <TextInput className="justify-center items-center bg-[#E3E3E3] text-[40px] w-[64px] h-[60px] rounded-[16px]" />
        </View>
      </View>

      <ButtonCustom onPress={allright} texto="Continuar" />
    </View>
  );
}
