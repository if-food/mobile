import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRouter } from 'expo-router';
import ButtonCustom from "components/ButtonCustom";
import Footer from "components/Footer";
import AddressCard from "components/AddressCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getIconForType } from "utils/formatters";

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteAddress, setFavoriteAddress] = useState<Address | null>(null);
  const [clienteId, setClienteId] = useState<string | null>(null);

  const router = useRouter();

  const fetchAddresses = async () => {
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const userData = JSON.parse(storedData);
        const id = userData.id;
        setClienteId(id);
        const response = await axios.get(`https://if-delivery-api-final.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente/?clienteId=${id}`);
        const data = response.data.enderecos || [];
        setAddresses(data);
        await loadFavoriteAddress(id);
      } else {
        setError("Cliente ID não encontrado.");
      }
    } catch (err) {
      setError("Erro ao carregar os endereços.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadFavoriteAddress = async (clienteId: string) => {
    try {
      const storedFavorite = await AsyncStorage.getItem(`favoriteAddress_${clienteId}`);
      if (storedFavorite) {
        setFavoriteAddress(JSON.parse(storedFavorite));
      }
    } catch (error) {
      console.error('Erro ao carregar o endereço favoritado:', error);
    }
  };

  const toggleFavoriteAddress = async (address: Address) => {
    if (!clienteId) {
      setError("Cliente ID não encontrado.");
      return;
    }

    try {
      const addressKey = `favoriteAddress_${clienteId}`;
      
      if (addresses.length === 1) {
        setFavoriteAddress(address);
        await AsyncStorage.setItem(addressKey, JSON.stringify(address));
        return;
      }

      if (favoriteAddress?.id === address.id) {
        setFavoriteAddress(null);
        await AsyncStorage.removeItem(addressKey);
      } else {
        if (favoriteAddress) {
          await AsyncStorage.removeItem(addressKey);
        }
        setFavoriteAddress(address);
        await AsyncStorage.setItem(addressKey, JSON.stringify(address));
      }
    } catch (error) {
      setError("Erro ao atualizar o endereço favoritado.");
      console.error(error);
    }
  };

  const deleteAddress = async (id: number) => {
    if (!clienteId) {
      setError("Cliente ID não encontrado.");
      return;
    }

    try {
      await axios.delete(`https://if-delivery-api-final.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente/endereco/${id}`);
      setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== id));
      if (favoriteAddress?.id === id) {
        setFavoriteAddress(null);
        await AsyncStorage.removeItem(`favoriteAddress_${clienteId}`);
      }
      Alert.alert("Sucesso", "Endereço excluído com sucesso!");
    } catch (err) {
      setError("Erro ao excluir o endereço.");
      console.error(err);
    }
  };

  const handleAddress = () => {
    router.push('./address'); 
  };

  const handleEditAddress = (address: Address) => {
    router.push({
      pathname: './address',
      params: { address: JSON.stringify(address) } 
    });
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (addresses.length === 1 && addresses[0]) {
      const singleAddress = addresses[0];
      toggleFavoriteAddress(singleAddress);
    }
  }, [addresses]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#2c2d33",
        paddingTop: 24,
      }}
    >
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : error ? (
          <Text style={{ color: 'red' }}>{error}</Text>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {addresses.length > 0 ? (
              <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    icon={getIconForType(address.tipo)}
                    title={address.tipo || "Endereço"}
                    address={`${address.rua}, ${address.numero}, ${address.bairro}, ${address.cidade} - ${address.estado}`}
                    complement={address.complemento || "Complemento não especificado"}
                    isFavorited={favoriteAddress?.id === address.id}
                    onEditPress={() => handleEditAddress(address)}
                    onDeletePress={() => {
                      Alert.alert(
                        "Confirmar exclusão",
                        "Tem certeza de que deseja excluir este endereço?",
                        [
                          { text: "Cancelar", style: "cancel" },
                          { text: "Excluir", onPress: () => deleteAddress(address.id) },
                        ]
                      );
                    }}
                    onFavoritePress={() => toggleFavoriteAddress(address)}
                  />
                ))}
              </ScrollView>
            ) : (
              <Text style={{ color: '#fff' }}>Nenhum endereço cadastrado :(</Text>
            )}
          </View>
        )}
      </View>

      <View style={{ alignItems: 'center', marginBottom: 64 }}>
        <ButtonCustom
          style={{ width: "90%" }}
          texto="Adicionar novo endereço"
          iconName="add-circle"
          iconColor="#1C4F2A"
          onPress={handleAddress}
        />
      </View>

      <Footer />
    </View>
  );
}