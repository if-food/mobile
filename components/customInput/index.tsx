import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Text, View } from 'tamagui';

interface InputCustom {
  placeholder?: string;
  titleInput?: string;
  subtitleInput?: string;
  secureTextEntry?: boolean;
  value?: string; 
  onChangeText?: (text: string) => void; 
  onBlur?: () => void;
}

const CustomInput = ({
  placeholder = '',
  titleInput = '',
  subtitleInput = '',
  secureTextEntry = false,
  value = '', 
  onChangeText = (text: string) => {},
  onBlur = () => {} 
}: InputCustom) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChangeText = (text: string) => {
    console.log(`Text changed: ${text}`); 
    setInternalValue(text);
  };

  return (
    <View className='pb-6'>
      {titleInput ? <Text className='text-[16px] font-bold text-[#fff] pb-2'>{titleInput}</Text> : null}
      {subtitleInput ? <Text className='text-[12px] font-thin text-[#fff] pb-2'>{subtitleInput}</Text> : null}
      <TextInput
        onChangeText={handleChangeText}
        onBlur={() => {
          console.log(`Input blurred with value: ${internalValue}`); 
          onChangeText(internalValue);
        }}
        secureTextEntry={secureTextEntry}
        value={internalValue}
        placeholder={placeholder}
        className='w-[320px] h-[48px] bg-[#E3E3E3] text-[#16161d] px-2 rouned'
      />
    </View>
  );
};

export default CustomInput;
