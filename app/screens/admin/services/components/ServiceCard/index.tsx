import { Card } from "@/components/Card";
import { ThemedText } from "@/components/themed-text";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Pressable, Switch, View } from "react-native";

import { Service } from "@/app/types/Service";

interface IServiceCard {
  service: Service;
}

export default function ServiceCard({ service }: IServiceCard) {
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <ThemedText style={{ fontWeight: "bold", fontSize: 16 }}>
          {service.name}
        </ThemedText>

        <Pressable>
          <Ionicons name="create-outline" size={20} color="#ccc" />
        </Pressable>
      </View>

      {/* CONTENT */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* INFO */}
        <View style={{ gap: 6 }}>
          {/* DURAÇÃO */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Ionicons name="time-outline" size={16} color="#00d5ff" />
            <ThemedText style={{ color: "gray" }}>
              {service.duration} min
            </ThemedText>
          </View>

          {/* PREÇO */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Ionicons name="cash-outline" size={16} color="#0fe468" />
            <ThemedText style={{ color: "#0fe468", fontWeight: "bold" }}>
              R$ {service.price},00
            </ThemedText>
          </View>
        </View>

        {/* TOGGLE */}
        <View style={{ alignItems: "center" }}>
          <ThemedText style={{ fontSize: 12, color: "gray" }}>
            {service.isActive ? "Ativo" : "Inativo"}
          </ThemedText>

          <Switch
            value={service.isActive}
            onValueChange={(value) => {
              // chamar mutation aqui
            }}
            trackColor={{ false: "#444", true: "#0fe468" }}
            thumbColor="#fff"
          />
        </View>
      </View>
    </Card>
  );
}
