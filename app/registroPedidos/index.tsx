import Footer from 'components/Footer';
import { View, Text } from 'react-native';
import { ScrollView } from 'tamagui';
import OrdersCard from './../../components/OrdersCard/index';

export default function RegistroPedidos() {
  return (
    <View className="flex-1 bg-[#2c2d33] w-full">
      <ScrollView>
        <View className="items-start px-6 my-4">
          <Text className="text-[24px] font-bold text-[#fff]">Hoje</Text>
          <View>
            <OrdersCard
              source={require('../../assets/images/ordersCard/cardOne.png')}
              name="Rabanete"
              description="Rabanetes frescos"
              price={2.5}
              status="Entregue"
            />
            <OrdersCard
              source={require('../../assets/images/ordersCard/cardOne.png')}
              name="Rabanete"
              description="Rabanetes frescos"
              price={2.5}
              status="Enviado"
            />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
