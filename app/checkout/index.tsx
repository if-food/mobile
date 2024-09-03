import React, { useState, useEffect, useMemo } from "react";
import { useRoute } from "@react-navigation/native";
import { useCart } from "context/CartContext";
import ButtonCustom from "components/ButtonCustom";
import CustomInput from "components/customInput";
import Footer from "components/Footer";
import AddressCard from "components/AddressCard";
import { ScrollView, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Checkout() {
  const { updateQuantity, removeItem } = useCart();
  const route = useRoute();
  const { productName, productImage, productDescription, productPrice, quantity, restaurantName }: any =
    route.params || {};
  const [localQuantity, setLocalQuantity] = useState(Number(quantity) || 1);
  const [displayProductPrice, setDisplayProductPrice] = useState(parseFloat(productPrice) || 0);
  const [totalPrice, setTotalPrice] = useState((displayProductPrice * Number(quantity) || 1).toFixed(2));
  const [savedAddress, setSavedAddress] = useState<any>(null); // Para armazenar o endereço salvo

  const logAllStoredItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length === 0) {
        console.log("Nenhum item encontrado no AsyncStorage.");
      } else {
        console.log("Itens no AsyncStorage:");
        for (const key of keys) {
          const value = await AsyncStorage.getItem(key);
          console.log(`Chave: ${key}, Valor: ${value}`);
        }
      }
    } catch (error) {
      console.error("Erro ao listar itens do AsyncStorage:", error);
    }
  };

 
  useEffect(() => {
    logAllStoredItems();
  }, []);
  

  useEffect(() => {
    const newTotalPrice = (displayProductPrice * localQuantity).toFixed(2);
    setTotalPrice(newTotalPrice);
  }, [localQuantity, displayProductPrice]);

  const updateLocalQuantity = (newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity);

    setLocalQuantity((prevQuantity) => {
      if (prevQuantity === validQuantity) {
        return prevQuantity;
      }
      return validQuantity;
    });

    updateQuantity(productName, validQuantity);
  };

  const handleIncreaseQuantity = () => {
    updateLocalQuantity(localQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (localQuantity === 1) {
      removeItem(productName);
    } else {
      updateLocalQuantity(localQuantity - 1);
    }
  };

  const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {
      id: '1',
      label: 'Cartão',
      value: 'Cartão',
      color: "#24a645",
      borderColor: "#fff",
      labelStyle: {
        color: "#fff"
      },
      descriptionStyle: {
        color: "#fff"
      }
    },
    {
      id: '2',
      label: 'PIX',
      value: 'PIX',
      color: "#24a645",
      borderColor: "#fff",
      disabled: true,
      labelStyle: {
        color: "#fff"
      }
    },
    {
      id: '3',
      label: 'Pagamento na entrega',
      value: 'Pagamento na entrega',
      color: "#24a645",
      borderColor: "#fff",
      labelStyle: {
        color: "#fff"
      }
    }
  ]), []);

  const [selectedId, setSelectedId] = useState<string | undefined>();

  const handleChangeAddress = () => {
    // Navegar para a tela de seleção de endereço ou edição
    Alert.alert(
      "Trocar Endereço",
      "Você deseja trocar o endereço de entrega?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Trocar", onPress: () => {/* Navegar para a tela de seleção de endereço */} },
      ]
    );
  };

  return (
    <View className="flex-1 bg-[#2c2d33]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-6 px-4 flex-1">
          <TouchableOpacity>
            <View className="flex-row items-center gap-4">
              <Image
                className="w-[64px] h-[64px]"
                source={
                  require("../../assets/images/restaurante/checkoutImg.png")
                }
              />
              <Text className="text-[24px] font-bold text-[#fff]">
                {restaurantName}
              </Text>
            </View>
          </TouchableOpacity>

          <View className="my-4">
            <Text className="text-[16px] font-bold text-[#fff]">
              Itens adicionados
            </Text>
            <View className="flex-row justify-between py-4">
              <View className="flex-row justify-between flex-1">
                <Image
                  source={
                    productImage
                      ? { uri: productImage }
                      : require("../../assets/images/restaurante/checkoutImg.png")
                  }
                  style={{ width: 64, height: 64 }}
                />
                <View className="justify-between mx-2 flex-1">
                  <View>
                    <Text className="text-[16px] font-bold text-[#fff]">
                      {productName}
                    </Text>
                    <Text className="text-[12px] text-[#fff]">
                      {productDescription}
                    </Text>
                  </View>
                  <Text className="text-[12px] text-[#24A645]">
                    R$ {displayProductPrice.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View className="flex-row gap-2 items-center">
                <TouchableOpacity onPress={handleDecreaseQuantity}>
                  {localQuantity > 1 ? (
                    <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
                      <Text className="text-[#1C4F2A] text-[24px]">-</Text>
                    </View>
                  ) : (
                    <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
                      <Icon name="trash" size={20} color="#1C4F2A" />
                    </View>
                  )}
                </TouchableOpacity>
                <Text className="text-[#fff]">{localQuantity}</Text>
                <TouchableOpacity onPress={handleIncreaseQuantity}>
                  <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
                    <Text className="text-[#1C4F2A] text-[24px]">+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="items-center py-4">
              <CustomInput
                titleInput="Cupom"
                placeholder="Insira um cupom promocional"
              />
              <ButtonCustom texto="Inserir cupom" />
            </View>
          </View>

          <View className="h-[104px]">
            <Text className="text-[22px] font-bold text-[#fff] pb-4">Forma de pagamento</Text>
            <RadioGroup
              layout="row"
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
            />
          </View>

          <View className="my-4">
            <Text className="text-[22px] font-bold text-[#fff] pb-4">Endereço de entrega</Text>
            {savedAddress ? (
              <AddressCard
                icon="home" // ou outro ícone apropriado
                title={savedAddress.tipo || "Endereço"}
                address={`${savedAddress.rua}, ${savedAddress.numero}, ${savedAddress.bairro}, ${savedAddress.cidade} - ${savedAddress.estado}`}
                complement={savedAddress.complemento || "Complemento não especificado"}
                onEditPress={handleChangeAddress}
                isFavorited={true} // Assumindo que o endereço salvo é sempre favoritado
              />
            ) : (
              <Text className="text-[#fff]">Nenhum endereço salvo.</Text>
            )}
          </View>

          <View className="justify-between flex-1 pb-[50px]">
            <View className="gap-2">
              <Text className="text-[22px] font-bold text-[#fff]">
                Resumo de pedido
              </Text>
              <View className="flex-row justify-between">
                <Text className="font-bold text-[#fff]">Subtotal</Text>
                <Text className="font-bold text-[#fff]">
                  R$ {displayProductPrice.toFixed(2)}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold text-[#fff]">Cupom</Text>
                <Text className="font-bold text-[#fff]">R$ 0,00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold text-[#fff]">Frete</Text>
                <Text className="font-bold text-[#fff]">R$ 0,00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold text-[#fff]">Total</Text>
                <Text className="font-bold text-[#fff]">R$ {totalPrice}</Text>
              </View>
            </View>
            <ButtonCustom texto="Finalizar pedido" />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
