import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pedido } from 'interfaces/Item'; 

export default function useFetchPedidos(limit?: number) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (!storedData) {
          throw new Error('Client ID not found in AsyncStorage');
        }

        const userData = JSON.parse(storedData);
        const clienteId = userData.id;

        const response = await fetch(`https://api-1-drn7.onrender.com/api/pedido/?clienteId=${clienteId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pedidos');
        }

        const result: Pedido[] = await response.json();
        setPedidos(result.slice(0, limit));
      } catch (error) {
        setError(error.message);
        Alert.alert('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPedidos();
  }, [limit]);

  return { pedidos, isLoading, error };
}
