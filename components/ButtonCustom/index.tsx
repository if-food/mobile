import React from 'react';
import { Button } from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ButtonProps {
  texto?: string;
  iconName?: string;
  icon?: any;
  iconSize?: number;
  iconColor?: string;
  style?: object;
  onPress?: () => void;
  disabled?: boolean; 
}

export default function ButtonCustom({
  texto,
  onPress,
  icon,
  iconName,
  iconSize = 24,
  iconColor = '#fff',
  style,
  disabled = false, 
  ...rest
}: ButtonProps) {
  return (
    <Button
      className={`bg-[#3a953e] text-[#f5f5f5] mb-[24px] w-[300px] flex-row items-center justify-center ${disabled ? 'opacity-50' : ''}`}  // Estilo de opacidade ajustado para desativado
      onPress={disabled ? undefined : onPress}  
      style={style}
      icon={icon}
      {...rest}
    >
      {texto}
      {iconName && (
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={{opacity: 0.8}}
        />
      )}
    </Button>
  );
}
