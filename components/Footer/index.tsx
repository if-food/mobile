import { Image, Text, View } from 'tamagui'

export default function Footer({ title }) {
  return (
    <View className='h-[60] w-full bg-[#24A645] flex-row items-center justify-evenly rounded-tl-[24px] rounded-tr-[24px] absolute bottom-0'>
      <View className='flex-none px-7'>
        <Image source={require('../../assets/images/footer_component/home.png')} className='w-[24px] h-[24px]'/>
      </View>
      
      <View className='flex-none px-7'>
        <Image source={require('../../assets/images/footer_component/search_disabled.png')} className='w-[24px] h-[24px]'/>
      </View>
      
      <View className='flex-none px-7'>
        <Image source={require('../../assets/images/footer_component/orders_disableded.png')} className='w-[18px] h-[24px]'/>
      </View>

      <View className='flex-none px-7'>
        <Image source={require('../../assets/images/footer_component/profile_disabled.png')} className='w-[24px] h-[24px]'/>
      </View>
    </View>
  )
}
