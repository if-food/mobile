import { TouchableOpacity } from 'react-native';
import { Text, Image } from 'tamagui';
import { View } from 'react-native';

interface CardRestaurantPageProps {
  source?: any;
  title?: string;
  price?: string;
  onPress?: any;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export default function CardRestaurantPage({ source, title, price = '0', onPress }: CardRestaurantPageProps) {
  const numericPrice = parseFloat(price);

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="pl-3">
        <Image className="w-[160px] h-[148px] rounded-2xl" source={source} />
        <Text className="text-[#24A645] text-[16px] pt-2">{formatPrice(numericPrice)}</Text>
        <Text className="text-[#fff] text-[16px] font-bold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
