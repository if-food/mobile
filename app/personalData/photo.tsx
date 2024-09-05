import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Configure o Firebase Storage
const storage = getStorage();

const ProfileImage = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0]?.uri;
        if (uri) {
          uploadImage(uri);
        } else {
          console.log('Image URI is undefined');
        }
      } else {
        console.log('No image selected');
      }
    });
  };

  const uploadImage = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profile_pictures/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      setImageUri(downloadURL);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
      <TouchableOpacity onPress={handleSelectImage}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: '#ddd',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <Icon name="account-circle" size={100} color="#ccc" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;
