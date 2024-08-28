import { TouchableOpacity } from 'react-native';
import { Text, Image } from 'tamagui';
import { View } from 'react-native';

interface CardRestaurantPageProps {
  source?: any;
  titulo?: string;
  valorUnitario?: string;
  onPress?: any;
}

export default function CardRestaurantPage({ source, titulo, valorUnitario, onPress }: CardRestaurantPageProps) {

  return (
    <TouchableOpacity onPress={onPress}>
      <View className="pl-2">
        <Image className="w-[160px] h-[148px] rounded-2xl" source={source} />
        <Text className="text-[#24A645] text-[16px] pt-2">{valorUnitario}</Text>
        <Text className="text-[#fff] text-[16px] font-bold">{titulo}</Text>
      </View>
    </TouchableOpacity>
  );
}
