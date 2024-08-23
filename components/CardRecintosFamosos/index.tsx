import { Text, Image } from 'tamagui';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface Card {
  source?: any;
  titleRestaurant?: string;
  onPress?: any;
}

export default function CardRecintosFamosos({ source, titleRestaurant, onPress }: Card) {
  return (
    <View className="items-center px-2">
      <TouchableOpacity className="items-center" onPress={onPress}>
        <Image className="w-16 h-15 mb-2" source={source} />
        <Text className="text-[16px] text-[#fff] font-bold">{titleRestaurant}</Text>
      </TouchableOpacity>
    </View>
  );
}
