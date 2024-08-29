import React, { useState, useEffect } from "react";
import { View, Image, Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ImageType {
  uri: string;
  byteArray?: Uint8Array;
}

interface ImagePickerComponentProps {
  onImagePicked?: (image: ImageType) => void;
  initialImage?: string | null;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ onImagePicked, initialImage }) => {
  const [image, setImage] = useState<ImageType | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImage({ uri: initialImage });
      setImageUri(initialImage);
    }
  }, [initialImage]);

  const uint8ArrayToBlobUrl = (byteArray: Uint8Array) => {
    const blob = new Blob([byteArray], { type: 'image/png' });
    return URL.createObjectURL(blob);
  };

  const getByteArray = async (uri: string) => {
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const byteArray = await getByteArray(result.assets[0].uri);
      const source: ImageType = { uri: result.assets[0].uri, byteArray };
      setImage(source);
      setImageUri(result.assets[0].uri);
      if (onImagePicked) {
        onImagePicked(source);
      }
    } else {
      Alert.alert("No image selected");
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "#f0f0f0",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
        onPress={pickImage}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        ) : (
          <Icon name="account-circle" size={100} color="#ccc" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerComponent;