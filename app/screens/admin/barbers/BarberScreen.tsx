import { useListBarberByBarbershop } from "@/app/hooks/queries/useListBarberByBarbershop";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarberCard from "./components/BarberCard";

interface IBarberScreenProps {
  barbershopId: string;
}
export default function BarberScreen({ barbershopId }: IBarberScreenProps) {
  const { data, isLoading } = useListBarberByBarbershop(barbershopId);

  if (isLoading || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Carregando...</ThemedText>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", gap: 5, padding: 20 }}>
        <Pressable
          style={{ flexDirection: "row", gap: 5 }}
          onPress={() =>
            router.push({
              pathname: "/(admin)/(tabs)/dashboard",
            })
          }
        >
          <Ionicons name="arrow-back" size={25} color="hsl(210 100% 55%)" />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 10, gap: 10 }}>
        {data?.barber.map((barber) => (
          <BarberCard
            barber={barber}
            barbershopId={barbershopId}
            key={barber.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
