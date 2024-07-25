import { Text, View, Image, Button } from 'tamagui';
import LottieView from 'lottie-react-native'

export default function TestScreen() {
  return (
    <View className="flex-1 justify-end items-center bg-[#2c2d33] pb-[24px]">
      <LottieView style={{height: 320, width: 320}} source={require('../../assets/lottie/animation_01.json')} autoPlay loop/>
    </View>
  );
}
