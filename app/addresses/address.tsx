import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonCustom from "components/ButtonCustom";
import { Form } from "tamagui";
import Footer from "components/Footer";
import addressSchema from "schemas/Address";
import CustomInput from "components/customInput";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

const fetchAddressByCep = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching address data:", error);
    return null;
  }
};

const formatCep = (cep) => {
  cep = cep.replace(/\D/g, '');
  if (cep.length <= 5) return cep;
  return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
};

export default function Address() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {
      id: '1',
      label: 'Casa',
      value: 'Casa',
      color: "#24a645",
      borderColor: "#fff",
      labelStyle: {
        color: "#fff"
      }
    },
    {
      id: '2',
      label: 'Apartamento',
      value: 'Apartamento',
      color: "#24a645",
      borderColor: "#fff",
      labelStyle: {
        color: "#fff"
      }
    },
    {
      id: '3',
      label: 'Outro',
      value: 'Outro',
      color: "#24a645",
      borderColor: "#fff",
      labelStyle: {
        color: "#fff"
      }
    }
  ]), []);

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const isEditMode = !!id;
  const buttonText = isEditMode ? "Alterar" : "Salvar";
  
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitted Data:", data);

      const clientId = await AsyncStorage.getItem("clienteId");
      if (!clientId) {
        console.error("Client ID not found in AsyncStorage");
        return;
      }
  
      const url = id
        ? `https://if-delivery-api.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente/endereco/${id}`
        : `https://if-delivery-api.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente/endereco/${clientId}`;
      
      const method = id ? 'PUT' : 'POST';
  
      const payload = {
        bairro: data.neighborhood,
        cep: data.cep,
        cidade: data.city,
        complemento: data.complement,
        estado: data.state,
        numero: data.number,
        rua: data.street,
        tipo: radioButtons.find(button => button.id === selectedId)?.value,
      };
  
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), 
      });
  
      const result = await response.json();
      console.log(result);
      alert("Endereço salvo com sucesso :)")
    } catch (error) {
      console.error("Error submitting address data:", error);
    }
  };

  const handleCepChange = async (cep) => {
    const formattedCep = formatCep(cep);
    console.log("Formatted CEP:", formattedCep);
    
    if (formattedCep.length === 9) {
      try {
        const addressData = await fetchAddressByCep(formattedCep.replace('-', ''));
        console.log("Address Data:", addressData);
        
        if (addressData && addressData.logradouro) {
          setValue("state", addressData.uf || "");
          setValue("city", addressData.localidade || "");
          setValue("neighborhood", addressData.bairro || "");
          setValue("street", addressData.logradouro || "");
          setValue("complement", addressData.complemento || "");
        } else {
          console.warn("No data found for the given CEP.");
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    }
    setValue("cep", formattedCep);
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 80,
          paddingTop: 32,
          backgroundColor: "#2c2d33",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: 24 }}>
          <View>
            <View style={{marginBottom: 16}}>
          <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              containerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
              selectedId={selectedId}
            /> 
            </View>
            <Controller
              control={control}
              name="cep"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <CustomInput
                    titleInput="CEP"
                    placeholder="Insira seu CEP"
                    onChangeText={(text) => {
                      onChange(text);
                      handleCepChange(text);
                    }}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.cep && (
                    <Text style={{ color: "red", paddingBottom: 2 }}>
                      {errors.cep.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="state"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <CustomInput
                    titleInput="Estado"
                    placeholder="Insira seu estado"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.state && (
                    <Text style={{ color: "red", marginBottom: 2 }}>
                      {errors.state.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <CustomInput
                    titleInput="Cidade"
                    placeholder="Insira sua cidade"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.city && (
                    <Text style={{ color: "red", marginBottom: 2 }}>
                      {errors.city.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="neighborhood"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <CustomInput
                    titleInput="Bairro"
                    placeholder="Insira seu bairro"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.neighborhood && (
                    <Text style={{ color: "red", marginBottom: 2 }}>
                      {errors.neighborhood.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="street"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <CustomInput
                    titleInput="Rua"
                    placeholder="Insira sua rua"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.street && (
                    <Text style={{ color: "red", marginBottom: 2 }}>
                      {errors.street.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="number"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <CustomInput
                    titleInput="Número"
                    placeholder="Insira o número"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.number && (
                    <Text style={{ color: "red", marginBottom: 2 }}>
                      {errors.number.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="complement"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <CustomInput
                    titleInput="Complemento"
                    placeholder="Insira o complemento"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  {errors.complement && (
                    <Text style={{ color: "red", marginBottom: 2 }}>
                      {errors.complement.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>
        </Form>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            paddingBottom: 72,
          }}
        >
          <ButtonCustom
              style={{ width: 320, marginBottom: 16 }}
              texto={buttonText}
              onPress={handleSubmit(onSubmit)}
            />
        </View>
      </ScrollView>
      <Footer/>
    </KeyboardAvoidingView>
  );
}
