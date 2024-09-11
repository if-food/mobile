import { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import personalDataSchema from "../../schemas/PersonalData";
import ButtonCustom from "components/ButtonCustom";
import { Form } from "tamagui";
import Footer from "components/Footer";
import CustomInput from "components/customInput";
import {
  formatBirthDateDisplay,
  formatCPF,
  formatPhoneNumber,
} from "utils/formatters";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePickerComponent from "components/ProfileImage";

export default function PersonalData() {
  const [isModified, setIsModified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false); // Added state
  const [initialData, setInitialData] = useState({
    nome: "",
    telefone: "",
    dataNascimento: "",
    cpf: "",
    photo: null,
  });
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

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
        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
          const userData = JSON.parse(storedData);
          const id = userData.id;
          setUserId(id);

          const response = await axios.get(
            `https://api-1-drn7.onrender.com/api/cliente/?clienteId=${id}`
          );
          const data = response.data;
          console.log("API Response Data:", data);

          setInitialData({
            nome: data.nome || "",
            telefone: data.telefone || "",
            dataNascimento: data.dataNascimento || "",
            cpf: data.cpf || "",
            photo: data.photo || null,
          });

          setImageUri(data.photo || null);

          setValue("nome", data.nome || "");
          setValue("phone", data.telefone || "");
          setValue(
            "dataNascimento",
            formatBirthDateDisplay(data.dataNascimento) || ""
          );
          setValue("cpf", data.cpf || "");
          setValue("photo", data.photo || null);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
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

  const updateUserData = async (data) => {
    try {
      if (userId) {
        const updatedData = {
          nome: data.nome,
          telefone: data.phone,
          dataNascimento: data.dataNascimento,
          cpf: data.cpf,
          photo: imageUri,
        };

        console.log("Dados que serão enviados:", updatedData);

        const response = await fetch(
          `https://api-1-drn7.onrender.com/clientes/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          }
        );

        console.log("Status da resposta:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro ao atualizar os dados do cliente:", errorData);
          throw new Error(`Error updating user data: ${errorData.message}`);
        }

        console.log("Dados atualizados com sucesso");
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados do cliente:", error.message);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await updateUserData(data);
    } catch (error) {
      console.error("Erro durante a submissão:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isUploading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2c2d33",
        }}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 24,
          alignItems: "center",
          backgroundColor: "#2c2d33",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: "center", marginBottom: 8 }}>
          <ImagePickerComponent
            imageStyle={{ borderRadius: 50 }}
            imageUri={imageUri}
            onImagePicked={(url, uploading) => {
              setImageUri(url);
              setIsUploading(uploading); // Set uploading status
            }}
          />
        </View>

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
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: "100%" }}>
                  <CustomInput
                    titleInput="Telefone"
                    placeholder="Insira seu telefone"
                    onChangeText={(text) => onChange(formatPhoneNumber(text))}
                    onBlur={onBlur}
                    value={formatPhoneNumber(value)}
                    style={{ width: "100%" }}
                  />
                  {errors.phone && (
                    <Text style={{ color: "red" }}>{errors.phone.message}</Text>
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
                    titleInput="Data de nascimento"
                    placeholder="Insira sua data de nascimento"
                    onChangeText={(text) => onChange(text)}
                    onBlur={onBlur}
                    value={formatBirthDateDisplay(value)}
                    style={{ width: "100%" }}
                    editable={!initialData.dataNascimento}
                  />
                  {errors.dataNascimento && (
                    <Text style={{ color: "red" }}>
                      {errors.dataNascimento.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={{ alignItems: "center", width: "100%" }}>
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ width: "100%" }}>
                  <CustomInput
                    titleInput="CPF"
                    placeholder="Insira seu CPF"
                    onChangeText={(text) => onChange(formatCPF(text))}
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

          <ButtonCustom
          style={{marginTop: 24}}
            texto="Salvar alterações"
            onPress={handleSubmit(onSubmit)}
            disabled={!isModified || isSubmitting || isUploading}
          />
        </Form>
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
