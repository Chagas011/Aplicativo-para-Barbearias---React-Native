import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useListServicesByBarber } from "@/app/hooks/queries/useListServicesByBarber";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ServiceCard from "./components/ServiceCard";

interface IServiceScreenProps {
  barberId: string;
}
export default function ServiceScreen({ barberId }: IServiceScreenProps) {
  const { data, isLoading } = useListServicesByBarber(barberId);

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
        {data?.service.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
