import React, { useState, useEffect } from 'react';
import CustomInput from 'components/customInput';
import { View, Text } from 'react-native';
import Footer from './../../components/Footer/index';
import SearchItemCard from 'components/SearchItemCard';

interface SearchItem {
  logo: any;
  restaurantName: string;
  title: string;
  description: string;
  orderImage: any;
  price: string;
}

export default function Pesquisa() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<SearchItem[]>([]);

  const exampleData: SearchItem[] = [
    {
      logo: require('../../assets/images/home/rouned_one.png'),
      restaurantName: 'Folha Verde',
      title: 'Rabanete',
      description: 'Rabanete saudável',
      orderImage: require('../../assets/images/ordersCard/cardOne.png'),
      price: 'R$ 7,50',
    },
    {
      logo: require('../../assets/images/home/card_three.png'),
      restaurantName: 'Sacia Fome',
      title: 'Ratatouille',
      description: 'Culinária francesa',
      orderImage: require('../../assets/images/restaurante/testTwo.jpg'),
      price: 'R$ 99,99',
    },
  ];

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    const filtered = exampleData.filter(item =>
      item.restaurantName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchText]);

  return (
    <View className="flex-1 items-center bg-[#2c2d33] pt-[24px]">
      <CustomInput
        titleInput="Pesquise por um restaurante"
        placeholder="Qual o pedido para hoje?"
        onChangeText={handleSearchTextChange}
        style={{ marginBottom: 16 }}
      />
      {searchText && (
        filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <SearchItemCard
              key={index}
              logo={item.logo}
              restaurantName={item.restaurantName}
              title={item.title}
              description={item.description}
              orderImage={item.orderImage}
              price={item.price}
              onPress={() => console.log('Card pressed')}
            />
          ))
        ) : (
          <Text style={{ color: '#fff' }}>Nenhum resultado encontrado</Text>
        )
      )}
      <Footer />
    </View>
  );
}
