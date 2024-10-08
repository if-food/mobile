import { View, Text, Pressable } from "react-native";
import { Form } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../schemas/Login";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import login from "../../assets/lottie/login.json";
import ButtonCustom from "components/ButtonCustom";
import CustomInput from "components/customInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = () => {
    router.push("../forgotMyPassword");
  };

  const handleRegister = () => {
    router.push("../cadastro");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const home = () => {
    router.push("../home");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Faz a requisição para o endpoint de autenticação
      const response = await axios.post('https://if-delivery-api-final.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/auth', {
        username: data.email,
        password: data.password,
      });
  
      console.log('API Response:', response.data);
  
      const { token, id } = response.data;
  
      if (!token || !id) {
        throw new Error('Token or ID is missing');
      }
  
      // Faz a requisição para obter os dados do usuário
      const clientResponse = await axios.get(`https://if-delivery-api-final.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/cliente/?usuarioId=${id}`);
  
      // Armazena o token e os dados do usuário no AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(clientResponse.data));
  
      // Verifica se os dados foram armazenados corretamente
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUserData = await AsyncStorage.getItem('userData');
  
      if (storedToken) {
        console.log('Stored Token:', storedToken);
      } else {
        console.error('Token not found in AsyncStorage');
      }
  
      if (storedUserData) {
        console.log('Stored User Data:', JSON.parse(storedUserData));
      } else {
        console.error('User data not found in AsyncStorage');
      }
  
      // Navega para a página inicial
      home();
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <View className="flex-1 items-center justify-between bg-[#2c2d33] pt-6">
      <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <View className="flex items-center">
          <View style={{ marginBottom: 8 }}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  titleInput="Insira seu E-mail"
                  placeholder="Insira seu E-mail"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  style={{ justifyContent: "center" }}
                />
              )}
            />
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email.message}</Text>
            )}
          </View>

          <View style={{ marginBottom: 24 }}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  titleInput="Insira sua senha"
                  placeholder="Insira sua senha"
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text style={{ color: "red", marginTop: 4 }}>
                {errors.password.message}
              </Text>
            )}
            <View className="flex-row items-center justify-end pt-4">
              <Pressable onPress={handleForgotPassword} className="px-4">
                <Text className="text-[#fff] underline">
                  Esqueci minha senha
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="items-center pt-20">
            <LottieView
              style={{ height: 120, width: 120 }}
              source={login}
              autoPlay
              loop
            />
          </View>
        </View>
      </Form>
      <View>
        <View className="flex-row items-center justify-center">
          <Text className="text-[#fff] font-bold">Não tem uma conta?</Text>
          <Text> </Text>
          <Pressable onPress={handleRegister} className="py-6">
            <Text className="text-[#fff] font-thin underline">Crie uma</Text>
          </Pressable>
        </View>
        <ButtonCustom texto="Continuar com o Google" />
        <ButtonCustom 
            onPress={handleSubmit(onSubmit)} 
            texto="Login" 
            loading={loading}
          />
      </View>
    </View>
  );
}
