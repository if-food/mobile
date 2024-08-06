import Footer from 'components/Footer';
import Header from 'components/Header';
import { ScrollView, Image, View, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import CardRecintosFamosos from 'components/CardRecintosFamosos';
import ListRestaurant from 'components/ListRestaurant';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import imageOne from '../../assets/images/home/imageOne.png';
import imageTwo from '../../assets/images/home/imageTwo.png';
import imageThree from '../../assets/images/home/imageThree.png';

const images = [imageOne, imageTwo, imageThree];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();

  const restaurant = () => {
    router.push('../restaurantes');
  };

  return (
    <View className="flex-1 items-center justify-start bg-[#2c2d33]">
      <Header title="Av bulhões 77" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <View className="w-full items-center mt-4 px-6">
          <Carousel
            style={{ borderRadius: 16 }}
            loop
            width={352}
            height={160}
            autoPlay={true}
            data={images}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: 'center',
                }}
              >
                <Image source={item} style={{ width: '100%', height: '100%' }} />
              </View>
            )}
          />
          <View className="flex-row justify-center mt-2">
            {images.map((_, index) => (
              <View key={index} className={`w-2.5 h-2.5 rounded-full mx-1 ${index === currentIndex ? 'bg-[#24A645]' : 'bg-[#1C4F2A]'}`} />
            ))}
          </View>

          <View className="w-full mt-6">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View className="flex-row justify-between">
                <CardRecintosFamosos titleRestaurant="Da terra" source={require('../../assets/images/home/card_one.png')} />
                <CardRecintosFamosos titleRestaurant="Rabanette" source={require('../../assets/images/home/card_two.png')} />
                <CardRecintosFamosos titleRestaurant="Sacia Fome" source={require('../../assets/images/home/card_three.png')} />
                <CardRecintosFamosos titleRestaurant="Don Verde" source={require('../../assets/images/home/card_four.png')} />
                <CardRecintosFamosos titleRestaurant="Da terra" source={require('../../assets/images/home/card_one.png')} />
                <CardRecintosFamosos titleRestaurant="Rabanette" source={require('../../assets/images/home/card_two.png')} />
                <CardRecintosFamosos titleRestaurant="Sacia Fome" source={require('../../assets/images/home/card_three.png')} />
                <CardRecintosFamosos titleRestaurant="Don Verde" source={require('../../assets/images/home/card_four.png')} />
              </View>
            </ScrollView>
          </View>

          <View className="w-full">
            <Text className="text-white pt-10 text-xl font-bold pb-4">Recintos famosos</Text>
            <ListRestaurant source={require('../../assets/images/home/rouned_one.png')} titleRestaurant="Folha verde" distance="6,8" price="38,90" />
            <ListRestaurant onPress={restaurant} source={require('../../assets/images/home/rouned_two.png')} titleRestaurant="Rabanette" price="99,50" />
            <ListRestaurant source={require('../../assets/images/home/rouned_three.png')} titleRestaurant="Sacia Fome" />

            <ListRestaurant source={require('../../assets/images/home/rouned_one.png')} titleRestaurant="Folha verde" />
            <ListRestaurant onPress={restaurant} source={require('../../assets/images/home/rouned_two.png')} titleRestaurant="Rabanette" />
            <ListRestaurant source={require('../../assets/images/home/rouned_three.png')} titleRestaurant="Sacia Fome" />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
