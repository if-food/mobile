import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Footer from 'components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const profileItems = [
  { icon: 'person', text: 'Dados Pessoais', route: 'personalData' },
  { icon: 'location-on', text: 'Endereços', route: 'addresses' },
  { icon: 'payment', text: 'Métodos de pagamento', route: 'payments' },
  { icon: 'card-giftcard', text: 'Cupons', route: 'voucher' },
  { icon: 'favorite', text: 'Pedidos', route: 'favorites' },
  { icon: 'help', text: 'Dúvidas?', route: 'questions' },
  { icon: 'logout', text: 'Sair', route: 'login' }
];

export default function Profile() {
  const router = useRouter();

  const navigateTo = (route) => {
    if (route === 'login') {
      handleLogout();
    } else {
      router.push(`../${route}`);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userData');

      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('userData');
      console.log('Token após logout:', token);
      console.log('UserData após logout:', userData);

      router.push('../login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigateTo(item.route)} style={{ width: '100%' }}>
      <View style={{ 
        padding: 16, 
        borderTopWidth: 1, 
        borderTopColor: '#444', 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between' 
      }}>
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
      <FlatList
        data={profileItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.route}
        style={{ marginTop: 24 }}
      />
      <Footer />
    </View>
  );
}
