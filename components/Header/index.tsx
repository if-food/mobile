import { Image, Text, View } from 'tamagui'

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <View className='h-[60] w-full bg-[#24A645] mt-7 flex-row items-center justify-between rounded-bl-[24px] rounded-br-[24px]'>
      <View className='flex-none px-7' ><Text className='text-white'>aaaa</Text></View>
      
      <View className=' items-center'>
        <Text className='text-white'>{title}</Text>
      </View>
      
      <View className='flex-none px-7'>
        <Text className='text-white'>sacola</Text>
      </View>
    </View>
  )
}
