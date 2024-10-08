import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { useFonts } from 'expo-font';
import { config } from '@tamagui/config/v3';
import InfosLogin from './infosLogin/index';
import TestScreen from './testScreen';
import Home from './home';
import Profile from './profile';
import PersonalData from './personalData';
import Login from './login';
import Address from './addresses/address';
import OrderRestaurant from '../orderRestaurant';
import Cadastro from './cadastro';
import Checkout from './checkout';
import { LucideHome } from 'lucide-react-native';
import OrderReview from './orderReview';
import CartProvider from 'context/CartContext';
import { LogBox } from 'react-native';

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}
export default () => {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <CartProvider>
        <Home />
      </CartProvider>
    </TamaguiProvider>
  );
};
