import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRouter } from 'expo-router';
import ButtonCustom from "components/ButtonCustom";
import Footer from "components/Footer";
import AddressCard from "components/AddressCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface Address {
  id: number;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento?: string;
  tipo?: string;
}

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const fetchAddresses = async () => {
    try {
      const clienteIdString = await AsyncStorage.getItem("clienteId");
      if (clienteIdString) {
        const id = clienteIdString;
        const response = await axios.get(`https://if-delivery-api.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente/${id}`);
        const data = response.data.enderecos || [];
        setAddresses(data);
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

  const deleteAddress = async (id: number) => {
    try {
      const clienteIdString = await AsyncStorage.getItem("clienteId");
      if (clienteIdString) {
        await axios.delete(`https://if-delivery-api.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente/endereco/${id}`);
        setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== id));
        Alert.alert("Sucesso", "Endereço excluído com sucesso!");
      } else {
        setError("Cliente ID não encontrado.");
      }
    } catch (err) {
      setError("Erro ao excluir o endereço.");
      console.error(err);
    }
  };

  const handleAddress = () => {
    router.push('./address'); 
  };

  const handleEditAddress = (id: number) => {
    router.push({
      pathname: './address',
      params: { id }
    });
  };

  const getIconForType = (type?: string) => {
    switch (type) {
      case 'Casa':
        return 'home';
      case 'Apartamento':
        return 'apartment';
      default:
        return 'map'; 
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

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
                    onEditPress={() => handleEditAddress(address.id)}
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
