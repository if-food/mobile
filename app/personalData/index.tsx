import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import personalDataSchema from '../../schemas/PersonalData';
import ButtonCustom from 'components/ButtonCustom';
import { Form } from 'tamagui';
import Footer from 'components/Footer';
import CustomInput from 'components/customInput';

const formatBirthDate = (value) => {
  const numbers = (value || '').replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
};

const formatCPF = (value) => {
  const numbers = (value || '').replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
};

export default function PersonalData() {
  const [userData, setUserData] = useState({
    name: 'João da Silva',
    email: 'joao.silva@example.com',
    phone: '(11) 99999-9999',
    birthDate: '09/10/2004',
    cpf: '710.788.794-78',
  });

  const [isModified, setIsModified] = useState(false);

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
    setValue('name', userData.name);
    setValue('email', userData.email);
    setValue('phone', userData.phone);
    setValue('birthDate', userData.birthDate);
    setValue('cpf', userData.cpf);
  }, [userData, setValue]);

  const formValues = watch();

  useEffect(() => {
    const hasChanges = Object.keys(userData).some((key) => userData[key] !== formValues[key]);
    setIsModified(hasChanges);
  }, [formValues, userData]);

  const onSubmit = async (data) => {
    setUserData((prevData) => ({
      ...prevData,
      ...data,
    }));

    console.log('Updated userData:', data);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 80,
          backgroundColor: '#2c2d33',
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', paddingHorizontal: 32 }}>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: '100%' }}>
                  <CustomInput titleInput="Nome" placeholder="Insira seu nome" onChangeText={onChange} onBlur={onBlur} value={value} style={{ width: '100%' }} />
                  {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
                </View>
              )}
            />
          </View>

          <View style={{ alignItems: 'center', width: '100%' }}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: '100%' }}>
                  <CustomInput titleInput="E-mail" placeholder="Insira seu e-mail" onChangeText={onChange} onBlur={onBlur} value={value} style={{ width: '100%' }} />
                  {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                </View>
              )}
            />
          </View>

          <View style={{ alignItems: 'center', width: '100%' }}>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: '100%' }}>
                  <CustomInput titleInput="Telefone" placeholder="Insira seu telefone" onChangeText={onChange} onBlur={onBlur} value={value} style={{ width: '100%' }} />
                  {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message}</Text>}
                </View>
              )}
            />
          </View>

          <View style={{ alignItems: 'center', width: '100%' }}>
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: '100%' }}>
                  <CustomInput titleInput="Data de Nascimento" placeholder="dd/mm/aaaa" onChangeText={(text) => onChange(formatBirthDate(text))} onBlur={onBlur} value={formatBirthDate(value)} style={{ width: '100%' }} editable={!userData.birthDate} />
                  {errors.birthDate && <Text style={{ color: 'red' }}>{errors.birthDate.message}</Text>}
                </View>
              )}
            />
          </View>

          <View style={{ marginBottom: 48, alignItems: 'center', width: '100%' }}>
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: '100%' }}>
                  <CustomInput titleInput="CPF" placeholder="Insira seu CPF" onChangeText={(text) => onChange(formatCPF(text))} onBlur={onBlur} value={formatCPF(value)} style={{ width: '100%' }} editable={!userData.cpf} />
                  {errors.cpf && <Text style={{ color: 'red' }}>{errors.cpf.message}</Text>}
                </View>
              )}
            />
          </View>
        </Form>

        <ButtonCustom style={{ width: 320 }} texto="Salvar" onPress={handleSubmit(onSubmit)} disabled={!isModified} />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
