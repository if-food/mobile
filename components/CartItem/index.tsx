// CartItem.tsx
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useCart } from "context/CartContext";

interface CartItemProps {
  productName: string;
  productImage?: string;
  productPrice: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  productName,
  productImage,
  productPrice,
  quantity,
}) => {
  const { updateQuantity, removeItem } = useCart();
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const displayProductPrice = parseFloat(productPrice);

  const updateLocalQuantity = (newQuantity: number) => {
    const validQuantity = Math.max(1, newQuantity);

    setLocalQuantity(validQuantity);
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

  return (
    <View className="flex-row justify-between py-4">
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
          <Text className="text-[16px] font-bold text-[#fff]">{productName}</Text>
          <Text className="text-[12px] text-[#fff]">Embalagem 67g</Text>
        </View>
        <Text className="text-[12px] text-[#24A645]">
          R$ {displayProductPrice.toFixed(2)}
        </Text>
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
  );
};

export default CartItem;
