import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Footer from 'components/Footer';

export default function OrderRestaurant() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const productPrice = 2.99;
  const totalPrice = productPrice * quantity;

  const goToCheckout = () => {
    const productName = 'Rabanete';
    const productImage = '../../assets/images/restaurante/rabanete.png';
    const productPriceStr = productPrice.toFixed(2);
    const totalPriceStr = totalPrice.toFixed(2);

    const queryParams = new URLSearchParams({
      productName,
      productImage,
      productPrice: productPriceStr,
      quantity: quantity.toString(),
      totalPrice: totalPriceStr,
    }).toString();

    router.push(`../checkout?${queryParams}`);
  };

  return (
    <View className="flex-1 bg-[#2c2d33]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image source={require('../../assets/images/restaurante/rabanete.png')} />
        <View className="px-4 py-4">
          <View>
            <Text className="text-[40px] font-bold text-[#fff]">Rabanete</Text>
            <Text className="text-[18px] text-[#fff]">Rabanete tirado de terras finas.</Text>
            <Text className="text-[18px] text-[#24A645] font-bold">R$ 2,99</Text>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-4 py-2 mb-16">
        <View className="flex-row justify-between items-center h-[40px]">
          <View className="flex-row gap-2 items-center">
            <TouchableOpacity onPress={() => setQuantity(quantity - 1)}>
              <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
                <Text className="text-[#1C4F2A] text-[24px]">-</Text>
              </View>
            </TouchableOpacity>
            <Text className="text-[#fff]">{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
                <Text className="text-[#1C4F2A] text-[24px]">+</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={goToCheckout}>
            <View className="flex-row w-[192px] h-[40px] bg-[#24a645] items-center justify-between px-4 rounded-[8px]">
              <Text className="text-[12px] text-[#fff]">Continuar</Text>
              <Text className="text-[#fff]"> R$ {totalPrice.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
}
