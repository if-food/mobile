import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; // Certifique-se de importar corretamente do react-native
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';

import imageOneJson from '../../assets/lottie/animation_01.json';
import imageTwoJson from '../../assets/lottie/animation_02.json';
import imageThreeJson from '../../assets/lottie/animation_03.json';

export default function InfosLogin() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const images = [<LottieView style={{ height: 320, width: 320 }} source={imageOneJson} autoPlay loop />, <LottieView style={{ height: 320, width: 320 }} source={imageTwoJson} autoPlay loop />, <LottieView style={{ height: 320, width: 320 }} source={imageThreeJson} autoPlay loop />];
  const texts = [
    'Explore as últimas \n tendências em alimentos \n saudáveis!',
    'Comida deliciosa \n diretamente na sua porta, e \n rápido!',
    'Faça seu pedido em \n segundos e deixe o resto \n conosco!'
  ];

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c2d33' }}>
      <TouchableOpacity onPress={changeText}>
        <View style={{ width: 300, height: 300, justifyContent: 'center', alignItems: 'center' }}>
          {images[currentImageIndex]}
        </View>
      </TouchableOpacity>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>{texts[currentTextIndex]}</Text>
    </View>
  );
}
