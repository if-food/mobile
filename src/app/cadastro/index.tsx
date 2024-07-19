import React from 'react'
import { View, Text, Form, Input, Image, Button } from 'tamagui'
import imageOne from '../../assets/images/login/icon-01.png';


export default function Cadastro() {
  return (
    <View className='flex-1 justify-end items-center bg-[#2c2d33]'>
      <Form>
        <View className='pb-[24px]'>
          <Text className='text-white font-bold text-[16px] pb-[8px]'>Nome</Text>
          <Input placeholder='Insira seu nome' width={352} height={56}/>
        </View>

        <View className='pb-[24px]'>
          <Text className='text-white font-bold text-[16px] pb-[8px]'>Insira seu E-mail</Text>
          <Input placeholder='Insira seu E-mail' width={352} height={56}/>
        </View>

        <View className='pb-[24px]'>
          <Text className='text-white font-bold text-[16px] pb-[8px]'>Senha</Text>
          <Input placeholder='Insira sua senha' width={352} height={56} />
        </View>

        <View className='pb-[24px]'>
          <Text className='text-white font-bold text-[16px] pb-[8px]'>Confirmar senha</Text>
          <Input placeholder='Confirme sua senha' width={352} height={56} />
        </View>
      </Form>

      <View className='pt-[64px]'><Image source={imageOne} style={{ width: 160, height: 160 }}/></View>
      <Button className='bg-[#3a953e] text-[#f5f5f5] mb-[24px] w-[352px] mt-[60px]'>Cadastrar</Button>
    </View>
  )
}