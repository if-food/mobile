import Footer from 'components/Footer';
import { Image } from 'tamagui';
import { View, Text, ScrollView } from 'react-native';
import CardRestaurantPage from './cardRestaurantPage';
import ListagemCardapio from './listFood';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

interface Restaurant {
  id: string;
  open: boolean;
  categoriasEnum: string;
  nomeFantasia: string;
}

export default function Restaurantes() {


  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get<Restaurant[]>('https://api-1-drn7.onrender.com/api/restaurante');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const router = useRouter();

  const order = () => {
    router.push('../orderRestaurant/[orderRestaurant]');
  };

  return (
    <View className="flex-1 bg-[#2c2d33] pt-[40px]">
      <ScrollView className="mb-14">
        <Image source={require('../../assets/images/restaurante/banner.png')} />
        <View className="px-6 pt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-white font-bold text-[32px]">
              {restaurants.length > 1 ? restaurants[restaurants.length - 2].nomeFantasia : 'Carregando...'}
            </Text>
            <Text className="text-white text-[12px]">{restaurants.length > 1 ? restaurants[restaurants.length - 2].categoriasEnum : 'Carregando...'}</Text>
            <Text className={`${restaurants.length > 1 ? (restaurants[restaurants.length - 2].open ? 'text-[#0f0]' : 'text-[#f00]') : ''}`}>{restaurants.length > 1 ? (restaurants[restaurants.length - 2].open ? 'Aberto 🟢' : 'Fechado 🔴') : ''}</Text>
          </View>

          <Image source={require('../../assets/images/restaurante/restaurantProfile.png')} />
        </View>
        <View className="px-4 pt-6">
          <Text className="text-[32px] text-[#fff] font-bold pb-4 pl-2">Os mais pedidos</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row justify-between">
              {restaurants.slice(0, -1).map((restaurant) => (

                <CardRestaurantPage
                  key={restaurant.id}
                  source={require('../../assets/images/restaurante/card.png')}
                  title={restaurant.nomeFantasia} // Corrigido para acessar a propriedade do objeto `restaurant`
                  categoria={restaurant.categoriasEnum}
                  onPress={order}
                />

              ))}
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
