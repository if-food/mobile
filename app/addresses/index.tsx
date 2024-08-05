import { View } from "react-native";
import ButtonCustom from "components/ButtonCustom";
import Footer from "components/Footer";
import AddressCard from "components/AddressCard";
import { useRouter } from "expo-router";

export default function Adresses() {
  const addresses = [
    {
      icon: "home",
      title: "Casa",
      address: "Rua X, Jaboatão - PE",
      complement: "Sem complemento",
    },
    {
      icon: "apartment",
      title: "Apartamento",
      address: "Av. Recife, Recife - PE",
      complement: "Prédio A, Número 201",
    },
  ];

  const router = useRouter();
  const handleAddress = () => {
    router.push('./address');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#2c2d33",
        alignItems: "center",
        paddingTop: 24,
      }}
    >
      {addresses.map((address, index) => (
        <AddressCard
          key={index}
          icon={address.icon}
          title={address.title}
          address={address.address}
          complement={address.complement}
        />
      ))}
       <ButtonCustom
        style={{ width: "90%", marginTop: 16 }}
        texto="Adicionar novo endereço"
        iconName="add-circle"
        iconColor="#1C4F2A"
        onPress={handleAddress}
      />
      <Footer/>
    </View>
  );
}
