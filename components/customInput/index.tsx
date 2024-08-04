import React from 'react';
import { View, Text, Input } from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

interface InputCustom {
  placeholder?: string;
  titleInput?: string;
  subtitleInput?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  value?: string;
  style?: object;
  onIconPress?: () => void; 
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
  onIconPress
}: InputCustom) => {
  return (
    <View className="pb-4">
      {titleInput ? <Text className="text-[16px] font-bold text-[#fff] pb-2">{titleInput}</Text> : null}
      {subtitleInput ? <Text className="text-[12px] font-thin text-[#fff] pb-2">{subtitleInput}</Text> : null}
      <View style={{ position: 'relative' }}>
        <Input
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          className="w-[320px] h-[48px] bg-[#E3E3E3] text-[#16161d]"
          onChangeText={onChangeText}
          onBlur={onBlur}
          value={value}
          style={[style, { paddingRight: 40 }]}
        />
        {onIconPress && (
          <View style={{ position: 'absolute', right: 10, top: '50%', transform: [{ translateY: -12 }] }}>
            <Icon
              name="edit"
              size={24}
              color="#24A645"
              onPress={onIconPress}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
