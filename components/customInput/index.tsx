import React, { useState } from 'react';
import { Text, Input } from 'tamagui';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Certifique-se de instalar e linkar a biblioteca

interface InputCustom {
  placeholder?: string;
  titleInput?: string;
  subtitleInput?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  value?: string;
  style?: object;
  editable?: boolean;
}

const CustomInput = ({ 
  placeholder = '', 
  titleInput = '', 
  subtitleInput = '', 
  secureTextEntry = false, 
  onChangeText, 
  onBlur, 
  value, 
  style, 
  editable = true 
}: InputCustom) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="pb-2">
      {titleInput ? <Text className="text-[16px] font-bold text-[#fff] pb-2">{titleInput}</Text> : null}
      {subtitleInput ? <Text className="text-[12px] font-thin text-[#fff] pb-2">{subtitleInput}</Text> : null}
      <View style={{ position: 'relative', opacity: editable ? 1 : 0.4 }}>
        <Input 
          secureTextEntry={secureTextEntry && !showPassword} 
          placeholder={placeholder} 
          className="w-[320px] h-[48px] bg-[#E3E3E3] text-[#16161d]" 
          onChangeText={onChangeText} 
          onBlur={onBlur} 
          value={value} 
          style={[style, { paddingRight: 40 }]} 
          editable={editable} 
        />
        {secureTextEntry && (
          <TouchableOpacity 
            style={{ position: 'absolute', right: 10, top: 12 }} 
            onPress={togglePasswordVisibility}
          >
            <Icon 
              name={showPassword ? 'visibility-off' : 'visibility'} 
              size={24} 
              color="#16161d" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
