import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useListBarbershop } from "@/app/hooks/queries/useListBarbershop";
import { useAuthStore } from "@/app/store/auth";
import BarberShopCard from "./Components/BarberShopCard";
import Search from "./Components/Search";
import { styles } from "./styles";
export default function HomeScreen() {
  const { data, isLoading } = useListBarbershop();
  const { logout } = useAuthStore();
  const [search, setSearch] = useState("");

  if (isLoading || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Carregando...</ThemedText>
      </View>
    );
  }

  const filteredBarbers = data.barberShop.filter(
    (barber) =>
      barber.name.toLowerCase().includes(search.toLowerCase()) ||
      barber.address.street.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <SafeAreaView style={{ marginBottom: 70 }}>
      <View>
        <Pressable
          style={{
            backgroundColor: "#fff",
            width: 80,
            height: 30,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={logout}
        >
          <ThemedText style={{ color: "#000" }}>Sair</ThemedText>
        </Pressable>
      </View>
      <ThemedView style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              padding: 5,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Ionicons name="cut" size={24} color={"hsl(210 100% 55%)"} />
          </View>
          <ThemedText type="subtitle">BarberApp</ThemedText>
        </View>
      </ThemedView>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Search
          placeholder="Buscar barbearia por nome ou endereço"
          onChangeText={setSearch}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 30, gap: 10, padding: 10 }}
      >
        {filteredBarbers?.map((barber) => (
          <BarberShopCard barber={barber} key={barber.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
