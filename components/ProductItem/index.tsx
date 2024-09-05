import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ProductItemProps {
  product: {
    name: string;
    image: string;
    description: string;
    price: number;
    quantity: number;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function ProductItem({ product, onIncrease, onDecrease, onRemove }: ProductItemProps) {
  return (
    <View className="flex-row justify-between py-4">
      <View className="flex-row justify-between flex-1">
        <Image
          source={product.image ? { uri: product.image } : require("../../assets/images/restaurante/checkoutImg.png")}
          style={{ width: 64, height: 64 }}
        />
        <View className="justify-between mx-2 flex-1">
          <View>
            <Text className="text-[16px] font-bold text-[#fff]">{product.name}</Text>
            <Text className="text-[12px] text-[#fff]">{product.description}</Text>
          </View>
          <Text className="text-[12px] text-[#24A645]">R$ {product.price.toFixed(2)}</Text>
        </View>
      </View>

      <View className="flex-row gap-2 items-center">
        <TouchableOpacity onPress={onDecrease}>
          {product.quantity > 1 ? (
            <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
              <Text className="text-[#1C4F2A] text-[24px]">-</Text>
            </View>
          ) : (
            <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
              <Icon name="trash" size={20} color="#1C4F2A" onPress={onRemove} />
            </View>
          )}
        </TouchableOpacity>
        <Text className="text-[#fff]">{product.quantity}</Text>
        <TouchableOpacity onPress={onIncrease}>
          <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
            <Text className="text-[#1C4F2A] text-[24px]">+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
