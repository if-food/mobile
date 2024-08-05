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
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const handleCepChange = async (cep) => {
    const formattedCep = formatCep(cep);
    if (formattedCep.length === 9) {
      const addressData = await fetchAddressByCep(formattedCep.replace('-', ''));
      if (addressData) {
        setValue("state", addressData.uf || "");
        setValue("city", addressData.localidade || "");
        setValue("neighborhood", addressData.bairro || "");
        setValue("street", addressData.logradouro || "");
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
                    editable={false}
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
                    editable={false}
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
                    editable={false}
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
                    editable={false}
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
            texto="Salvar"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
      <Footer/>
    </KeyboardAvoidingView>
  );
}
