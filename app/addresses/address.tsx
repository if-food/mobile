import { useMemo, useState, useEffect } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonCustom from "components/ButtonCustom";
import { Form } from "tamagui";
import Footer from "components/Footer";
import addressSchema from "schemas/Address";
import CustomInput from "components/customInput";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { fetchAddressByCep, formatCep } from "utils/formatters";

export default function Address() {
  const { address: addressParam } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState<Address | null>(null);

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1",
        label: "Casa",
        value: "Casa",
        color: "#24a645",
        borderColor: "#fff",
        labelStyle: {
          color: "#fff",
        },
      },
      {
        id: "2",
        label: "Apartamento",
        value: "Apartamento",
        color: "#24a645",
        borderColor: "#fff",
        labelStyle: {
          color: "#fff",
        },
      },
      {
        id: "3",
        label: "Outro",
        value: "Outro",
        color: "#24a645",
        borderColor: "#fff",
        labelStyle: {
          color: "#fff",
        },
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();

  console.log(address);

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

  useEffect(() => {
    if (addressParam) {
      try {
        const parsedAddress = JSON.parse(addressParam as string) as Address;
        setAddress(parsedAddress);
        setSelectedId(radioButtons.find(button => button.value === parsedAddress.tipo)?.id);
        
        setValue("cep", parsedAddress.cep || "");
        setValue("state", parsedAddress.estado || "");
        setValue("city", parsedAddress.cidade || "");
        setValue("neighborhood", parsedAddress.bairro || "");
        setValue("street", parsedAddress.rua || "");
        setValue("number", parsedAddress.numero || "");
        setValue("complement", parsedAddress.complemento || "");
      } catch (error) {
        console.error("Error parsing address data:", error);
      }
    }
  }, [addressParam, radioButtons, setValue]);

  const handleAddress = () => {
    router.push('../addresses');
  };

  const isEditMode = !!address;
  const buttonText = isEditMode ? "Alterar" : "Salvar";

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log("Submitted Data:", data);

      const storedData = await AsyncStorage.getItem("userData");
      if (!storedData) {
        console.error("Client ID not found in AsyncStorage");
        return;
      }
      const userData = JSON.parse(storedData);
      const clienteId = userData.id;

      console.log(clienteId);

      const url = address
        ? `https://if-delivery-api-final.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente/endereco/${address.id}`
        : `https://if-delivery-api-final.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente/endereco/${clienteId}`;

      const method = address ? "PUT" : "POST";

      const payload = {
        bairro: data.neighborhood,
        cep: data.cep,
        cidade: data.city,
        complemento: data.complement,
        estado: data.state,
        numero: data.number,
        rua: data.street,
        tipo: radioButtons.find((button) => button.id === selectedId)?.value,
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);
      alert("Endereço salvo com sucesso :)");
      handleAddress();
    } catch (error) {
      console.error("Error submitting address data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCepChange = async (cep) => {
    const formattedCep = formatCep(cep);

    if (formattedCep.length === 9) {
      try {
        const addressData = await fetchAddressByCep(
          formattedCep.replace("-", "")
        );
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
            <View style={{ marginBottom: 16 }}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                containerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
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
                    placeholder="Insira o complemento (opcional)"
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

          <View
            style={{
              marginVertical: 16,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ButtonCustom
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
              texto={buttonText}
            />
          </View>
        </Form>
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
