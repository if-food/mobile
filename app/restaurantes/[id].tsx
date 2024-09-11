import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import Footer from "components/Footer";
import CardRestaurantPage from "./cardRestaurantPage";
import ListagemCardapio from "./listFood";
import SimpleImagePicker from "components/Image";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { Product } from "interfaces/Product";

interface Restaurant {
  id: string;
  open: boolean;
  categoriasEnum: string;
  nomeFantasia: string;
  photoLogo?: string;
}

interface ProductsByCategory {
  [category: string]: Product[];
}

export default function Restaurantes() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [productsByCategory, setProductsByCategory] =
    useState<ProductsByCategory>({});
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get<Restaurant>(
          `https://api-1-drn7.onrender.com/api/restaurante/?restauranteId=${id}`
        );
        setRestaurant(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get<Record<string, Product[]>>(
          `https://api-1-drn7.onrender.com/api/produto/cardapio/${id}`
        );
        setProductsByCategory(response.data);
      } catch (error) {
        console.error("Failed to fetch products data:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRestaurant(), fetchProducts()]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: `../orderRestaurant/${product.id}`,
      params: {
        productId: product.id,
        productName: product.titulo,
        productImage: (product.imagem as string) || "",
        productDescription: product.descricao,
        productPrice: product.valorUnitario.toFixed(2),
        quantity: "1",
        totalPrice: product.valorUnitario.toFixed(2),
        restaurantName: restaurant ? restaurant.nomeFantasia : "",
        restaurantId: id,
        restaurantPhoto: restaurant ? restaurant.photoLogo : "",
      },
    });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#2c2d33",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#24A645" />
        <Text style={{ color: "#fff", marginTop: 16 }}>Carregando...</Text>
      </View>
    );
  }

  const hasProducts = Object.keys(productsByCategory).length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: "#2c2d33" }}>
      <ScrollView style={{ marginBottom: 56 }}>
        <Image
          source={require("../../assets/images/restaurante/banner.png")}
          style={{ width: "100%", height: 200 }}
        />
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 24,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
              {restaurant ? restaurant.nomeFantasia : "Carregando..."}
            </Text>
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
              {restaurant ? restaurant.categoriasEnum : "Carregando..."}
            </Text>
            <Text
              style={{
                color: restaurant
                  ? restaurant.open
                    ? "#0f0"
                    : "#f00"
                  : "#fff",
              }}
            >
              {restaurant ? (restaurant.open ? "Aberto 🟢" : "Fechado 🔴") : ""}
            </Text>
          </View>
          <SimpleImagePicker
            imageUri={restaurant?.photoLogo}
            imageStyle={{ borderRadius: 50, width: 60, height: 60 }}
          />
        </View>
        <View style={{ paddingHorizontal: 16, paddingTop: 24 }}>
          <Text
            style={{
              fontSize: 32,
              color: "#fff",
              fontWeight: "bold",
              paddingBottom: 16,
              paddingLeft: 8,
            }}
          >
            Os mais pedidos
          </Text>
          {hasProducts ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row" }}>
                {Object.values(productsByCategory)
                  .flat()
                  .map((product) => (
                    <CardRestaurantPage
                      key={product.id}
                      photo={product.imagem}
                      title={product.titulo}
                      valorUnitario={`R$ ${product.valorUnitario.toFixed(2)}`}
                      onPress={() => handleProductPress(product)}
                    />
                  ))}
              </View>
            </ScrollView>
          ) : (
            <Text style={{ color: "#fff", fontSize: 16, marginVertical: 16 }}>
              Nenhum prato disponível
            </Text>
          )}
        </View>
        {Object.entries(productsByCategory).map(([category, products]) => (
          <ListagemCardapio
            key={category}
            category={category}
            products={products.map((product) => ({
              title: product.titulo,
              description: product.descricao,
              price: `R$ ${product.valorUnitario.toFixed(2)}`,
              photo: product.imagem,
              onPress: () => handleProductPress(product),
            }))}
          />
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
}
