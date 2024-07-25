import { View, Text, Form, Input, Image, Button } from 'tamagui';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../schemas/Login';
import { useRouter } from 'expo-router';

import imageOne from '../../assets/images/login/icon-01.png';
import { Pressable } from 'react-native';
import ButtonCustom from 'components/ButtonCustom';

export default function Login() {
  const router = useRouter();

  const esqueciSenha = () => {
    router.push('../forgotMyPassword');
  };

  const irParaCadastro = () => {
    router.push('../cadastro');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View className="flex-1 items-center justify-between bg-[#2c2d33] pt-6 px-6">
      <Form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <View style={{ width: '100%' }}>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, paddingBottom: 8 }}>Insira seu E-mail</Text>
            <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => <Input placeholder="Insira seu E-mail" width={352} height={56} onChangeText={onChange} onBlur={onBlur} value={value} style={{ borderColor: errors.email ? 'red' : '#ccc', borderWidth: 1 }} />} />
            {errors.email && <Text style={{ color: 'red', marginTop: 4 }}>{errors.email.message}</Text>}
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, paddingBottom: 8 }}>Insira sua senha</Text>
            <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => <Input placeholder="Insira sua senha" width={352} height={56} secureTextEntry onChangeText={onChange} onBlur={onBlur} value={value} style={{ borderColor: errors.password ? 'red' : '#ccc', borderWidth: 1 }} />} />
            {errors.password && <Text style={{ color: 'red', marginTop: 4 }}>{errors.password.message}</Text>}
            <View className="flex-row items-center justify-end pt-4">
              <Pressable onPress={esqueciSenha} className="px-4">
                <Text className="text-[#fff] underline">Esqueci minha senha</Text>
              </Pressable>
            </View>
          </View>

          <View className="items-center pt-20">
            <Image source={imageOne} style={{ width: 160, height: 160 }} />
          </View>
        </View>
      </Form>

      <View className="items-center">
        <View className="flex-row items-center">
          <Text className="text-[#fff] font-bold">Não tem uma conta? {' '}</Text>
          
          <Pressable onPress={irParaCadastro} className="py-6">
            <Text className="text-[#fff] font-thin underline">Crie uma!</Text>
          </Pressable>
        </View>
        <ButtonCustom texto="Continuar com o Google" />
        <ButtonCustom onPress={handleSubmit(onSubmit)} texto="Login" />
      </View>
    </View>
  );
}
