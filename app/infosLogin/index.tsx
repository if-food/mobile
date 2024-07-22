import React, { useState } from 'react';
import { View, Image, Text } from 'tamagui';  // Importe TouchableOpacity do tamagui
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native'

import imageOne from '../../assets/images/login/icon-01.png';
import imageTwo from '../../assets/images/login/icon-02.png';
import imageThree from '../../assets/images/login/icon-03.png';

export default function InfosLogin() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const images = [imageOne, imageTwo, imageThree];
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
    <View className='flex-1 justify-center items-center bg-[#2c2d33]'>
      <TouchableOpacity onPress={changeText}>
        <View className='w-[300px] h-[300px] justify-center items-center'>
          <Image style={{ width: 160, height: 160 }} source={images[currentImageIndex]} key={currentImageIndex} />
        </View>
      </TouchableOpacity>
      <Text className='text-white font-bold text-[24px] text-center'>{texts[currentTextIndex]}</Text>
    </View>
  );
}
