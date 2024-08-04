import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const profileItems = [
  { icon: 'person', text: 'Dados Pessoais', route: 'personalData' },
  { icon: 'location-on', text: 'Endereços', route: 'addresses' },
  { icon: 'payment', text: 'Métodos de pagamento', route: 'payments' },
  { icon: 'card-giftcard', text: 'Cupons', route: 'coupons' },
  { icon: 'favorite', text: 'Pedidos', route: 'favorites' },
  { icon: 'question', text: 'Dúvidas', route: 'questions'}
];

export default function Profile() {
  const router = useRouter();

  const navigateTo = (route) => {
    router.push(`../${route}`);
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigateTo(item.route)} style={{ width: '100%' }}>
      <View style={{ 
        padding: 16, 
        borderBottomWidth: 1, 
        borderBottomColor: '#444', 
        flexDirection: 'row', 
        alignItems: 'center' 
      }}>
        <MaterialIcons name={item.icon} size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{item.text}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#2c2d33', marginTop: 24 }}>
      <FlatList
        data={profileItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.route}
      />
    </View>
  );
}
