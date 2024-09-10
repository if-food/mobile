import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { ScrollView } from 'tamagui';
import OrdersCard from './../../components/OrdersCard/index';
import Footer from 'components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Produto {
  imagem: string;
  titulo: string;
  descricao: string;
  valorUnitario: number;
}

interface Item {
  produto: Produto;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
}

interface Pedido {
  id: number;
  itens: Item[];
  statusEntrega: string;
}

export default function RegistroPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userData");
        if (!storedData) {
          throw new Error("Client ID not found in AsyncStorage");
        }

        const userData = JSON.parse(storedData);
        const clienteId = userData.id;

        const response = await fetch(`https://api-1-drn7.onrender.com/api/pedido/?clienteId=${clienteId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pedidos");
        }

        const result = await response.json();
        setPedidos(result);
      } catch (error) {
        setError(error.message);
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#2c2d33]">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#2c2d33] w-full">
      <ScrollView>
        <View className="items-start px-6 my-4">
          <Text className="text-[24px] font-bold text-[#fff] my-4">Últimos Pedidos</Text>
          <View className='mb-20'>
            {pedidos
              .flatMap(pedido => pedido.itens.map(item => (
                <OrdersCard
                  key={item.id}
                  source={item.produto.imagem}
                  name={item.produto.titulo}
                  description={item.produto.descricao}
                  price={item.produto.valorUnitario}
                  status={pedido.statusEntrega}
                />
              )))
            }
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
