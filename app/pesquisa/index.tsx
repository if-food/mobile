import CustomInput from 'components/customInput';
import { View } from 'react-native';
import Footer from './../../components/Footer/index';

export default function Pesquisa() {
  return (
    <View className="flex-1 justify-between items-center bg-[#2c2d33] pt-[24px]">
      <CustomInput
        titleInput="Pesquise por um restaurante"
        placeholder="Qual o pedido para hoje?"
      />

      <Footer />
    </View>
  );
}
