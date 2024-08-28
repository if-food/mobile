import React from 'react';
import { Button, Text } from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  texto?: string;
  iconName?: string;
  icon?: any;
  iconSize?: number;
  iconColor?: string;
  style?: object;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean; 
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
  loading = false, 
  ...rest
}: ButtonProps) {
  return (
    <Button
      className={`bg-[#3a953e] text-[#f5f5f5] mb-[24px] w-[320px] flex-row items-center justify-center ${disabled || loading ? 'opacity-50' : ''}`} // Adjust opacity for loading state as well
      onPress={disabled || loading ? undefined : onPress}
      style={style}
      icon={icon}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {texto && <Text className="text-[#fff]">{texto}</Text>}
          {iconName && <Icon name={iconName} size={iconSize} color={iconColor} style={{ marginLeft: 8, opacity: 0.8 }} />}
        </View>
      )}
    </Button>
  );
}
