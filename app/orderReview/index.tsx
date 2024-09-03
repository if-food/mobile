import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import OrderPreparo from '../../assets/images/orderReview/emPreparo.png';
import ButtonCustom from 'components/ButtonCustom';
import ReviwCard from 'components/ReviewCard';
import { useRouter } from "expo-router";


export default function OrderReview() {
  const router = useRouter();

  const home = () => {
    router.push("../home");
  };

  return (
    <View className="flex-1 bg-[#2b2e32] w-full justify-between">
      <View className="items-center pt-20 bg-[#2b2e32]">
        <Image source={OrderPreparo} />
        <Text className="text-[24px] font-bold text-[#ECB951] pt-6 pb-4">Pedido em preparo</Text>
      </View>

      <ScrollView className="bg-[#2b2e32]">
        <View className="items-start px-6 my-4">
          <Text className="text-[16px] font-bold text-[#fff] pb-4">Avalie seu pedido</Text>
          <ReviwCard source={require('../../assets/images/ordersCard/cardOne.png')} name="Rabanete" description="Rabanetes frescos" price={2.5} />
          <ReviwCard source={require('../../assets/images/ordersCard/cardOne.png')} name="Rabanete" description="Rabanetes frescos" price={2.5} />
          <ReviwCard source={require('../../assets/images/ordersCard/cardOne.png')} name="Rabanete" description="Rabanetes frescos" price={2.5} />
          <ReviwCard source={require('../../assets/images/ordersCard/cardOne.png')} name="Rabanete" description="Rabanetes frescos" price={2.5} />
          <ReviwCard source={require('../../assets/images/ordersCard/cardOne.png')} name="Rabanete" description="Rabanetes frescos" price={2.5} />
          <ReviwCard source={require('../../assets/images/ordersCard/cardOne.png')} name="Rabanete" description="Rabanetes frescos" price={2.5} />
          <ReviwCard source={require('../../assets/images/ordersCard/cardOne.png')} name="Rabanete" description="Rabanetes frescos" price={2.5} />
          <ReviwCard source={require('../../assets/images/ordersCard/cardOne.png')} name="Rabanete" description="Rabanetes frescos" price={2.5} />
          <ReviwCard source={require('../../assets/images/ordersCard/cardOne.png')} name="Rabanete" description="Rabanetes frescos" price={2.5} />

        </View>
      </ScrollView>

      <View className="px-6">
        <Text className="text-[16px] font-bold text-[#fff] py-2">Deseja deixar algum comentário?</Text>
        <View className="h-[200px] items-center justify-between">
          <TextInput className="bg-[#fff] px-4 py-2 rounded-[8px] h-[100px] text-[12px] w-full" multiline={true} textAlignVertical="top" placeholder="Adicione um comentário à entrega e ao produto!" placeholderTextColor="#1F2026" />
          <ButtonCustom onPress={home} texto="Enviar" />
        </View>
      </View>
    </View>
  );
}
