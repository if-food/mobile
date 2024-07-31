import Footer from 'components/Footer';
import { View, Text, Image } from 'tamagui';

export default function Restaurantes() {
  return (
    <View className="flex-1 bg-[#2c2d33] pt-[40px]">
      <Image source={require('../../assets/images/restaurante/banner.png')} />
      <View className="px-6 pt-6 flex-row justify-between items-center">
        <View>
          <Text className="text-white font-bold text-[32px]">Rabanette</Text>
          <Text className="text-white text-[12px]">
            Comida natural - 1,4 km{' '}
          </Text>
          <Text className="text-[#24A645] font-bold text-[12px]">Aberto</Text>
        </View>

        <Image
          source={require('../../assets/images/restaurante/restaurantProfile.png')}
        />
      </View>

      <Footer />
    </View>
  );
}
