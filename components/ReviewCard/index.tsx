import { View, ScrollView, Text, Image } from 'react-native';

export default function ReviewCard({ source, name, description, price }) {
  const formattedPrice = parseFloat(price).toFixed(2);
  return (
    <View className="flex-row justify-between bg-[#2b2e32] mb-4">
      <Image source={source} />
      <View className="flex-1 pl-4">
        <Text className="text-[16px] font-bold text-[#fff]">{name}</Text>
        <Text className="text-[12px] text-[#fff]">{description}</Text>
        <Text className="text-[12px] text-[#24A645]">R$ {formattedPrice}</Text>
      </View>
      <Text className="text-[12px] text-[#fff]">3x</Text>
    </View>
  );
}
