import api from './api';

interface UserCad {
  userEmail?: string;
  password?: string;
}

export async function singInClient(userEmail = '', password = ''): Promise<UserCad> {
  try {
    const response = await api.post('/cliente', {
      email: userEmail,
      password: password,
    });
    console.log('API Response:', response);
    console.log('Data:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error:', JSON.stringify(err, null, 2));
    return err;
  }
}
