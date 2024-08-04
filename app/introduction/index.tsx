import { Text, View } from 'tamagui';
import { useRouter } from 'expo-router';
import { LogIn, UserPlus } from 'lucide-react-native';
import ButtonCustom from './../../components/ButtonCustom/index';
import { Image } from 'react-native';
import { useEffect, useState } from 'react';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Introduction() {
  const router = useRouter();

  const login = () => {
    router.push('../login');
  };

  const cadastro = () => {
    router.push('../cadastro');
  };

  const initialIcons = ['🥑', '🥔', '🥕', '🥜', '🍇', '🍉', '🍊', '🍋', '🍎', '🍏', '🍍', '🍌', '🥗', '🍵', '🧋', '🍅', '🧅'];
  const shuffledIcons = shuffleArray([...initialIcons]);

  const [currentIcon, setCurrentIcon] = useState(shuffledIcons[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prevIcon) => {
        const currentIndex = shuffledIcons.indexOf(prevIcon);
        const nextIndex = (currentIndex + 1) % shuffledIcons.length;
        return shuffledIcons[nextIndex];
      });
    }, 300);

    return () => clearInterval(interval);
  }, [shuffledIcons]);

  return (
    <View className="flex-1 justify-end items-center bg-[#2c2d33] pb-[24px]">
      <View>
        <Image source={require('../../assets/images/login/logo.png')} className="w-[120px] h-[120px]" />
      </View>
      <View className="pt-[100px]">
        <Text className="font-bold text-center text-white text-[24px] leading-[31px] pb-[24px]">Falta pouco para matar {'\n'}sua fome!</Text>
        <Text className="font-light text-center text-white text-[12px] leading-[15px] pb-[24px]">O que deseja? {currentIcon}</Text>

        <ButtonCustom icon={LogIn} texto="Login" onPress={login} />
        <ButtonCustom icon={UserPlus} texto="Cadastre-se" onPress={cadastro} />
        <ButtonCustom texto="Continuar com o Google" onPress={cadastro} />
      </View>
    </View>
  );
}
