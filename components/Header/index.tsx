import { Image, Text, View } from 'tamagui';
import Bag from '../../assets/images/header_component/bag.png';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  // Adiciona um estado para armazenar o valor do contador
  const [count, setCount] = useState(0);

  // Função que incrementa o valor do contador
  const handlePress = () => {
    setCount(count + 1);
  };

  if (count > 10) setCount(0);

  return (
    <View className="h-[60] w-full bg-[#24A645] mt-7 flex-row items-center justify-between rounded-bl-[24px] rounded-br-[24px]">
      <View className="flex-none px-7">
        <Text className="text-white text-[16px]">{'            '}</Text>
      </View>

      <View className="flex-row items-center">
        <Text className="text-white">{title} {' '}</Text>
        <Image className='w-[9px] h-[13px]' source={require('../../assets/images/header_component/map_pin.png')}></Image>
      </View>

      <View className="px-7">
        <TouchableOpacity onPress={handlePress}>
          <Image className=" relative w-[20px] h-[24px]" source={Bag} />
          {count ? <View className='absolute right-[-8px] top-[-8px] bg-[#027333] rounded-full w-[16px] h-[16px]'>
            <View className='items-center justify-center'><Text className="text-[10px] pt-[2px] text-white">{count}</Text></View>
          </View> : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}
