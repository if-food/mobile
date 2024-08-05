import { View, Text, Input } from 'tamagui';

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
  return (
    <View className="pb-2">
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
          editable={editable}
        />
      </View>
    </View>
  );
};

export default CustomInput;
