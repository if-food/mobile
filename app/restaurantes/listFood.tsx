import { View, Text, TouchableOpacity } from "react-native";
import SimpleImagePicker from "components/Image";

interface ListagemCardapioProps {
  category: string;
  products: {
    title: string;
    description: string;
    price: string;
    photo: any;
    onPress: () => void;
  }[];
}

const ListagemCardapio = ({
  category,
  products,
}: ListagemCardapioProps) => {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 32,
          color: "#24A645",
          fontWeight: "bold",
          paddingBottom: 16,
          paddingLeft: 8,
        }}
      >
        {category}
      </Text>
      {products.length > 0 ? (
        products.map((product, index) => (
          <TouchableOpacity
            onPress={product.onPress}
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
              padding: 16
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 8,
                paddingLeft: 8,
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <View style={{ justifyContent: "center", flex: 1, marginRight: 16 }}>
                  <Text
                    style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}
                  >
                    {product.title}
                  </Text>
                  <Text
                    style={{ color: "#fff", flexShrink: 1, marginBottom: 4 }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {product.description}
                  </Text>
                  <Text style={{ color: "#24A645", fontWeight: "bold" }}>
                    {product.price}
                  </Text>
                </View>
                <SimpleImagePicker
                  imageUri={product.photo}
                  imageStyle={{ borderRadius: 8, width: 160, height: 100 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={{ color: "white" }}>Nenhum prato disponível</Text>
      )}
    </View>
  );
};

export default ListagemCardapio;
