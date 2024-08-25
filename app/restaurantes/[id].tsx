import Footer from 'components/Footer';
import { Image } from 'tamagui';
import { View, Text, ScrollView } from 'react-native';
import CardRestaurantPage from './cardRestaurantPage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Restaurant {
  id: string;
  open: boolean;
  categoriasEnum: string;
  nomeFantasia: string;
}

export default function Restaurantes() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get<Restaurant>(`https://api-1-drn7.onrender.com/restaurantes/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  const navigateToDetails = (id: string) => {
    router.push(`../restaurantes/${id}`);
  };

  const order = (id: string) => {
    router.push(`../orderRestaurant/${id}`);
  };

  return (
    <View className="flex-1 bg-[#2c2d33] pt-[40px]">
      <ScrollView className="mb-14">
        <Image source={require('../../assets/images/restaurante/banner.png')} />
        <View className="px-6 pt-6 flex-row justify-between items-center">
          <View>
            <Text className="text-white font-bold text-[24px]">
              {restaurant ? restaurant.nomeFantasia : 'Carregando...'}
            </Text>
            <Text className="text-white font-bold text-[12px]">
              {restaurant ? restaurant.categoriasEnum : 'Carregando...'}
            </Text>
            <Text className={`${restaurant ? (restaurant.open ? 'text-[#0f0]' : 'text-[#f00]') : ''}`}>
              {restaurant ? (restaurant.open ? 'Aberto 🟢' : 'Fechado 🔴') : ''}
            </Text>
          </View>

          <Image source={require('../../assets/images/restaurante/restaurantProfile.png')} />
        </View>
        <View className="px-4 pt-6">
          <Text className="text-[32px] text-[#fff] font-bold pb-4 pl-2">Os mais pedidos</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row justify-between">
              {restaurant && (
                <CardRestaurantPage
                  key={restaurant.id}
                  source={require('../../assets/images/restaurante/card.png')}
                  title={restaurant.nomeFantasia}
                  categoria={restaurant.categoriasEnum}
                  onPress={() => navigateToDetails(restaurant.id)}
                />
              )}
            </View>
          </ScrollView>
          <Text className="text-[32px] text-[#fff] font-bold pb-4 pt-6 pl-2">Nossos pratos</Text>
          {/* Uncomment and update ListagemCardapio with real data */}
          {/* <ListagemCardapio title="Salada de frutas" description="Maça, uva, pêra e salada mista" price={formatPrice(32)} source={require('../../assets/images/restaurante/cardOne.png')} />
          <ListagemCardapio title="Chá de hortelã" description="Chá quente ou frio" price={formatPrice(12)} source={require('../../assets/images/restaurante/cardTwo.png')} /> */}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
