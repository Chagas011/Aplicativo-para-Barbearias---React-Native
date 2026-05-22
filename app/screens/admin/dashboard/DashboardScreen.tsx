import { useListBarbershopByAccount } from "@/app/hooks/queries/admin/useListBarbershopByAccount";
import LoadingPulse from "@/components/loading";
import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarbershopCard from "./components/BarbershopCard";
import Header from "./components/header";
export default function DashboardScreen() {
  const { data, isLoading } = useListBarbershopByAccount();
  if (isLoading || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingPulse />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View>
          <Pressable
            onPress={() => router.push("/(admin)/barbershop/create")}
            style={{
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              height: 30,
              width: 150,
            }}
          >
            <ThemedText>Nova Barbearia</ThemedText>
          </Pressable>
        </View>
        <Header />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 10, gap: 10, paddingBottom: 50 }}
      >
        {data.barberShop.map((barbershop) => (
          <BarbershopCard barbershop={barbershop} key={barbershop.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
