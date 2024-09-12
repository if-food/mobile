import React from 'react';
import { View, Image, ViewStyle, ImageStyle, StyleSheet } from 'react-native';

interface SimpleImagePickerProps {
  imageUri?: string;
  style?: ViewStyle;
  imageStyle?: ImageStyle; 
}

const SimpleImagePicker: React.FC<SimpleImagePickerProps> = ({
  imageUri,
  style,
  imageStyle
}) => {
  const fallbackImage = require('../../assets/images/icon.png');

  return (
    <View style={[styles.container, style]}>
      <Image
        source={imageUri ? { uri: imageUri } : fallbackImage}
        style={[styles.image, imageStyle]} 
        resizeMode="cover"
        onError={(error) => {
          console.error('Failed to load image:', error.nativeEvent.error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default SimpleImagePicker;
