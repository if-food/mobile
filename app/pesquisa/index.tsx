import React, { useState, useEffect } from 'react';
import CustomInput from 'components/customInput';
import { View, Text, ActivityIndicator } from 'react-native';
import Footer from './../../components/Footer/index';
import SearchItemCard from 'components/SearchItemCard';

interface ProductItem {
  id: number;
  titulo: string | null;
  descricao: string;
  imagem: string;
  valorUnitario: number;
}

interface Restaurant {
  id: number;
  nomeFantasia: string;
  photoLogo: string;
  photoBanner: string;
}

export default function Pesquisa() {
  const [searchText, setSearchText] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [menu, setMenu] = useState<{ [key: number]: ProductItem[] }>({});
  const [filteredData, setFilteredData] = useState<{ item: ProductItem, restaurantName: string, restaurantLogo: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('https://if-delivery-api-final.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/restaurante');
        const data = await response.json();
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const fetchMenu = async (restaurant: Restaurant) => {
      try {
        const response = await fetch(`https://if-delivery-api-final.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/categoria_produto/cardapio/?restauranteId=${restaurant.id}`);
        const data = await response.json();
        const products = data.flatMap(category => category.produtos);
        setMenu(prevMenu => ({ ...prevMenu, [restaurant.id]: products }));
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    restaurants.forEach(restaurant => {
      fetchMenu(restaurant);
    });
  }, [restaurants]);

  useEffect(() => {
    const filtered = Object.keys(menu).flatMap(restaurantId => {
      return menu[parseInt(restaurantId)].map(item => ({
        item,
        restaurantName: restaurants.find(r => r.id === parseInt(restaurantId))?.nomeFantasia || 'Desconhecido',
        restaurantLogo: restaurants.find(r => r.id === parseInt(restaurantId))?.photoLogo || ''
      }));
    }).filter(({ item, restaurantName }) =>
      (item.titulo && item.titulo.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.descricao && item.descricao.toLowerCase().includes(searchText.toLowerCase()))
    );

    setFilteredData(filtered);
  }, [searchText, menu, restaurants]);

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#2c2d33', paddingTop: 24, alignItems: 'center' }}>
      <CustomInput
        titleInput="Pesquise por um item"
        placeholder="Qual o pedido para hoje?"
        onChangeText={handleSearchTextChange}
        style={{ marginBottom: 16 }}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <>
          {searchText && (
            filteredData.length > 0 ? (
              filteredData.map(({ item, restaurantName, restaurantLogo }, index) => (
                <SearchItemCard
                  key={index}
                  logo={restaurantLogo}
                  restaurantName={restaurantName}
                  title={item.titulo || 'Sem título'}
                  description={item.descricao}
                  orderImage={item.imagem}
                  price={`R$ ${item.valorUnitario.toFixed(2)}`}
                  onPress={() => console.log('Card pressed')}
                />
              ))
            ) : (
              <Text style={{ color: '#fff' }}>Nenhum resultado encontrado</Text>
            )
          )}
        </>
      )}
      <Footer />
    </View>
  );
}
