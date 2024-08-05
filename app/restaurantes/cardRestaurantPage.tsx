import { TouchableOpacity } from 'react-native';
import { View, Text, Image } from 'tamagui';

interface CardRestaurantPageProps {
  source?: any;
  title?: string;
  price?: string;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export default function CardRestaurantPage({
  source,
  title,
  price = '0',
}: CardRestaurantPageProps) {
  const numericPrice = parseFloat(price);

  return (
    <TouchableOpacity>
      <View className="px-2">
        <Image className="w-[160px] h-[148px] rounded-2xl" source={source} />
        <Text className="text-[#24A645] text-[16px] pt-2">
          {formatPrice(numericPrice)}
        </Text>
        <Text className="text-[#fff] text-[16px] font-bold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
