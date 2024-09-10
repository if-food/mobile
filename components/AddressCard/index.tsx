import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface AddressCardProps {
  icon: string;
  title: string;
  address: string;
  complement: string;
  isFavorited?: boolean;
  onEditPress?: () => void;
  onDeletePress?: () => void;
  onFavoritePress?: () => Promise<void>;
}

const AddressCard = ({
  icon,
  title,
  address,
  complement,
  isFavorited,
  onEditPress,
  onDeletePress,
  onFavoritePress,
}: AddressCardProps) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        padding: 16,
        width: "90%",
        marginBottom: 24,
      }}
    >
      <Icon name={icon} size={40} color="#24A645" />
      <View
        style={{
          width: "70%",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 24,
            textAlign: "left",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontSize: 16,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {address}
        </Text>
        <Text
          style={{
            fontSize: 10,
            textAlign: "left",
          }}
        >
          {complement}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {onEditPress && (
          <TouchableOpacity onPress={onEditPress}>
            <Icon
              name="edit"
              size={24}
              color="#24A645"
              style={{
                marginBottom: 8,
              }}
            />
          </TouchableOpacity>
        )}
        {onDeletePress && (
          <TouchableOpacity onPress={onDeletePress}>
            <Icon
              name="delete"
              size={24}
              color="red"
            />
          </TouchableOpacity>
        )}
        {onFavoritePress && (
          <TouchableOpacity onPress={onFavoritePress}>
            <Icon
              name={isFavorited ? "star" : "star-border"}
              size={24}
              color={isFavorited ? "gold" : "gray"}
              style={{
                marginTop: 8,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AddressCard;
