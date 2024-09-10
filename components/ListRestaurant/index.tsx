import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from "react-native";
import SimpleImagePicker from "components/Image";

interface ListRestaurantProps {
  photoLogo?: string;
  titleRestaurant?: string;
  onPress?: () => void;
  categoriasEnum?: string;
}

const defaultImage = require("../../assets/images/icon.png");

export default function ListRestaurant({
  photoLogo,
  titleRestaurant = "Título",
  onPress,
  categoriasEnum,
}: ListRestaurantProps) {
  const imageUri = photoLogo || defaultImage;

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 70,
        marginBottom: 24,
      }}
      onPress={onPress}
    >
      <View>
        {photoLogo ? (
          <SimpleImagePicker
            imageUri={imageUri}
            imageStyle={{ borderRadius: 32, width: 64, height: 64 }}
          />
        ) : (
          <Image
            source={imageUri}
            style={{ width: 64, height: 64, borderRadius: 32 } as ImageStyle}
          />
        )}
      </View>
      <View
        style={
          {
            paddingLeft: 16,
            height: "100%",
            justifyContent: "center",
          } as ViewStyle
        }
      >
        <Text
          style={
            { color: "#fff", fontSize: 20, fontWeight: "bold" } as TextStyle
          }
        >
          {titleRestaurant}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center" } as ViewStyle}
        >
          <Text style={{ color: "#fff", fontSize: 12 } as TextStyle}>
            {categoriasEnum}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
