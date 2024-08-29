import Footer from "components/Footer";
import Header from "components/Header";
import { ScrollView, Image, View, Text, ActivityIndicator } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CardRecintosFamosos from "components/CardRecintosFamosos";
import ListRestaurant from "components/ListRestaurant";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import axios from "axios";

import imageOne from "../../assets/images/home/imageOne.png";
import imageTwo from "../../assets/images/home/imageTwo.png";
import imageThree from "../../assets/images/home/imageThree.png";

const images = [imageOne, imageTwo, imageThree];

interface Restaurant {
  id: string;
  nomeFantasia: string;
  open: boolean;
  categoriasEnum: string;
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get<Restaurant[]>(
          "https://if-delivery-api.proudcoast-55fa0165.brazilsouth.azurecontainerapps.io/api/restaurante"
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#2c2d33]">
        <ActivityIndicator size="large" color="#24A645" />
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-start bg-[#2c2d33]">
      <Header title="Av bulhões 77" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <View className="w-full items-center mt-4">
          <Carousel
            style={{ borderRadius: 16 }}
            loop
            width={352}
            height={160}
            autoPlay={true}
            data={images}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={item}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            )}
          />
          <View className="flex-row justify-center mt-2">
            {images.map((_, index) => (
              <View
                key={index}
                className={`w-2.5 h-2.5 rounded-full mx-1 ${
                  index === currentIndex ? "bg-[#24A645]" : "bg-[#1C4F2A]"
                }`}
              />
            ))}
          </View>

          <View className="w-full mt-6">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View className="flex-row justify-between pl-1">
                {restaurants.slice(0, 8).map((restaurant) => (
                  <CardRecintosFamosos
                    key={restaurant.id}
                    onPress={() =>
                      router.push({
                        pathname: `../restaurantes/${restaurant.id}`,
                        params: { nomeFantasia: restaurant.nomeFantasia },
                      })
                    }
                    titleRestaurant={restaurant.nomeFantasia}
                    source={require("../../assets/images/home/card_one.png")}
                  />
                ))}
              </View>
            </ScrollView>
          </View>

          <View className="w-full px-4 mb-14">
            <Text className="text-white pt-10 text-[32px] font-bold pb-4">
              Recintos famosos
            </Text>
            {restaurants.map((restaurant) => (
              <ListRestaurant
                key={restaurant.id}
                onPress={() =>
                  router.push({
                    pathname: `../restaurantes/${restaurant.id}`,
                    params: { nomeFantasia: restaurant.nomeFantasia },
                  })
                }
                source={require("../../assets/images/home/rouned_two.png")}
                titleRestaurant={restaurant.nomeFantasia}
                categoriasEnum={restaurant.categoriasEnum}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
