import { useContext, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import ProductItem from "components/ProductItem";
import Footer from "components/Footer";
import { useRouter } from "expo-router";
import { CartContext } from "context/CartContext";
import ButtonCustom from "components/ButtonCustom";
import AddressCard from "components/AddressCard";
import { getIconForType } from "utils/formatters";
import { RadioGroup } from "react-native-radio-buttons-group";
import CustomInput from "components/customInput";

interface CartItem {
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}

export default function Checkout() {
  const { updateQuantity, removeItem } = useContext(CartContext) || {};
  const route = useRoute();
  const router = useRouter();
  const {
    productName,
    productImage,
    productDescription,
    productPrice,
    quantity,
    restaurantName,
  }: any = route.params || {};
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [savedAddress, setSavedAddress] = useState<any>(null);

  useEffect(() => {
    if (
      productName &&
      productImage &&
      productDescription &&
      productPrice &&
      quantity
    ) {
      const newProduct: CartItem = {
        name: productName,
        image: productImage,
        description: productDescription,
        price: parseFloat(productPrice),
        quantity: parseInt(quantity, 10),
      };
      handleAddProduct(newProduct);
    }
  }, [productName, productImage, productDescription, productPrice, quantity]);

  useEffect(() => {
    const loadCartFromStorage = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Error loading cart from AsyncStorage:", error);
      }
    };

    loadCartFromStorage();
  }, []);

  useEffect(() => {
    const saveCartToStorage = async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to AsyncStorage:", error);
      }
    };

    saveCartToStorage();
  }, [cart]);

  const handleAddProduct = (newProduct: CartItem) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.name === newProduct.name
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.name === newProduct.name
            ? { ...item, quantity: item.quantity + newProduct.quantity }
            : item
        );
      } else {
        return [...prevCart, newProduct];
      }
    });
  };

  const handleIncrease = (productName: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateQuantity &&
        updateQuantity(
          productName,
          updatedCart.find((item) => item.name === productName)?.quantity || 1
        );
      return updatedCart;
    });
  };

  const handleDecrease = (productName: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.name === productName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      updateQuantity &&
        updateQuantity(
          productName,
          updatedCart.find((item) => item.name === productName)?.quantity || 1
        );
      return updatedCart;
    });
  };

  const handleRemove = (productName: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.name !== productName);
      removeItem && removeItem(productName);
      return updatedCart;
    });
  };

  const radioButtons = [
    {
      id: "1",
      label: "Cartão",
      value: "Cartão",
      color: "#24a645",
      borderColor: "#fff",
      labelStyle: { color: "#fff" },
      descriptionStyle: { color: "#fff" },
    },
    {
      id: "2",
      label: "PIX",
      value: "PIX",
      color: "#24a645",
      borderColor: "#fff",
      disabled: true,
      labelStyle: { color: "#fff" },
    },
    {
      id: "3",
      label: "Pagamento na entrega",
      value: "Pagamento na entrega",
      color: "#24a645",
      borderColor: "#fff",
      labelStyle: { color: "#fff" },
    },
  ];

  const review = () => {
    router.push("../orderReview");
  };

  const cartTotalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <View className="flex-1 bg-[#2c2d33]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-6 px-4 flex-1">
          <TouchableOpacity>
            <View className="flex-row items-center gap-4">
              <Image
                className="w-[64px] h-[64px]"
                source={require("../../assets/images/restaurante/checkoutImg.png")}
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
            {cart.map((product) => (
              <ProductItem
                key={product.name}
                product={product}
                onIncrease={() => handleIncrease(product.name)}
                onDecrease={() => handleDecrease(product.name)}
                onRemove={() => handleRemove(product.name)}
              />
            ))}
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
            <RadioGroup
              layout="row"
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
            />
          </View>

          <View className="my-4">
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
                    savedAddress.complemento || "Complemento não especificado"
                  }
                />
              ) : (
                <Text className="text-[#fff]">Nenhum endereço salvo.</Text>
              )}
            </View>
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
                <Text className="font-bold text-[#fff]">Cupom</Text>
                <Text className="font-bold text-[#fff]">R$ 0,00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold text-[#fff]">Frete</Text>
                <Text className="font-bold text-[#fff]">R$ 0,00</Text>
              </View>
              <View className="flex-row justify-between pt-2 border-t border-t-[#fff]">
                <Text className="text-[22px] font-bold text-[#24A645]">
                  Total
                </Text>
                <Text className="text-[22px] font-bold text-[#24A645]">
                  R$ {cartTotalPrice.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="items-center my-6">
              <ButtonCustom texto="Finalizar pedido" onPress={review} />
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
