import { View, Text, Image, ImageSourcePropType } from "react-native";

interface ReviewCardProps {
  source: ImageSourcePropType;
  name: string;
  description: string;
  price: string;
}

export default function ReviewCard({ source, name, description, price }: ReviewCardProps) {
  const formattedPrice = parseFloat(price).toFixed(2);
  
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#2b2e32', marginBottom: 16, padding: 8 }}>
      <Image source={source} style={{ width: 80, height: 80 }} />
      <View style={{ flex: 1, paddingLeft: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{name}</Text>
        <Text style={{ fontSize: 12, color: '#fff' }}>{description}</Text>
        <Text style={{ fontSize: 12, color: '#24A645' }}>R$ {formattedPrice}</Text>
      </View>
    </View>
  );
}
