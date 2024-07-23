import { View, Text, Form, Input, Image, Button, Separator } from 'tamagui';
import imageOne from '../../assets/images/login/icon-01.png';
import { Pressable, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../schemas/Login';
import ButtonCustom from 'components/ButtonCustom';
import { useRouter } from 'expo-router';

export default function newPassword() {
  const router = useRouter();

  const irParaLogin = () => {
    router.push('../login');
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
    <View className="flex-1 justify-between items-center h-full bg-[#2c2d33] pt-6">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <View style={{ paddingBottom: 24 }}>
          <Text className="text-[24px] font-bold text-[#fff]">Nova senha</Text>
          <Text className="text-[#fff] text-[8px] py-2">Digite uma nova senha abaixo.</Text>
          <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => <Input placeholder="Insira sua senha" width={352} height={56} secureTextEntry onChangeText={onChange} onBlur={onBlur} value={value} style={{ borderColor: errors.password ? 'red' : '#ccc', borderWidth: 1 }} />} />
          {errors.password && <Text style={{ color: 'red', marginTop: 4 }}>{errors.password.message}</Text>}

          <View className='py-4'/>

          <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => <Input placeholder="Repita sua senha" width={352} height={56} secureTextEntry onChangeText={onChange} onBlur={onBlur} value={value} style={{ borderColor: errors.password ? 'red' : '#ccc', borderWidth: 1 }} />} />
          {errors.password && <Text style={{ color: 'red', marginTop: 4 }}>{errors.password.message}</Text>}
        </View>
      </Form>

      <View className="items-center">
        <View className="flex-row items-center">
          <Text className="text-[#fff] font-bold">Lembra sua senha?</Text>
          <Pressable onPress={irParaLogin} className="py-6">
            <Text className="text-[#fff] font-thin underline">Faça login</Text>
          </Pressable>
        </View>
        <ButtonCustom onPress={handleSubmit(onSubmit)} texto="Continuar" />
      </View>
    </View>
  );
}