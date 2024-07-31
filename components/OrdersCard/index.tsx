import { View, Image, Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';

interface OrdersCardProps {
  name?: string;
  description?: string;
  status?: string;
  source?: any;
  price?: number;
}

export default function OrdersCard({
  name = 'Insira um nome',
  description = 'Insira uma descrição',
  status = 'status',
  source,
  price = 0,
}: OrdersCardProps) {
  const getStatusColorClass = (status: string) => {
    if (status === 'A caminho' || status === 'Entregue') {
      return 'text-[#24A645]';
    }
    return 'text-[#ECB951]';
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <TouchableOpacity>
      <View className="w-full flex-row justify-between mt-4">
        <View className="flex-row">
          <Image className="w-16 h-16" source={source} />
          <View className="px-4 justify-between">
            <View>
              <Text className="font-bold text-[#fff] text-[16px]">{name}</Text>
              <Text className="text-[#fff] text-[12px]">{description}</Text>
            </View>
            <Text className="text-[#24A645]">{formatPrice(price)}</Text>
          </View>
        </View>

        <View>
          <Text
            className={`font-thin text-[16px] ${getStatusColorClass(status)}`}
          >
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
