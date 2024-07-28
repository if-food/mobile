import CustomInput from 'components/customInput';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'tamagui';
import ButtonCustom from './../../components/ButtonCustom/index';
import { useRouter } from 'expo-router';
import { Pressable, TextInput } from 'react-native';
import axios from 'axios';


interface CadastroInterface {
  nome: string;
  email: string;
  senha: string;
}

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  useEffect(() => { console.log(nome) });

  function salvar() {
    const userRequest = {
      nome: nome,
      email: email,
      senha: senha,
      enderecos: []
    }
    console.log(JSON.stringify(userRequest));
    axios.post('http://localhost:8080/api/usuario', userRequest)
    .then((response) => {
        console.log('usuario criado com sucesso');
      }
    ).catch((error) => {
      console.log('erro ao criar usuario ' + error.response);
    });
  }

  const router = useRouter();

  const irParaLogin = () => {
    router.push('../login');
  };

  return (
    <View className="flex-1 justify-between items-center bg-[#2c2d33] pt-[24px]">
      <View>
        <Text>Nome</Text>
        <TextInput placeholder='Insira seu nome' value={nome} onChangeText={(input) => setNome(input)} className='w-[320px] h-[48px] bg-[#E3E3E3] text-[#16161d] px-2 rounded-[8px]'/>
      </View>

      <View>
        <Text>Email</Text>
        <TextInput placeholder='Insira seu email' value={email} onChangeText={(input) => setEmail(input)} className='w-[320px] h-[48px] bg-[#E3E3E3] text-[#16161d] px-2 rounded-[8px]'/>
      </View>

      <View>
        <Text>Nome</Text>
        <TextInput placeholder='Insira sua senha' value={senha} onChangeText={(input) => setSenha(input)} className='w-[320px] h-[48px] bg-[#E3E3E3] text-[#16161d] px-2 rounded-[8px]'/>
      </View>


      <View className="items-center">
        <View className="flex-row items-center">
          <Text className="text-[#fff] font-bold">Lembra sua senha? </Text>

          <Pressable onPress={irParaLogin} className="py-6">
            <Text className="text-[#fff] font-thin underline">Faça login</Text>
          </Pressable>
        </View>
        <ButtonCustom texto="Continuar com o Google" />
        <ButtonCustom onPress={salvar} texto="Continuar" />
      </View>
    </View>
  );
}
