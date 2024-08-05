import { Image, Text, View } from 'tamagui';
import { useRouter } from 'expo-router';
import home from '../../assets/images/footer_component/home.png';
import search from '../../assets/images/footer_component/search.png';
import orders from '../../assets/images/footer_component/orders.png';
import profile from '../../assets/images/footer_component/profile.png';
import { TouchableOpacity } from 'react-native';

export default function Footer() {
  const router = useRouter();

  const goToOrders = () => {
    router.push('../registroPedidos');
  };

  const goToHome = () => {
    router.push('../home');
  };

  const goToSearch = () => {
    router.push('../pesquisa');
  };

  return (
    <View className="h-[60] w-full bg-[#24A645] flex-row items-center justify-evenly rounded-tl-[24px] rounded-tr-[24px] absolute bottom-0">
      <TouchableOpacity onPress={goToHome}>
        <View className="flex-none px-7">
          <Image source={home} className="w-[24px] h-[24px]" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToSearch}>
        <View className="flex-none px-7">
          <Image source={search} className="w-[24px] h-[24px]" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToOrders}>
        <View className="flex-none px-7">
          <Image source={orders} className="w-[18px] h-[24px]" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View className="flex-none px-7">
          <Image source={profile} className="w-[24px] h-[24px]" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
