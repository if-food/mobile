import { View, Text, Image, TouchableOpacity } from 'react-native';

interface ProductCard {
  title: string;
  description: string;
  price: string;
  source: any; 
}

interface ListagemCardapioProps {
  category: string;
  products: ProductCard[];
  onPress?: () => void;
}

const ListagemCardapio = ({ category, products, onPress }: ListagemCardapioProps) => {
  return (
    <View className="mb-6">
      <Text className="text-[32px] text-[#24A645] font-bold pb-2 pl-2">{category}</Text>
      {products.length > 0 ? (
        products.map((product, index) => (
          <TouchableOpacity key={index} onPress={onPress} className="flex-row items-center mb-4">
            <View className="flex-row pb-2 pl-2">
  <View className="flex-row justify-between w-full">
    <View className="justify-center">
              <Text className="text-[#fff] font-bold text-[20px]">{product.title}</Text>
              <Text className="text-[#fff]">{product.description}</Text>
              <Text className="text-[#24A645] font-bold">{product.price}</Text>
            </View>
            <Image source={product.source} className="w-25 h-[100px] mr-4 rounded-2xl" />
            </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-white">Nenhum prato disponível</Text>
      )}
    </View>
  );
};

export default ListagemCardapio;
