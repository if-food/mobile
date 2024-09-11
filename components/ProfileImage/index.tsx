import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Alert, ViewStyle, ImageStyle, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { storage } from 'services/firebase/firebase-config';

interface ImagePickerProps {
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  imageUri?: string | null;
  onImagePicked?: (url: string, uploading: boolean) => void; // Updated type
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({ style, imageStyle, imageUri, onImagePicked }) => {
  const [localImageUri, setLocalImageUri] = useState<string | null>(imageUri || null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (imageUri) {
      setLocalImageUri(imageUri);
    }
  }, [imageUri]);

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de acesso à galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0]?.uri;
      if (uri) {
        setIsUploading(true); // Set uploading state to true
        await uploadImage(uri);
      } else {
        Alert.alert('URI da imagem é indefinido');
      }
    } else {
      Alert.alert('Nenhuma imagem selecionada');
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profile_pictures/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setLocalImageUri(downloadURL);
      if (onImagePicked) {
        onImagePicked(downloadURL, false); // Pass URL and uploading status
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem: ', error);
      if (onImagePicked) {
        onImagePicked('', false); // Pass empty string and uploading status on error
      }
    } finally {
      setIsUploading(false); // Set uploading state to false after upload
    }
  };

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <TouchableOpacity onPress={handleSelectImage} disabled={isUploading}>
        <View
          style={[
            { width: 100, height: 100, borderRadius: 50, justifyContent: 'center' },
            style
          ]}
        >
          {isUploading ? (
            <ActivityIndicator size="large" color="#ccc" />
          ) : localImageUri ? (
            <Image
              source={{ uri: localImageUri }}
              style={[{ width: '100%', height: '100%' }, imageStyle]}
            />
          ) : (
            <Icon name="account-circle" size={100} color="#ccc" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerComponent;
