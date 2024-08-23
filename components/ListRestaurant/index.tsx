import { Image, Text } from 'tamagui';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface ListRestaurant {
  source?: any;
  titleRestaurant?: string;
  onPress?: any;
  rating?: string;
  categoriasEnum?: string;
}

export default function ListRestaurant({ source, titleRestaurant = 'titulo', onPress, categoriasEnum }: ListRestaurant) {
  return (
    <TouchableOpacity className="flex-row items-center h-[70px] mb-10" onPress={onPress}>
      <View>
        <Image className="w-[64px] h-[64px] rounded-full" source={source} />
      </View>
      <View className="pl-4 h-full justify-center">
        <Text className="text-[#fff] text-[20px] font-bold">{titleRestaurant}</Text>
        <View className="flex-row items-center">
          <Text className="text-[#fff] text-[12px]">{categoriasEnum}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
