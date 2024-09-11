import { View, Text, ActivityIndicator } from 'react-native';
import { ScrollView } from 'tamagui';
import OrdersCard from './../../components/OrdersCard/index';
import Footer from 'components/Footer';
import useFetchPedidos from 'hooks/useFetchPedidos'; 
import { STATUS_MESSAGES } from 'enums/Status';

export default function RegistroPedidos() {
  const { pedidos, isLoading } = useFetchPedidos(7);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#2c2d33]">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#2c2d33] w-full">
      <ScrollView>
        <View className="items-start px-6 my-4">
          <Text className="text-[24px] font-bold text-[#fff] my-4">Últimos Pedidos</Text>
          <View className='mb-20'>
            {pedidos.flatMap(pedido =>
              pedido.itens.map(item => {
                const statusData = STATUS_MESSAGES[pedido.statusEntrega] || { message: 'Status desconhecido', color: '#FFFFFF' };
                return (
                  <OrdersCard
                    key={pedido.id}
                    source={item.produto.imagem}
                    name={item.produto.titulo}
                    description={item.produto.descricao}
                    price={item.produto.valorUnitario}
                    status={statusData.message}
                    statusColor={statusData.color}
                  />
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
