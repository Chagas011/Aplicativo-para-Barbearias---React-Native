import { ThemedText } from "@/components/themed-text";
import { Image, View } from "react-native";

interface ICardBarberProps {
  barbeiro: {
    id: string;
    name: string;
    photoURL?: string;
  };
  selected?: boolean;
}

export default function CardBarber({ barbeiro, selected }: ICardBarberProps) {
  return (
    <View
      style={{
        height: 130,
        borderRadius: 8,
        width: 160,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: selected ? "#00d5ff30" : "#423d3da2",
        borderWidth: selected ? 2 : 0,
        borderColor: "#00d5ff",
      }}
    >
      <View
        style={{
          borderRadius: 20,
          width: 60,
          height: 50,

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{
            uri:
              barbeiro.photoURL ??
              "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=400&h=250&fit=crop",
          }}
          style={{
            width: 60,
            height: 50,
            borderRadius: 30,
          }}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ThemedText>{barbeiro.name}</ThemedText>
      </View>
    </View>
  );
}
