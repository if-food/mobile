import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

import imageOneJson from '../../assets/lottie/animation_01.json';
import imageTwoJson from '../../assets/lottie/animation_02.json';
import imageThreeJson from '../../assets/lottie/animation_03.json';
import ButtonCustom from 'components/ButtonCustom';

export default function InfosLogin() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const images = [<LottieView style={{ height: 320, width: 320 }} source={imageOneJson} autoPlay loop />, <LottieView style={{ height: 320, width: 320 }} source={imageTwoJson} autoPlay loop />, <LottieView style={{ height: 320, width: 320 }} source={imageThreeJson} autoPlay loop />];

  const texts = ['Explore as últimas \n tendências em alimentos \n saudáveis!', 'Comida deliciosa \n diretamente na sua porta, e \n rápido!', 'Faça seu pedido em \n segundos e deixe o resto \n conosco!'];

  const login = () => {
    router.push('../introduction');
  };

  const changeText = () => {
    const newIndex = (currentTextIndex + 1) % texts.length;
    setCurrentTextIndex(newIndex);
    changeImage();
  };

  const changeImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);

    if (newIndex === 0) {
      login();
    }
  };

  const skipToLastImage = () => {
    login();
  };
  return (
    <View className="flex-1 justify-between items-center bg-[#2c2d33]">
      <View />

      <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ height: 16, width: 16, borderRadius: 10, backgroundColor: currentImageIndex === 0 ? '#24A645' : '#1C4F2A', marginHorizontal: 5 }} />
        <View style={{ height: 16, width: 16, borderRadius: 10, backgroundColor: currentImageIndex === 1 ? '#24A645' : '#1C4F2A', marginHorizontal: 5 }} />
        <View style={{ height: 16, width: 16, borderRadius: 10, backgroundColor: currentImageIndex === 2 ? '#24A645' : '#1C4F2A', marginHorizontal: 5 }} />
      </View>

      <TouchableOpacity onPress={changeText}>
        <View style={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center' }}>{images[currentImageIndex]}</View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>{texts[currentTextIndex]}</Text>
      </TouchableOpacity>

      {/* Botão para pular as imagens */}
      <View className="pb-10">
        <ButtonCustom onPress={skipToLastImage} texto="Pular" />
      </View>
    </View>
  );
}
