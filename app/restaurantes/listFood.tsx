import { TouchableOpacity, View } from 'react-native';
import { Text, Image } from 'tamagui';

interface CardRestaurantPageProps {
  source?: any;
  title?: string;
  description?: string;
  price?: string;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export default function ListagemCardapio({ source, title, description, price = '0' }: CardRestaurantPageProps) {
  const numericPrice = parseFloat(price);

  return (
    <TouchableOpacity>
      <View className="flex-row mb-6 px-6">
        <View className="flex-row justify-between w-full">
          <View className="justify-center">
            <Text className="text-[#fff] text-[16px] font-bold">{title}</Text>
            <Text className="text-[#fff] text-[12px]">{description}</Text>
            <Text className="text-[#24A645] text-[16px] pt-2">{formatPrice(numericPrice)}</Text>
          </View>
          <Image source={source} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
