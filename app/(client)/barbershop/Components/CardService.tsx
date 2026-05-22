import BarberPoleIcon from "@/components/barber-pole-icon";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

interface ICardService {
  service: {
    id: string;
    name: string;
    duration: number;
    price: number;
    photoURL?: string;
  };
  selected?: boolean;
}

export default function CardService({ service, selected }: ICardService) {
  return (
    <View
      style={{
        width: 160,
        height: 130,
        borderRadius: 20,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 6,

        backgroundColor: selected ? "#00d5ff20" : "#423d3da2",
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? "#00d5ff" : "#ffffff10",
      }}
    >
      {/* Ícone de barbearia */}
      <View
        style={{
          padding: 8,
          borderRadius: 12,
        }}
      >
        <BarberPoleIcon color="#ececea" />
      </View>

      <ThemedText style={{ fontWeight: "700", textAlign: "center" }}>
        {service.name}
      </ThemedText>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Ionicons name="time-outline" size={14} color="gray" />
        <ThemedText style={{ color: "gray", fontSize: 12 }}>
          {service.duration} min
        </ThemedText>
      </View>

      <ThemedText
        style={{
          color: "#0fe468",
          fontWeight: "bold",
          fontSize: 14,
        }}
      >
        R$ {service.price},00
      </ThemedText>
    </View>
  );
}
