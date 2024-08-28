import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import personalDataSchema from '../../schemas/PersonalData';
import ButtonCustom from 'components/ButtonCustom';
import { Form } from 'tamagui';
import Footer from 'components/Footer';
import CustomInput from 'components/customInput';
import { formatBirthDateDisplay, convertToAPIBirthDate, formatCPF, formatPhoneNumber } from 'utils/formatters';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePickerComponent from 'components/Image';

export default function PersonalData() {
  const [isModified, setIsModified] = useState(false);
  const [initialData, setInitialData] = useState({
    nome: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    photo: null as string | null, // URI da imagem
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalDataSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const clienteIdString = await AsyncStorage.getItem('clienteId');
        if (clienteIdString) {
          const id = clienteIdString;
          const response = await axios.get(`https://api-1-drn7.onrender.com/clientes/${id}`);
          const data = response.data;

          setInitialData({
            nome: data.nome || '',
            telefone: data.telefone || '',
            dataNascimento: formatBirthDateDisplay(data.dataNascimento) || '',
            cpf: data.cpf || '',
            photo: data.photo || null, // URI da imagem
          });

          setValue('nome', data.nome || '');
          setValue('phone', data.telefone || '');
          setValue('dataNascimento', formatBirthDateDisplay(data.dataNascimento) || '');
          setValue('cpf', data.cpf || '');
          setValue('photo', data.photo || null);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [setValue]);

  const formValues = watch();

  useEffect(() => {
    const hasChanges = Object.keys(formValues).some(
      (key) => formValues[key] !== initialData[key]
    );
    setIsModified(hasChanges);
  }, [formValues, initialData]);

  // Função para converter URI em Blob
  const uriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  // Manipula a seleção da imagem
  const handleImagePick = async (image: { uri: string }) => {
    setInitialData({
      ...initialData,
      photo: image.uri, // Armazena a URI da imagem
    });
    setValue('photo', image.uri);
    console.log('Image URI:', image.uri); // Debugging: Verifique a URI
  };

  const onSubmit = async (data) => {
    try {
      const clienteIdString = await AsyncStorage.getItem('clienteId');
      if (clienteIdString) {
        const id = clienteIdString;
  
        // Criação do FormData
        const formData = new FormData();
        formData.append('nome', data.nome);
        formData.append('telefone', data.phone);
        formData.append('dataNascimento', convertToAPIBirthDate(data.dataNascimento));
        formData.append('cpf', data.cpf);
  
        if (data.photo) {
          const imageBlob = await uriToBlob(data.photo);
          formData.append('photo', imageBlob, 'photo.jpg');
        }
  
        // Depuração do FormData sem usar entries()
        formData.forEach((value, key) => {
          console.log(`${key}:`, value);
        });
  
        // Chamada da solicitação
        const response = await axios.put(`https://api-1-drn7.onrender.com/clientes/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Salvo com sucesso');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating user data:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };
  
  
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 24,
          alignItems: 'center',
          backgroundColor: '#2c2d33',
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <ImagePickerComponent onImagePicked={handleImagePick} />
        </View>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '100%', paddingHorizontal: 32 }}
        >
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Controller
              control={control}
              name='nome'
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: '100%' }}>
                  <CustomInput
                    titleInput='Nome'
                    placeholder='Insira seu nome'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    style={{ width: '100%' }}
                  />
                  {errors.nome && (
                    <Text style={{ color: 'red' }}>{errors.nome.message}</Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={{ alignItems: 'center', width: '100%' }}>
            <Controller
              control={control}
              name='phone'
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: '100%' }}>
                  <CustomInput
                    titleInput='Telefone'
                    placeholder='Insira seu telefone'
                    onChangeText={(text) => onChange(formatPhoneNumber(text))}
                    onBlur={onBlur}
                    value={formatPhoneNumber(value)}
                    style={{ width: '100%' }}
                  />
                  {errors.phone && (
                    <Text style={{ color: 'red' }}>{errors.phone.message}</Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={{ alignItems: 'center', width: '100%' }}>
            <Controller
              control={control}
              name='dataNascimento'
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: '100%' }}>
                  <CustomInput
                    titleInput='Data de Nascimento'
                    placeholder='dd/mm/aaaa'
                    onChangeText={(text) => onChange(formatBirthDateDisplay(text))}
                    onBlur={onBlur}
                    value={formatBirthDateDisplay(value)}
                    style={{ width: '100%' }}
                    editable={!initialData.dataNascimento} 
                  />
                  {errors.dataNascimento && (
                    <Text style={{ color: 'red' }}>{errors.dataNascimento.message}</Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={{ marginBottom: 48, alignItems: 'center', width: '100%' }}>
            <Controller
              control={control}
              name='cpf'
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: '100%' }}>
                  <CustomInput
                    titleInput='CPF'
                    placeholder='Insira seu CPF'
                    onChangeText={(text) => onChange(formatCPF(text))}
                    onBlur={onBlur}
                    value={formatCPF(value)}
                    style={{ width: '100%' }}
                  />
                  {errors.cpf && (
                    <Text style={{ color: 'red' }}>{errors.cpf.message}</Text>
                  )}
                </View>
              )}
            />
          </View>

          <ButtonCustom
            texto='Salvar'
            onPress={handleSubmit(onSubmit)}
          />
        </Form>

        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
