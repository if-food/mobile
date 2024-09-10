import { TouchableOpacity } from "react-native";
import { Text, Image } from "tamagui";
import { View } from "react-native";
import ImagePickerComponent from "components/ProfileImage";
import SimpleImagePicker from "components/Image";

interface CardRestaurantPageProps {
  photo?: any;
  title?: string;
  valorUnitario?: string;
  onPress?: any;
}

export default function CardRestaurantPage({
  photo,
  title,
  valorUnitario,
  onPress,
}: CardRestaurantPageProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="pl-2">
        <SimpleImagePicker
          imageUri={photo}
          imageStyle={{ borderRadius: 8, width: 150, height: 100 }}
        />
        <Text className="text-[#24A645] text-[16px] pt-2">{valorUnitario}</Text>
        <Text className="text-[#fff] text-[16px] font-bold">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
