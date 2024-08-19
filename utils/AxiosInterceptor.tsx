import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setupAxiosInterceptors = async () => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
