import { useContext, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import ProductItem from "components/ProductItem";
import Footer from "components/Footer";
import { useRouter } from "expo-router";
import { CartContext } from "context/CartContext";
import ButtonCustom from "components/ButtonCustom";
import AddressCard from "components/AddressCard";
import { getIconForType } from "utils/formatters";
import { RadioGroup } from "react-native-radio-buttons-group";
import CustomInput from "components/customInput";
import ImagePickerComponent from "components/ProfileImage";

export default function Checkout() {
  const { updateQuantity, removeItem } = useContext(CartContext) || {};
  const route = useRoute();
  const router = useRouter();
  const {
    productId,
    productName,
    productImage,
    productDescription,
    productPrice,
    quantity,
    restaurantName,
    restaurantId,
    restaurantPhoto,
  }: any = route.params || {};

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [savedAddress, setSavedAddress] = useState<any>(null);
  const [savedRestaurant, setSavedRestaurant] = useState<any>(null);
  const [restaurantTitle, setRestaurantTitle] = useState<string>(
    restaurantName || ""
  );
  const [restaurantLogo, setRestaurantLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSavedAddress = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData) {
          const userData = JSON.parse(storedData);
          const clienteId = userData.id;
          const savedAddressString = await AsyncStorage.getItem(
            `favoriteAddress_${clienteId}`
          );
          if (savedAddressString) {
            setSavedAddress(JSON.parse(savedAddressString));
          }
        }
      } catch (error) {
        console.error("Erro ao carregar o endereço:", error);
      }
    };

    loadSavedAddress();
  }, []);

  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const savedCartString = await AsyncStorage.getItem("cart");
        if (savedCartString) {
          setCart(JSON.parse(savedCartString));
        }
      } catch (error) {
        console.error("Error loading cart from AsyncStorage:", error);
      }
    };

    const loadRestaurantFromStorage = async () => {
      try {
        const savedRestaurantString = await AsyncStorage.getItem(
          "savedRestaurant"
        );
        if (savedRestaurantString) {
          const restaurant = JSON.parse(savedRestaurantString);
          setSavedRestaurant(restaurant);
          setRestaurantTitle(restaurant.name);
          setRestaurantLogo(restaurant.photo);
        }
      } catch (error) {
        console.error("Error loading restaurant from AsyncStorage:", error);
      }
    };

    loadCartFromStorage();
    loadRestaurantFromStorage();
  }, []);

  useEffect(() => {
    const updateCart = async () => {
      setLoading(true);
      try {
        const savedCartString = await AsyncStorage.getItem("cart");
        const savedCart = savedCartString ? JSON.parse(savedCartString) : [];

        const savedRestaurantString = await AsyncStorage.getItem(
          "savedRestaurant"
        );
        const savedRestaurant = savedRestaurantString
          ? JSON.parse(savedRestaurantString)
          : null;
        setSavedRestaurant(savedRestaurant);

        if (productId && productName && productPrice) {
          const newProduct: CartItem = {
            id: productId,
            name: productName,
            image: productImage || "",
            description: productDescription || "",
            price: parseFloat(productPrice) || 0,
            quantity: parseInt(quantity, 10) || 1,
          };

          const updatedRestaurant = { id: restaurantId, name: restaurantName, photo: restaurantPhoto };
          if (savedCart.length === 0) {
            const newCart = [newProduct];
            await AsyncStorage.setItem("cart", JSON.stringify(newCart));
            await AsyncStorage.setItem(
              "savedRestaurant",
              JSON.stringify(updatedRestaurant)
            );
            setCart(newCart);
            setSavedRestaurant(updatedRestaurant);
            setRestaurantTitle(updatedRestaurant.name);
            setRestaurantLogo(updatedRestaurant.photo);
          } else {
            const isDifferentRestaurant =
              savedRestaurant && savedRestaurant.id !== restaurantId;

            if (isDifferentRestaurant) {
              Alert.alert(
                "Substituir carrinho?",
                "O carrinho atual pertence a um restaurante diferente. Deseja substituir o carrinho atual pelos itens deste novo restaurante?",
                [
                  {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Sim",
                    onPress: async () => {
                      const newCart = [newProduct];
                      await AsyncStorage.setItem(
                        "cart",
                        JSON.stringify(newCart)
                      );
                      await AsyncStorage.setItem(
                        "savedRestaurant",
                        JSON.stringify(updatedRestaurant)
                      );
                      setCart(newCart);
                      setSavedRestaurant(updatedRestaurant);
                      setRestaurantTitle(updatedRestaurant.name);
                      setRestaurantLogo(updatedRestaurant.photo);
                    },
                  },
                ]
              );
            } else {
              const existingProductIndex = savedCart.findIndex(
                (item) => item.id === newProduct.id
              );

              if (existingProductIndex !== -1) {
                const updatedCart = savedCart.map((item, index) =>
                  index === existingProductIndex
                    ? { ...item, quantity: item.quantity + newProduct.quantity }
                    : item
                );
                await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
                setCart(updatedCart);
              } else {
                const newCart = [...savedCart, newProduct];
                await AsyncStorage.setItem("cart", JSON.stringify(newCart));
                setCart(newCart);
              }

              await AsyncStorage.setItem(
                "savedRestaurant",
                JSON.stringify(updatedRestaurant)
              );
              setSavedRestaurant(updatedRestaurant);
              setRestaurantTitle(updatedRestaurant.name);
              setRestaurantLogo(updatedRestaurant.photo); 
            }
          }
        }
      } catch (error) {
        console.error("Erro ao atualizar o carrinho:", error);
      } finally {
        setLoading(false);
      }
    };

    updateCart();
  }, [
    productId,
    productName,
    productImage,
    productDescription,
    productPrice,
    quantity,
    restaurantId,
    restaurantPhoto,
  ]);

  const handleIncrease = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateQuantity &&
        updateQuantity(
          productId,
          updatedCart.find((item) => item.id === productId)?.quantity || 1
        );
      return updatedCart;
    });
  };

  const handleDecrease = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      updateQuantity &&
        updateQuantity(
          productId,
          updatedCart.find((item) => item.id === productId)?.quantity || 1
        );
      return updatedCart;
    });
  };

  const handleRemove = async (productId: string) => {
    try {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((item) => item.id !== productId);
        removeItem && removeItem(productId);
        return updatedCart;
      });

      await AsyncStorage.setItem(
        "cart",
        JSON.stringify(cart.filter((item) => item.id !== productId))
      );
    } catch (error) {
      console.error("Erro ao remover o item do AsyncStorage:", error);
    }
  };

  const radioButtons = [
    {
      id: "1",
      label: "Cartão de Crédito",
      value: "CARTAO_CREDITO",
      color: "#24a645",
      borderColor: "#fff",
      labelStyle: { color: "#fff" },
    },
    {
      id: "2",
      label: "PIX",
      value: "PIX",
      color: "#24a645",
      borderColor: "#fff",
      disabled: false,
      labelStyle: { color: "#fff" },
    },
    {
      id: "3",
      label: "Dinheiro",
      value: "DINHEIRO",
      color: "#24a645",
      borderColor: "#fff",
      labelStyle: { color: "#fff" },
    },
  ];

  const handleAddress = () => {
    router.push("../addresses");
  };

  const cartTotalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const submitOrder = async () => {
    setLoading(true);
    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (!storedData) {
        Alert.alert("Erro", "Informações do usuário não encontradas.");
        return;
      }
  
      const userData = JSON.parse(storedData);
      const clientId = userData.id;
      const restaurantId = savedRestaurant?.id;
  
      if (!clientId || !restaurantId) {
        Alert.alert("Erro", "Informações insuficientes para enviar o pedido.");
        return;
      }
  
      const orderData = {
        clienteId: clientId,
        restauranteId: restaurantId,
        formaPgto: selectedId,
        observacao: "Entregar no horário combinado.",
        itens: cart.map(item => ({
          produtoId: item.id,
          quantidade: item.quantity,
        })),
      };
  
      console.log("Enviando dados do pedido:", orderData);
  
      const response = await fetch(`https://api-1-drn7.onrender.com/api/pedido?clienteId=${clientId}&restauranteId=${restaurantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
  
      console.log("Resposta da API:", response);
  
      if (response.ok) {
        const result = await response.json();
        console.log("Resultado do pedido:", result);

        await AsyncStorage.setItem('orderData', JSON.stringify({
          ...orderData,
          id: result.id 
        }));
  
        // Passar o resultado da API para a tela de revisão
        router.push({
          pathname: "../orderReview",
        });
  
        // Limpar o carrinho
        setCart([]);
        await AsyncStorage.setItem("cart", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
    } finally {
      setLoading(false);
    }
  };  

  const review = () => {
    submitOrder();
  };

  return (
    <View className="flex-1 bg-[#2c2d33]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#24a645" />
          </View>
        ) : cart.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-[#fff] text-lg">
              Seu carrinho está vazio :(
            </Text>
          </View>
        ) : (
          <>
            <View className="py-6 px-4 flex-1">
              <TouchableOpacity>
                <View className="flex-row items-center gap-4">
                  <ImagePickerComponent
                    imageUri={restaurantLogo}
                    style={{ width: 50, height: 50 }}
                    imageStyle={{ borderRadius: 16 }}
                  />
                  <Text className="text-[24px] font-bold text-[#fff]">
                    {restaurantTitle}
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="my-4 pt-4">
                <Text className="text-[22px] font-bold text-[#fff]">
                  Itens adicionados
                </Text>
                {cart.length > 0 ? (
                  cart.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      onIncrease={() => handleIncrease(product.id)}
                      onDecrease={() => handleDecrease(product.id)}
                      onRemove={() => handleRemove(product.id)}
                    />
                  ))
                ) : (
                  <Text className="text-[#fff]">Nenhum item no carrinho.</Text>
                )}
              </View>

              <View className="items-center py-4">
                <CustomInput
                  titleInput="Cupom"
                  placeholder="Insira um cupom promocional"
                />
                <ButtonCustom texto="Inserir cupom" />
              </View>

              <View className="h-[104px]">
                <Text className="text-[22px] font-bold text-[#fff] pb-4">
                  Forma de pagamento
                </Text>
                <View className="items-center">
                  <RadioGroup
                    layout="row"
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                  />
                </View>
              </View>

              <View className="my-4">
                <ScrollView>
                  <Text className="text-[22px] font-bold text-[#fff] pb-4">
                    Endereço de entrega
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {savedAddress ? (
                      <AddressCard
                        icon={getIconForType(savedAddress.tipo)}
                        title={savedAddress.tipo || "Endereço"}
                        address={`${savedAddress.rua}, ${savedAddress.numero}, ${savedAddress.bairro}, ${savedAddress.cidade} - ${savedAddress.estado}`}
                        complement={
                          savedAddress.complemento ||
                          "Complemento não especificado"
                        }
                      />
                    ) : (
                      <ButtonCustom
                        texto="Adicionar endereço"
                        onPress={handleAddress}
                      />
                    )}
                  </View>
                </ScrollView>
              </View>

              <View className="justify-between flex-1 pb-[50px]">
                <View className="gap-2">
                  <Text className="text-[22px] font-bold text-[#fff]">
                    Resumo de pedido
                  </Text>
                  <View className="flex-row justify-between">
                    <Text className="font-bold text-[#fff]">Subtotal</Text>
                    <Text className="font-bold text-[#fff]">
                      R$ {cartTotalPrice.toFixed(2)}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="font-bold text-[#fff]">Taxas</Text>
                    <Text className="font-bold text-[#fff]">R$ 0,00</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-[22px] font-bold text-[#24A645]">
                      Total
                    </Text>
                    <Text className="text-[22px] font-bold text-[#24A645]">
                      R$ {cartTotalPrice.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View className="items-center my-6">
                  <ButtonCustom texto="Finalizar pedido" onPress={review} loading={loading} />
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
}
