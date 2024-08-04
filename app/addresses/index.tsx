import React from "react";
import { View, StyleSheet } from "react-native";
import ButtonCustom from "components/ButtonCustom";
import Footer from "components/Footer";
import AddressCard from "components/AddressCard";

export default function Adresses() {
  const addresses = [
    {
      icon: "home",
      title: "Casa",
      address: "Rua X, Jaboatão dos Guararapes - PE",
      complement: "Sem complemento",
    },
    {
      icon: "apartment",
      title: "Apartamento",
      address: "Av. Recife, Recife - PE",
      complement: "Prédio A, Número 201",
    },
  ];

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
      <ButtonCustom texto="Adicionar novo endereço" />
      <Footer title="sssss" />
    </View>
  );
}
