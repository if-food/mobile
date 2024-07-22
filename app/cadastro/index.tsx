import React, { useState } from 'react';
import { View, Text, Form, Input, Image, Button } from 'tamagui';
import imageOne from '../../assets/images/login/icon-01.png';
import { ScrollView, TouchableOpacity } from 'react-native';
import CustomInput from '../../components/customInput';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
  const [senhaValida, setSenhaValida] = useState(true);
  const [senhaConfirmacaoValida, setSenhaConfirmacaoValida] = useState(true);

  const handleSenhaChange = (text) => {
    setSenha(text);
    validateSenha(text);
  };

  const handleSenhaConfirmacaoChange = (text) => {
    setSenhaConfirmacao(text);
    validateSenhaConfirmacao(text);
  };

  const validateSenha = (text) => {
    const senhaRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{6,})/;
    setSenhaValida(senhaRegex.test(text));
  };

  const validateSenhaConfirmacao = (text) => {
    setSenhaConfirmacaoValida(text === senha);
  };

  const handleSubmit = () => {
    // Aqui você pode adicionar mais lógica para o envio do formulário
    // console.log('Formulário enviado:', { nome, email, senha });
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
        <Form>
          <View style={{ paddingBottom: 24 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                paddingBottom: 8,
              }}
            >
              Nome
            </Text>
            <Input
              placeholder="Insira seu nome"
              value={nome}
              onChangeText={setNome}
              width={352}
              height={56}
            />
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
              Insira seu E-mail
            </Text>
            <Input
              placeholder="Insira seu E-mail"
              value={email}
              onChangeText={setEmail}
              width={352}
              height={56}
            />
          </View>

          <View style={{ height: 140 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                paddingBottom: 8,
              }}
            >
              Senha
            </Text>
            <CustomInput
              placeholder="Insira sua senha"
              value={senha}
              onChangeText={handleSenhaChange}
              secureTextEntry={true}
            />
            {!senhaValida && (
              <Text style={{ color: 'red', fontSize: 12 }}>
                A senha deve ter pelo menos 6 caracteres, um maiúsculo e um{' '}
                {'\n'}
                caractere especial (!@#$&*)
              </Text>
            )}
          </View>

          <View style={{ height: 140 }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                paddingBottom: 8,
              }}
            >
              Confirmar senha
            </Text>
            <CustomInput
              placeholder="Confirme sua senha"
              value={senhaConfirmacao}
              onChangeText={handleSenhaConfirmacaoChange}
              secureTextEntry={true}
            />
            {!senhaConfirmacaoValida && (
              <Text style={{ color: 'red', fontSize: 12 }}>
                As senhas não coincidem
              </Text>
            )}
          </View>
        </Form>

        <View style={{ paddingTop: 40 }}>
          <Image source={imageOne} style={{ width: 160, height: 160 }} />
        </View>

        <Button
          style={{
            backgroundColor:
              senhaValida && senhaConfirmacaoValida ? '#3a953e' : '#ccc',
            color: '#f5f5f5',
            marginBottom: 24,
            width: 352,
            marginTop: 32,
          }}
          onPress={handleSubmit}
          disabled={!senhaValida || !senhaConfirmacaoValida}
        >
          Cadastrar
        </Button>
      </View>
    </ScrollView>
  );
}
