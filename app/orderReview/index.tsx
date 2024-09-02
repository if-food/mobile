import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import OrderPreparo from '../../assets/images/orderReview/emPreparo.png';
import ButtonCustom from 'components/ButtonCustom';

export default function OrderReview() {
  return (
    <View className="flex-1 bg-[#2b2e32] w-full justify-between">
      <View className="items-center pt-20 bg-[#2b2e32]">
        <Image source={OrderPreparo} />
        <Text className="text-[24px] font-bold text-[#ECB951] pt-6">Pedido em preparo</Text>
      </View>

      <ScrollView className="bg-[#2b2e32]">
        <View className="items-start px-6 my-4">
          <Text className="text-[16px] font-bold text-[#fff]">Avalie seu pedido</Text>
          <Text className="text-[16px] font-bold text-[#fff] my-4">Pedido aqui</Text>
        </View>
      </ScrollView>

      <View className="px-6">
        <Text className="text-[16px] font-bold text-[#fff] py-2">Deseja deixar algum comentário?</Text>
        <View className="h-[200px] items-center justify-between">
          <TextInput className="bg-[#fff] px-4 py-2 rounded-[8px] h-[100px] text-[12px] w-full" multiline={true} textAlignVertical="top" placeholder="Adicione um comentário à entrega e ao produto!" placeholderTextColor="#1F2026" />
          <ButtonCustom texto="Enviar" />
        </View>
      </View>
    </View>
  );
}
