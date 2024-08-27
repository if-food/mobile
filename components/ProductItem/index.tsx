import { View, Text, Image, TouchableOpacity } from 'react-native';

const ProductItem = ({ productImage, productName, productDescription, productPrice, quantity, onIncrease, onDecrease }) => {
  return (
    <View className="flex-row justify-between py-4">
      <View className="flex-row justify-between flex-1">
        <Image
          source={productImage ? { uri: productImage } : require('../../assets/images/restaurante/checkoutImg.png')}
          style={{ width: 64, height: 64 }}
        />
        <View className="justify-between mx-2 flex-1">
          <View>
            <Text className="text-[16px] font-bold text-[#fff]">{productName || 'Produto'}</Text>
            <Text className="text-[12px] text-[#fff]">{productDescription}</Text>
          </View>
          <Text className="text-[12px] text-[#24A645]">R$ {productPrice.toFixed(2)}</Text>
        </View>
      </View>

      <View className="flex-row gap-2 items-center">
        <TouchableOpacity onPress={onDecrease}>
          <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
            <Text className="text-[#1C4F2A] text-[24px]">-</Text>
          </View>
        </TouchableOpacity>
        <Text className="text-[#fff]">{quantity}</Text>
        <TouchableOpacity onPress={onIncrease}>
          <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
            <Text className="text-[#1C4F2A] text-[24px]">+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductItem;
