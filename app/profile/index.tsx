import { View, Text, FlatList, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Footer from 'components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardRestaurantPage from 'app/restaurantes/cardRestaurantPage';
import useFetchPedidos from 'hooks/useFetchPedidos'; 

const profileItems = [
  { icon: 'person', text: 'Dados Pessoais', route: 'personalData' },
  { icon: 'location-on', text: 'Endereços', route: 'addresses' },
  { icon: 'menu-book', text: 'Pedidos', route: 'registroPedidos' },
  { icon: 'card-giftcard', text: 'Cupons', route: 'voucher' },
  { icon: 'favorite', text: 'Pedidos', route: 'favorites' },
  { icon: 'help', text: 'Dúvidas?', route: 'questions' },
  { icon: 'logout', text: 'Sair', route: 'login' },
];

export default function Profile() {
  const router = useRouter();
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('Usuário');
  const { pedidos, isLoading, error } = useFetchPedidos(7);

  useEffect(() => {
    const getGreeting = () => {
      const hours = new Date().getHours();
      if (hours >= 18 || hours < 6) {
        return 'Boa noite 🌕';
      } else if (hours >= 6 && hours < 12) {
        return 'Bom dia ☀️';
      } else {
        return 'Boa tarde 🌇';
      }
    };

    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserName(userData.nome || 'Usuário');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const navigateTo = (route) => {
    if (route === 'login') {
      handleLogout();
    } else {
      router.push(`../${route}`);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      const keys = await AsyncStorage.getAllKeys();
      console.log('Chaves após logout:', keys);
      router.push('../login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#2c2d33]">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigateTo(item.route)} style={{ width: '100%' }}>
      <View
        style={{
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: '#444',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name={item.icon} size={24} color="#fff" style={{ marginRight: 10 }} />
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{item.text}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#fff" />
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#2c2d33' }}>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#fff', fontSize: 24 }}>{greeting}</Text>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}> {userName}!</Text>
        </View>
        <Text style={{ paddingVertical: 8, fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Últimos pedidos</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : error ? (
          <Text style={{ color: '#fff', padding: 16 }}>{error}</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 8 }}
          >
            <View style={{ flexDirection: 'row' }}>
            {pedidos.flatMap(pedido =>
              pedido.itens.map(item => (
                <CardRestaurantPage
                  key={pedido.id} 
                  title={item.produto.titulo}
                  photo={item.produto.imagem}
                  valorUnitario={`R$ ${item.produto.valorUnitario.toFixed(2)}`}
                />
              ))
            )}
            </View>
          </ScrollView>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={profileItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.route}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
      <Footer />
    </View>
  );
}
