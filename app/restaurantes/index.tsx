import Footer from 'components/Footer';
import { Image } from 'tamagui';
import { View, Text, ScrollView } from 'react-native';
import CardRestaurantPage from './cardRestaurantPage';
import ListagemCardapio from './listFood';
import { useRouter } from 'expo-router';

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export default function Restaurantes() {
  const router = useRouter();

  const order = () => {
    router.push('../orderRestaurant');
  };

  return (
    <View className="flex-1 bg-[#2c2d33] pt-[40px]">
      <ScrollView className="mb-14">
        <Image source={require('../../assets/images/restaurante/banner.png')} />
        <View className="px-6 pt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-white font-bold text-[32px]">Rabanette</Text>
            <Text className="text-white text-[12px]">Comida natural - 1,4 km </Text>
            <Text className="text-[#24A645] font-bold text-[12px]">Aberto 🟢</Text>
          </View>

          <Image source={require('../../assets/images/restaurante/restaurantProfile.png')} />
        </View>
        <View className="px-4 pt-6">
          <Text className="text-[32px] text-[#fff] font-bold pb-4 pl-2">Os mais pedidos</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row justify-between">
              <CardRestaurantPage source={require('../../assets/images/restaurante/card.png')} title="Sopa de Cogumelo" price="55" />

              <CardRestaurantPage source={require('../../assets/images/restaurante/test.png')} title="Rabanete" price="3.49" onPress={order} />

              <CardRestaurantPage source={require('../../assets/images/restaurante/testTwo.jpg')} title="Ratatouille" price="49.99" />

              <CardRestaurantPage source={require('../../assets/images/restaurante/testThree.jpg')} title="Suco de uva 1L" price="12.99" />
            </View>
          </ScrollView>
          <Text className="text-[32px] text-[#fff] font-bold pb-4 pt-6 pl-2">Nossos pratos</Text>
        </View>
        <ListagemCardapio title="Salada de frutas" description="Maça, uva, pêra e salada mista" price="32" source={require('../../assets/images/restaurante/cardOne.png')} />

        <ListagemCardapio title="Chá de hortelã" description="Chá quente ou frio" price="12" source={require('../../assets/images/restaurante/cardTwo.png')} />

        <ListagemCardapio title="Salada de frutas" description="Maça, uva, pêra e salada mista" price="32" source={require('../../assets/images/restaurante/cardOne.png')} />

        <ListagemCardapio title="Salada de frutas" description="Maça, uva, pêra e salada mista" price="32" source={require('../../assets/images/restaurante/cardOne.png')} />
      </ScrollView>
      <Footer />
    </View>
  );
}
