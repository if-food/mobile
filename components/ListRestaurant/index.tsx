import { View, Image, Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';

interface ListRestaurant {
  source?: any;
  titleRestaurant?: string;
  onPress?: any;
  rating?: string;
  distance?: string;
  price?: string;
}

export default function ListRestaurant({ source, titleRestaurant = 'titulo', onPress, distance = '0', price = '0,0' }: ListRestaurant) {
  return (
    <TouchableOpacity className="flex-row items-center h-[70px] mb-10" onPress={onPress}>
      <View>
        <Image className="w-[64px] h-[64px] rounded-full" source={source} />
      </View>
      <View className="pl-4 h-full justify-center">
        <Text className="text-[#fff] text-[20px] font-bold">{titleRestaurant}</Text>
        <View className="flex-row items-center">
          <Text className="text-[#fff] text-[12px]">{titleRestaurant}</Text>
          <Text className="text-[#fff] text-[12px]"> - </Text>
          <Text className="text-[#fff] text-[12px]">Comida local*</Text>
          <Text className="text-[#fff] text-[12px]"> - </Text>
          <Text className="text-[#fff] text-[12px]">{distance}</Text>
          <Text className="text-[#fff] text-[12px]">{' '}km</Text>
        </View>
        <View className='flex-row'>
          <Text className="text-[#fff] text-[12px]">{titleRestaurant}</Text>
          <Text className="text-[#fff] text-[12px]"> - </Text>
          <Text className="text-[#24A645] text-[12px]">R$ {' '}</Text>
          <Text className="text-[#24A645] text-[12px] font-bold">{(price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
