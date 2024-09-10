import { Text, View, TouchableOpacity, Image, ImageStyle } from 'react-native';
import SimpleImagePicker from 'components/Image';

interface Card {
  photoLogo?: string;
  titleRestaurant?: string;
  onPress?: () => void;
}

const defaultImage = require('../../assets/images/icon.png');

export default function CardRecintosFamosos({
  photoLogo,
  titleRestaurant,
  onPress,
}: Card) {
  const imageUri = photoLogo || defaultImage;

  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 8 }}>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
        {photoLogo ? (
          <SimpleImagePicker
          imageUri={imageUri}
          imageStyle={{ borderRadius: 32, width: 50, height: 50 }}
        />
        ) : (
          <Image
            source={imageUri}
            style={{ width: 50, height: 50, borderRadius: 50 } as ImageStyle}
          />
        )}
        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
          {titleRestaurant}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
