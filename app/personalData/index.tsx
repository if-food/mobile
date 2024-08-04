import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import personalDataSchema from "../../schemas/PersonalData";
import ButtonCustom from "components/ButtonCustom";
import CustomInput from "components/customInput";
import { Form } from "tamagui";
import Footer from "components/Footer";

export default function PersonalData() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalDataSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const handleIconPress = () => {
    console.log('You clicked on the icon.');
  };


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#2c2d33",
        alignItems: "center",
        paddingTop: 24
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)} style={{marginBottom: 40}}>
        <View>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                titleInput="Nome"
                placeholder="Insira seu nome"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={{ marginBottom: 2 }}
                onIconPress={handleIconPress}
              />
            )}
          />
          {errors.name && (
            <Text style={{ color: "red" }}>{errors.name.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                titleInput="E-mail"
                placeholder="Insira seu e-mail"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={{ marginBottom: 2 }}
                onIconPress={handleIconPress}
              />
            )}
          />
          {errors.email && (
            <Text style={{ color: "red" }}>{errors.email.message}</Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                titleInput="Data de Nascimento"
                placeholder="dd/mm/aaaa"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={{ marginBottom: 2 }}
                onIconPress={handleIconPress}
              />
            )}
          />
          {errors.birthDate && (
            <Text style={{ color: "red" }}>{errors.birthDate.message}</Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                titleInput="Telefone"
                placeholder="Insira seu telefone"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={{ marginBottom: 2 }}
                onIconPress={handleIconPress}
              />
            )}
          />
          {errors.phone && (
            <Text style={{ color: "red" }}>{errors.phone.message}</Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                titleInput="CPF"
                placeholder="Insira seu CPF"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={{ marginBottom: 48 }}
                onIconPress={handleIconPress}
              />
            )}
          />
          {errors.cpf && (
            <Text style={{ color: "red" }}>{errors.cpf.message}</Text>
          )}
        </View>
      </Form>

      <ButtonCustom texto="Salvar" onPress={handleSubmit(onSubmit)} />
      <Footer title="sssss" />
    </View>
  );
}
