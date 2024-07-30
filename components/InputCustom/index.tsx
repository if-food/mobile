import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input, Text, View } from 'tamagui';

interface InputCustom {
  textoTitulo?: string;
  textoSubtitulo?: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

export default function InputCustom({ textoTitulo, textoSubtitulo, secureTextEntry = false, placeholder }: InputCustom) {
  return (
    <View className='py-4'>
      {textoTitulo ? <Text className='text-[16px] font-bold text-[#fff] pb-2'>{textoTitulo}</Text> : null}
      {textoSubtitulo ? <Text className='text-[12px] font-thin text-[#fff] pb-2'>{textoSubtitulo}</Text> : null}
      <Input className='bg-[#DFDFDF] text-[#16161d]' width={352} height={48} placeholder={placeholder} secureTextEntry={secureTextEntry} />
    </View>
  );
}