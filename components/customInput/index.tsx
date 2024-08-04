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
}

const CustomInput = ({ placeholder = '', titleInput = '', subtitleInput = '', secureTextEntry = false, onChangeText, onBlur, value, style, ...rest }: InputCustom) => {
  return (
    <View>
      {titleInput ? <Text className="text-[16px] font-bold text-[#fff] pb-2">{titleInput}</Text> : null}
      {subtitleInput ? <Text className="text-[12px] font-thin text-[#fff] pb-2">{subtitleInput}</Text> : null}
      <Input secureTextEntry={secureTextEntry} placeholder={placeholder} className="w-[320px] h-[48px] bg-[#E3E3E3] text-[#16161d]" onChangeText={onChangeText} onBlur={onBlur} value={value} style={style} />
    </View>
  );
};

export default CustomInput;
