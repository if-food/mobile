import React, { useState } from "react";
import { View, Image, Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ImageType {
  uri: string;
  byteArray?: Uint8Array; // Adicionando a propriedade byteArray
}

const ImagePickerComponent = ({ onImagePicked }: { onImagePicked?: (image: ImageType) => void }) => {
  const [image, setImage] = useState<ImageType | null>(null);

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
      if (onImagePicked) {
        onImagePicked(source);
      }
    } else {
      Alert.alert("No image selected");
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center"}}>
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
        {image ? (
          <Image
            source={{ uri: image.uri }}
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
