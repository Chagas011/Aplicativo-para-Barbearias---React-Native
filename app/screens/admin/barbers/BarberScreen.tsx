import { useListBarberByBarbershop } from "@/app/hooks/queries/useListBarberByBarbershop";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import LoadingPulse from "@/components/loading";
import { ThemedText } from "@/components/themed-text";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarberCard from "./components/BarberCard";

interface IBarberScreenProps {
  barbershopId: string;
}
export default function BarberScreen({ barbershopId }: IBarberScreenProps) {
  const { data, isLoading } = useListBarberByBarbershop(barbershopId);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingPulse />
      </View>
    );
  }

  if (!data || data.barber.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <ThemedText
            style={{
              color: "#9ca3af",
              textAlign: "center",
              fontSize: 15,
              lineHeight: 22,
            }}
          >
            Você ainda não cadastrou nenhum barbeiro.
          </ThemedText>

          <ThemedText
            style={{
              color: "#9ca3af",
              marginTop: 8,
              fontWeight: "600",
            }}
          >
            Volte e toque em (Novo Barbeiro)...
          </ThemedText>
        </View>
      </SafeAreaView>
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
