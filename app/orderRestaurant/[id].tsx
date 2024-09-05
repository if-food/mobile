import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Footer from 'components/Footer';

export default function OrderRestaurant() {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const { productName, productImage, productDescription, productPrice, quantity: initialQuantity, restaurantName, restaurantId } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(parseInt(initialQuantity as string, 10) || 1);
  const productPriceNum = parseFloat(productPrice as string) || 0;
  const totalPrice = productPriceNum * quantity;

  const goToCheckout = () => {
    const productImagePath = Array.isArray(productImage) ? productImage[0] : productImage;
    const productPriceStr = productPriceNum.toFixed(2);
    const totalPriceStr = totalPrice.toFixed(2);
  
    const queryParams = new URLSearchParams({
      productId: productId as string,
      productName: productName as string,
      productImage: productImagePath || '',
      productDescription: productDescription as string || '',
      productPrice: productPriceStr,
      quantity: quantity.toString(),
      totalPrice: totalPriceStr,
      restaurantName: restaurantName as string,
      restaurantId: restaurantId as string
    }).toString();
  
    router.push(`../checkout?${queryParams}`);
  };

  return (
    <View className="flex-1 bg-[#2c2d33]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image source={productImage ? { uri: Array.isArray(productImage) ? productImage[0] : productImage } : require('../../assets/images/restaurante/rabanete.png')} />
        <View className="px-4 py-4">
          <View>
            <Text className="text-[40px] font-bold text-[#fff]">{productName}</Text>
            <Text className="text-[18px] text-[#fff]">{productDescription}</Text>
            <Text className="text-[18px] text-[#24A645] font-bold">R$ {productPriceNum.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-4 py-2 mb-16">
        <View className="flex-row justify-between items-center h-[40px]">
          <View className="flex-row gap-2 items-center">
            <TouchableOpacity onPress={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
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
