import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Image, ActivityIndicator } from 'react-native';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<{
    nome: string;
    telefone: string;
    dataNascimento: string;
    cpf: string;
    photo: string | null;
  }>({
    nome: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    photo: null,
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
            photo: data.photo || null,
          });

          setValue('nome', data.nome || '');
          setValue('phone', data.telefone || '');
          setValue('dataNascimento', formatBirthDateDisplay(data.dataNascimento) || '');
          setValue('cpf', data.cpf || '');
          setValue('photo', data.photo || null);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
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

  const handleImagePick = async (image: { uri: string }) => {
    setInitialData({
      ...initialData,
      photo: image.uri,
    });
    setValue('photo', image.uri);
  };

  const updateUserData = async (data) => {
    try {
      const clienteIdString = await AsyncStorage.getItem('clienteId');
      if (clienteIdString) {
        const id = clienteIdString;

        await axios.put(`https://if-delivery-api.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/clientes/${id}`, {
          nome: data.nome,
          telefone: data.phone,
          dataNascimento: convertToAPIBirthDate(data.dataNascimento),
          cpf: data.cpf,
        });

        console.log('Dados atualizados com sucesso');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const updateImage = async (imageUri: string) => {
    try {
      const clienteIdString = await AsyncStorage.getItem('clienteId');
      if (clienteIdString) {
        const id = clienteIdString;
        const formData = new FormData();
        const imageBlob = {
          uri: imageUri,
          type: 'image/png',
          name: 'photo.png',
        };
        formData.append('imageFile', imageBlob as any);

        const response = await fetch(`https://if-delivery-api.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente/imagem/?clienteId=${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (!response.ok) {
          const responseBody = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}. Response: ${responseBody}`);
        }

        console.log('Imagem atualizada com sucesso');
      }
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await updateUserData(data);

      if (data.photo) {
        await updateImage(data.photo);
      }
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c2d33' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

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
          <ImagePickerComponent 
            onImagePicked={handleImagePick} 
            initialImage={initialData.photo}
          />
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
            texto='Salvar alterações'
            onPress={handleSubmit(onSubmit)}
            disabled={!isModified || isSubmitting}
          />

          {isSubmitting && (
            <View style={{ marginTop: 16 }}>
              <ActivityIndicator size="small" color="#ffffff" />
            </View>
          )}
        </Form>

        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
