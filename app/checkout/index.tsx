import ButtonCustom from 'components/ButtonCustom';
import CustomInput from 'components/customInput';
import Footer from 'components/Footer';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Checkout() {
  return (
    <View className="flex-1 bg-[#2c2d33]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="py-6 px-4 flex-1">
          <TouchableOpacity>
            <View className="flex-row items-center gap-4">
              <Image className="w-[64px] h-[64px]" source={require('../../assets/images/restaurante/checkoutImg.png')} />
              <Text className="text-[24px] font-bold text-[#fff]">Rabanette</Text>
            </View>
          </TouchableOpacity>

          <View className="my-4">
            <Text className="text-[16px] font-bold text-[#fff]">Itens adicionados</Text>
            <ScrollView>
              <View className="flex-row justify-between py-4">
                <View className="flex-row justify-between flex-1">
                  <Image source={require('../../assets/images/restaurante/checkoutImgTwo.png')} />
                  <View className="justify-between mx-2 flex-1">
                    <View>
                      <Text className="text-[16px] font-bold text-[#fff]">Rabanette</Text>
                      <Text className="text-[12px] text-[#fff]">Embalagem 67g</Text>
                    </View>
                    <Text className="text-[12px] text-[#24A645]">R$ 2,99</Text>
                  </View>
                </View>

                <View className="flex-row gap-2 items-center">
                  <TouchableOpacity>
                    <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
                      <Text className="text-[#1C4F2A] text-[24px]">-</Text>
                    </View>
                  </TouchableOpacity>
                  <Text className="text-[#fff]">1</Text>
                  <TouchableOpacity>
                    <View className="bg-[#24A645] w-[32px] h-[32px] rounded-full justify-center items-center">
                      <Text className="text-[#1C4F2A] text-[24px]">+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <View className="items-center py-4">
              <CustomInput titleInput="Cupom" placeholder="Insira um cupom promocional" />
              <ButtonCustom texto="Inserir cupom" />
            </View>
          </View>

          <View className="justify-between flex-1 pb-[50px]">
            <Text className="text-[16px] font-bold text-[#fff]">Forma de pagamento</Text>

            <View className="gap-2">
              <Text className="text-[16px] font-bold text-[#fff]">Resumo de pedido</Text>
              <View className="flex-row justify-between">
                <Text className="font-bold text-[#fff]">Subtotal</Text>
                <Text className="font-bold text-[#fff]">R$ 2,99</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold text-[#fff]">Cupom</Text>
                <Text className="font-bold text-[#fff]">R$ 0,00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold text-[#fff]">Taxa de entrega</Text>
                <Text className="font-bold text-[#24A645]">Grátis</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold text-[#fff]">Total</Text>
                <Text className="font-bold text-[#fff]">R$ 2,99</Text>
              </View>

              <View className="flex-row justify-between pt-4">
                <View>
                  <Text className="text-[18px] font-bold text-[#fff]">Total a pagar</Text>
                  <Text className="text-[#fff]">R$ 2,99 | 1 item</Text>
                </View>
                <TouchableOpacity>
                  <View className="flex-row w-[192px] h-[40px] bg-[#24a645] items-center justify-between px-4 rounded-[8px]">
                    <Text className="text-[12px] text-[#fff]">Continuar</Text>
                    <Text className="text-[#fff]"> 2,99</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
