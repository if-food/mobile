import { Image, Text } from 'tamagui';
import { View, Pressable } from 'react-native';
import Bag from '../../assets/images/header_component/bag.png';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';


interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [count, setCount] = useState(0);
  const router = useRouter();

  const handlePress = () => {
    router.push('../checkout');
  };

  const handleAddresses = () => {
    router.push('../addresses');
  };

  if (count > 10) setCount(0);

  return (
    <View className="h-[60] w-full bg-[#24A645] mt-7 flex-row items-center justify-between rounded-bl-[24px] rounded-br-[24px]">
      <View className="flex-none px-7">
        <Text className="text-white text-[16px]">{'            '}</Text>
      </View>

      <View className="flex-row items-center">
        <Pressable onPress={handleAddresses}>
          <Text className="text-white">{title} </Text>
          <Image className="w-[9px] h-[13px]" source={require('../../assets/images/header_component/map_pin.png')}></Image>
        </Pressable>
      </View>

      <View className="px-7">
        <TouchableOpacity onPress={handlePress}>
          <Image className=" relative w-[20px] h-[24px]" source={Bag} />
          {count ? (
            <View className="absolute right-[-8px] top-[-8px] bg-[#027333] rounded-full w-[16px] h-[16px]">
              <View className="items-center justify-center">
                <Text className="text-[10px] pt-[2px] text-white">{count}</Text>
              </View>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}
