import { View, Text, Form, Input, Image, Button } from 'tamagui';
import imageOne from '../../assets/images/login/icon-01.png';
import { ScrollView } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../schemas/Login";

export default function Login() {
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
    <ScrollView style={{ backgroundColor: '#2c2d33', paddingTop: 40 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <View style={{ paddingBottom: 24 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                paddingBottom: 8,
              }}
            >
              Insira seu E-mail
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Insira seu E-mail"
                  width={352}
                  height={56}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  style={{ borderColor: errors.email ? 'red' : '#ccc', borderWidth: 1 }}
                />
              )}
            />
            {errors.email && (
              <Text style={{ color: 'red', marginTop: 4 }}>
                {errors.email.message}
              </Text>
            )}
          </View>

          <View style={{ paddingBottom: 24 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                paddingBottom: 8,
              }}
            >
              Insira sua senha
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Insira sua senha"
                  width={352}
                  height={56}
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  style={{ borderColor: errors.password ? 'red' : '#ccc', borderWidth: 1 }}
                />
              )}
            />
            {errors.password && (
              <Text style={{ color: 'red', marginTop: 4 }}>
                {errors.password.message}
              </Text>
            )}
          </View>

          <Button
            style={{
              color: '#f5f5f5',
              marginBottom: 24,
              width: 352,
              marginTop: 32,
            }}
            onPress={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </Form>

        <View style={{ paddingTop: 40 }}>
          <Image source={imageOne} style={{ width: 160, height: 160 }} />
        </View>
      </View>
    </ScrollView>
  );
}
