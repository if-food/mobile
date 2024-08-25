import React, { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import personalDataSchema from "../../schemas/PersonalData";
import ButtonCustom from "components/ButtonCustom";
import { Form } from "tamagui";
import Footer from "components/Footer";
import CustomInput from "components/customInput";
import { formatBirthDateDisplay, convertToAPIBirthDate, formatCPF, formatPhoneNumber } from "utils/formatters";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PersonalData() {
  const [isModified, setIsModified] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [initialData, setInitialData] = useState({
    nome: "",
    telefone: "",
    dataNascimento: "",
    cpf: ""
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalDataSchema),
    mode: "onBlur",
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
            nome: data.nome || "",
            telefone: data.telefone || "",
            dataNascimento: formatBirthDateDisplay(data.dataNascimento) || "",
            cpf: data.cpf || ""
          });

          setValue("nome", data.nome || "");
          setValue("telefone", data.telefone || "");
          setValue("dataNascimento", formatBirthDateDisplay(data.dataNascimento) || "");
          setValue("cpf", data.cpf || "");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
  
    loadUserData();
  }, [setValue]);

  const formValues = watch();

  useEffect(() => {
    const hasChanges = Object.keys(formValues).some(
      key => formValues[key] !== initialData[key]
    );
    setIsModified(hasChanges);
  }, [formValues, initialData]);

  const onSubmit = async (data) => {
    try {
      const clienteIdString = await AsyncStorage.getItem('clienteId');
      if (clienteIdString) {
        const id = clienteIdString;
        if (id) {
          const formattedData = {
            ...data,
            dataNascimento: convertToAPIBirthDate(data.dataNascimento),
          };
          await axios.put(`https://api-1-drn7.onrender.com/clientes/${id}`, formattedData);
          console.log("Updated user data:", formattedData);
        }
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 48,
          alignItems: 'center',
          backgroundColor: "#2c2d33",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", paddingHorizontal: 32 }}
        >
          <View style={{ alignItems: "center", width: "100%" }}>
            <Controller
              control={control}
              name="nome"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: "100%" }}>
                  <CustomInput
                    titleInput="Nome"
                    placeholder="Insira seu nome"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    style={{ width: "100%" }}
                  />
                  {errors.nome && (
                    <Text style={{ color: "red" }}>{errors.nome.message}</Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={{ alignItems: "center", width: "100%" }}>
            <Controller
              control={control}
              name="telefone"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: "100%" }}>
                  <CustomInput
                    titleInput="Telefone"
                    placeholder="Insira seu telefone"
                    onChangeText={text => onChange(formatPhoneNumber(text))}
                    onBlur={onBlur}
                    value={formatPhoneNumber(value)}
                    style={{ width: "100%" }}
                  />
                  {errors.telefone && (
                    <Text style={{ color: "red" }}>{errors.telefone.message}</Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={{ alignItems: "center", width: "100%" }}>
            <Controller
              control={control}
              name="dataNascimento"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: "100%" }}>
                  <CustomInput
                    titleInput="Data de Nascimento"
                    placeholder="dd/mm/aaaa"
                    onChangeText={(text) => onChange(formatBirthDateDisplay(text))}
                    onBlur={onBlur}
                    value={formatBirthDateDisplay(value)}
                    style={{ width: "100%" }}
                    editable={!initialData.dataNascimento} 
                  />
                  {errors.dataNascimento && (
                    <Text style={{ color: "red" }}>{errors.dataNascimento.message}</Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={{ marginBottom: 48, alignItems: "center", width: "100%" }}>
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: "100%" }}>
                  <CustomInput
                    titleInput="CPF"
                    placeholder="Insira seu CPF"
                    onChangeText={text => onChange(formatCPF(text))}
                    onBlur={onBlur}
                    value={formatCPF(value)}
                    style={{ width: "100%" }}
                    editable={!initialData.cpf}
                  />
                  {errors.cpf && (
                    <Text style={{ color: "red" }}>{errors.cpf.message}</Text>
                  )}
                </View>
              )}
            />
          </View>
        </Form>

        <ButtonCustom
          style={{ width: 320 }}
          texto="Salvar"
          onPress={handleSubmit(onSubmit)}
          disabled={!isModified}
        />
        <Footer/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
