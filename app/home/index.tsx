import Footer from 'components/Footer';
import Header from 'components/Header';
import { ScrollView, Image, View, Text } from 'react-native';

// Importando a imagem
import imageOne from '../../assets/images/home/imageOne.png';
import CardRecintosFamosos from 'components/CardRecintosFamosos';
import ListRestaurant from 'components/ListRestaurant';

export default function Home() {
  return (
    <View className="flex-1  items-center justify-start bg-[#2c2d33]">
      <Header title="Av bulhões 77" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <View className="w-full items-center mt-4 px-6">
          <Image source={imageOne} style={{ width: 320, height: 160 }} />

          <View className="items-start w-full h-full">
            <Text className="text-[#fff] pt-[40px] text-[24px] font-bold pb-4">Recintos famosos</Text>
            <View className='w-full flex-row justify-between pb-10'>
              <CardRecintosFamosos titleRestaurant="Da terra" source={require('../../assets/images/home/card_one.png')} />
              <CardRecintosFamosos titleRestaurant="Rabanette" source={require('../../assets/images/home/card_two.png')} />
              <CardRecintosFamosos titleRestaurant="Sacia Fome" source={require('../../assets/images/home/card_three.png')} />
              <CardRecintosFamosos titleRestaurant="Don Verde" source={require('../../assets/images/home/card_four.png')} />
            </View>
            <View>
              <ListRestaurant source={require('../../assets/images/home/rouned_one.png')} titleRestaurant='Folha verde' distance='6,8' price='38,90'/>
              <ListRestaurant source={require('../../assets/images/home/rouned_two.png')} titleRestaurant='Rabanette' price='99,50'/>
              <ListRestaurant source={require('../../assets/images/home/rouned_three.png')} titleRestaurant='Sacia Fome'/>
              
              <ListRestaurant source={require('../../assets/images/home/rouned_one.png')} titleRestaurant='Folha verde'/>
              <ListRestaurant source={require('../../assets/images/home/rouned_two.png')} titleRestaurant='Rabanette'/>
              <ListRestaurant source={require('../../assets/images/home/rouned_three.png')} titleRestaurant='Sacia Fome'/>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer title="sssss" />
    </View>
  );
}
