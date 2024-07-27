import { View, Image, Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';

interface ListRestaurant {
  source?: any;
  titleRestaurant?: string;
  onPress?: any;
  rating?: string;
}

export default function ListRestaurant({ source, titleRestaurant, onPress }: ListRestaurant) {
  return (
    <TouchableOpacity className="flex-row pb-6 items-center" onPress={onPress}>
      <View>
        <Image className="w-[64px] h-[64px] rounded-full" source={source} />
      </View>
      <View className="pl-4">
        <Text className="text-[#fff] text-[24px] font-bold">{titleRestaurant}</Text>
        <View className="flex-row items-center">
          <Text className="text-[#fff] text-[8px]">{titleRestaurant}</Text>
          <Text className="text-[#fff]"> - </Text>
          <Text className="text-[#fff] text-[8px]">{titleRestaurant}</Text>
          <Text className="text-[#fff]"> - </Text>
          <Text className="text-[#fff] text-[8px]">{titleRestaurant}</Text>
        </View>
        <View className='flex-row items-center'>
          <Text className="text-[#fff] text-[8px]">{titleRestaurant}</Text>
          <Text className="text-[#fff]"> - </Text>
          <Text className="text-[#24A645] text-[8px]">{titleRestaurant}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
