import { Image, Text, View } from 'tamagui'

export default function Footer({ title }) {
  return (
    <View className='h-[60] w-full bg-[#24A645] mt-10 flex-row items-center justify-between rounded-tl-[24px] rounded-tr-[24px] absolute bottom-0'>
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
