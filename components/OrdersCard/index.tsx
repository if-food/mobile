import { Image, Text } from 'tamagui';
import { View, TouchableOpacity } from 'react-native';

interface OrdersCardProps {
  name?: string;
  description?: string;
  status?: string;
  source?: string;
  price?: number;
  statusColor?: string;
}

export default function OrdersCard({ name, description, status, source, price, statusColor }: OrdersCardProps) {
  const formatPrice = (price?: number) => {
    if (price === undefined) return 'R$ 0,00';
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <TouchableOpacity>
      <View className="w-full flex-row justify-between mt-4">
        <View className="flex-row">
          {source && <Image style={{width: 60, height: 60, borderRadius: 8}} source={{ uri: source }} />}
          <View className="px-4 justify-between">
            <View>
              <Text className="font-bold text-[#fff] text-[16px]">{name}</Text>
              <Text className="text-[#fff] text-[12px]">{description}</Text>
            </View>
            <Text className="text-[#24A645]">{formatPrice(price)}</Text>
          </View>
        </View>

        <View>
          <Text className={`font-thin text-[16px]`} style={{ color: statusColor || '#FFFFFF' }}>
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
