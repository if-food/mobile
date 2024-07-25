import { Button } from 'tamagui'

interface Button {
  texto?: string;
  onPress?: () => void;
  icon?: any;
}

export default function ButtonCustom({texto, onPress, icon, ...rest}: Button) {
  return (
    <>
      <Button className='bg-[#3a953e] text-[#f5f5f5] mb-[24px] w-[300px]' onPress={onPress} icon={icon} {...rest}>{texto}</Button>
    </>
  )
}