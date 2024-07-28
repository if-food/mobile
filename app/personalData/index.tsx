import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import personalDataSchema from '../../schemas/PersonalData';
import ButtonCustom from 'components/ButtonCustom';
import CustomInput from 'components/customInput';
import { Form } from 'tamagui';

export default function PersonalData() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalDataSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  };

  return (
    <View className="flex-1 bg-[#2c2d33] p-4">
      <Form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Text className="text-[#fff] text-lg font-bold mb-4">
        Seus dados pessoais estão protegidos
      </Text>
      <Text className="text-[#fff] text-base mb-6">
        As informações que você fornecer são confidenciais e serão tratadas com a máxima segurança. 
        Nosso sistema adota as melhores práticas de proteção de dados para garantir que suas informações 
        pessoais estejam sempre seguras e protegidas contra acessos não autorizados. 
      </Text>
      <View style={{ marginBottom: 24 }}>
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
              style={{ marginBottom: 16 }}
            />
          )}
        />
        {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
      </View>
      <View style={{ marginBottom: 24 }}>
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
              style={{ marginBottom: 16 }}
            />
          )}
        />
        {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
      </View>

      <View style={{ marginBottom: 24 }}>
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              titleInput="Data de Nascimento"
              placeholder="dd/mm/aaaa"
              onChangeText={(text) => onChange(new Date(text))}
              onBlur={onBlur}
              value={formatDate(value)}
              style={{ marginBottom: 16 }}
            />
          )}
        />
        {errors.birthDate && <Text style={{ color: 'red' }}>{errors.birthDate.message}</Text>}
      </View>

      <View style={{ marginBottom: 24 }}>
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
              style={{ marginBottom: 16 }}
            />
          )}
        />
        {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message}</Text>}
      </View>

      <View style={{ marginBottom: 24 }}>
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
              style={{ marginBottom: 16 }}
            />
          )}
        />
        {errors.cpf && <Text style={{ color: 'red' }}>{errors.cpf.message}</Text>}
      </View>
      </Form>

      <ButtonCustom texto="Salvar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
