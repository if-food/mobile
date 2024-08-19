import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const authenticateUser = async (data) => {
  try {
    const response = await axios.post('https://api-1-drn7.onrender.com/api/auth', {
      username: data.email,
      password: data.password,
    });
    const { token, user } = response.data;
    const { id } = user;

    await AsyncStorage.multiSet([
      ['userToken', token],
      ['userId', id.toString()],
    ]);

    console.log('Saved Token:', await AsyncStorage.getItem('userToken'));
    console.log('Saved User ID:', await AsyncStorage.getItem('userId'));
    console.log('Login successful!');
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
};

export const isUserLoggedIn = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return !!token;
};
