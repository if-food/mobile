import Footer from 'components/Footer';
import { Image } from 'tamagui';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import CardRestaurantPage from './cardRestaurantPage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ListagemCardapio from './listFood';

interface Restaurant {
  id: string;
  open: boolean;
  categoriasEnum: string;
  nomeFantasia: string;
}

interface Product {
  id: number;
  codigo: string;
  titulo: string;
  descricao: string;
  imagem: string | null;
  valorUnitario: number;
}

interface ProductsByCategory {
  [category: string]: Product[];
}

export default function Restaurantes() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [productsByCategory, setProductsByCategory] = useState<ProductsByCategory>({});
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get<Restaurant>(`https://if-delivery-api.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/restaurante/?restauranteId=${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Failed to fetch restaurant data:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get<Record<string, Product[]>>(`https://if-delivery-api.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/produto/cardapio/${id}`);
        setProductsByCategory(response.data);
      } catch (error) {
        console.error('Failed to fetch products data:', error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRestaurant(), fetchProducts()]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: `../orderRestaurant/${product.id}`,
      params: {
        productName: product.titulo,
        productImage: product.imagem || '',
        productDescription: product.descricao,
        productPrice: product.valorUnitario.toFixed(2),
        quantity: '1',
        totalPrice: product.valorUnitario.toFixed(2),
        restaurantName: restaurant ? restaurant.nomeFantasia : '',
      },
    });
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#2c2d33] justify-center items-center">
        <ActivityIndicator size="large" color="#24A645" />
        <Text className="text-white mt-4">Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#2c2d33]">
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
            <View className="flex-row">
              {Object.values(productsByCategory).flat().map((product) => (
                <CardRestaurantPage
                  key={product.id}
                  source={product.imagem ? { uri: product.imagem } : require('../../assets/images/restaurante/card.png')}
                  titulo={product.titulo}
                  valorUnitario={`R$ ${product.valorUnitario.toFixed(2)}`}
                  onPress={() => handleProductPress(product)}
                />
              ))}
            </View>
          </ScrollView>
          <Text className="text-[32px] text-[#fff] font-bold pb-4 pt-6 pl-2">Nossos pratos</Text>
          {Object.entries(productsByCategory).map(([category, products]) => (
            <ListagemCardapio
              key={category}
              category={category}
              products={products.map(product => ({
                title: product.titulo,
                description: product.descricao,
                price: `R$ ${product.valorUnitario.toFixed(2)}`,
                source: product.imagem ? { uri: product.imagem } : require('../../assets/images/restaurante/card.png'),
                onPress: () => handleProductPress(product)
              }))}
            />
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
