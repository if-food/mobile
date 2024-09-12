import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, Alert } from 'react-native';
import OrderPreparo from '../../assets/images/orderReview/emPreparo.png';
import ButtonCustom from 'components/ButtonCustom';
import ReviewCard from 'components/ReviewCard';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from 'components/Footer';
import { STATUS_MESSAGES } from 'enums/Status'; 

export default function OrderReview() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState<{ message: string, color: string }>({ message: 'Pedido em preparo', color: '#FFFF00' });
  const [loading, setLoading] = useState(true);
  const [showIncentiveMessage, setShowIncentiveMessage] = useState(false);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const storedOrder = await AsyncStorage.getItem('orderData');
        if (!storedOrder) {
          setShowIncentiveMessage(true);
          return;
        }

        const orderData = JSON.parse(storedOrder);
        const orderId = orderData.id;

        if (!orderId) {
          setShowIncentiveMessage(true);
          return;
        }

        const response = await fetch(`https://if-delivery-api-final.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/pedido/${orderId}`);
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }

        const result = await response.json();
        setOrder(result);
        const status = result.statusEntrega;
        setStatusMessage(STATUS_MESSAGES[status] || { message: 'Status desconhecido', color: '#FFFFFF' });

        if (status === 'ENTREGUE' || status === 'CANCELADO') {
          await AsyncStorage.removeItem('orderData');
          setShowIncentiveMessage(true);
          
          if (status === 'CANCELADO') {
            Alert.alert('Pedido Cancelado', 'Seu pedido foi cancelado. Por favor, faça um novo pedido.');
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do pedido:", error);
        setShowIncentiveMessage(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
    const intervalId = setInterval(fetchOrderData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleHomeNavigation = () => {
    router.push("../home");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#2b2e32', width: '100%' }}>
      {showIncentiveMessage ? (
        <View style={{ flex: 1, backgroundColor: '#2b2e32', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#24A645', paddingTop: 6, paddingBottom: 4 }}>
            Nada para ver por aqui.
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', paddingBottom: 4 }}>
            Aproveite para fazer um novo pedido! :)
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center', paddingTop: 20, backgroundColor: '#2b2e32', paddingBottom: 4 }}>
            <Image source={OrderPreparo} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: statusMessage.color, paddingTop: 6, paddingBottom: 4 }}>
              {statusMessage.message}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', paddingBottom: 4 }}>
              Avalie seu pedido
            </Text>

            <Stars
              default={2.5}
              count={5}
              half={true}
              starSize={50}
              fullStar={<Icon name='star' style={{ color: '#E6DC00', backgroundColor: 'transparent', textShadowColor: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2, fontSize: 40 }} />}
              emptyStar={<Icon name='star-outline' style={{ color: '#E6DC00', backgroundColor: 'transparent', textShadowColor: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2, fontSize: 40 }} />}
              halfStar={<Icon name='star-half' style={{ color: '#E6DC00', backgroundColor: 'transparent', textShadowColor: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2, fontSize: 40 }} />}
            />
          </View>

          <ScrollView style={{ backgroundColor: '#2b2e32' }}>
            <View style={{ paddingHorizontal: 6, marginVertical: 4 }}>
              {order?.itens?.map((item, index) => (
                <ReviewCard
                  key={index}
                  source={{ uri: item.produto.imagem }}
                  name={item.produto.titulo}
                  description={item.produto.descricao}
                  price={item.produto.valorUnitario}
                />
              ))}
            </View>
          </ScrollView>

          <View style={{ paddingHorizontal: 16, marginBottom: 80 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', paddingVertical: 2 }}>
              Deseja deixar algum comentário?
            </Text>
            <View style={{ height: 200, alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput
                style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, height: 100, fontSize: 12, width: '100%' }}
                multiline
                textAlignVertical="top"
                placeholder="Adicione um comentário à entrega e ao produto!"
                placeholderTextColor="#1F2026"
              />
              <ButtonCustom onPress={handleHomeNavigation} texto="Enviar" />
            </View>
          </View>
        </View>
      )}

      <Footer />
    </View>
  );
}
