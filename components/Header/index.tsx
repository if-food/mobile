import { Image, Text } from 'tamagui';
import { View, Pressable, TouchableOpacity } from 'react-native';
import Bag from '../../assets/images/header_component/bag.png';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { loadSavedAddress, abbreviateAddress } from 'utils/addressUtils'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Header() {
  const [count, setCount] = useState(0);
  const [savedAddress, setSavedAddress] = useState<string | null>(null);
  const router = useRouter();

  const handlePress = () => {
    router.push('../checkout');
  };

  const handleAddresses = () => {
    router.push('../addresses');
  };

  useEffect(() => {
    loadSavedAddress(setSavedAddress);
  }, []);

  if (count > 10) setCount(0);

  return (
    <View className="h-[60] w-full bg-[#24A645] mt-7 flex-row items-center justify-between rounded-bl-[24px] rounded-br-[24px]">
      <View className="flex-none px-7">
        <Text className="text-white text-[16px]">{'   '}</Text>
      </View>

      <Pressable onPress={handleAddresses}>
        <View className="flex-row items-center">
          <MaterialIcons name="location-on" size={24} color="#fff" />
          {savedAddress ? ( 
            <Text className="text-white p-1">
              {abbreviateAddress(savedAddress)}
            </Text>
          ) : ( 
            <Text className="text-white p-1">
              Explore novos lugares!
            </Text>
          )}
        </View>
      </Pressable>

      <View className="px-7">
        <TouchableOpacity onPress={handlePress}>
          <Image className="relative w-[20px] h-[24px]" source={Bag} />
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
