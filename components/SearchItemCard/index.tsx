import { Text, Image, View } from "tamagui";
import { TouchableOpacity } from "react-native";

interface SearchItemCardProps {
  logo?: any;
  restaurantName?: string;
  title?: string;
  description?: string;
  orderImage?: any;
  price?: string;
  onPress?: () => void;
}

export default function SearchItemCard({
  logo,
  restaurantName,
  title,
  description,
  orderImage,
  price,
  onPress,
}: SearchItemCardProps) {
  return (
    <View style={{width: '90%', paddingTop: 16}}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Image
            source={logo}
            style={{
              width: 30,
              height: 30,
              borderRadius: 25,
              marginRight: 16,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {restaurantName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between"
            }}
          >
            <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              {title}
            </Text>
            <Text
            >
              {description}
            </Text>
            </View>
            <Text style={{
              color: '#24A645'
            }}>
              {price}
              </Text>
          </View>
          {orderImage && (
            <Image
              source={orderImage}
              style={{
                width: 150,
                height: 100,
                borderRadius: 8,
                marginLeft: 16,
              }}
            />
          )}
        </View>
      </TouchableOpacity>
      </View>
  );
}
