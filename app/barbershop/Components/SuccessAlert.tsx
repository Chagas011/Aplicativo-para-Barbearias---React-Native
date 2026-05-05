import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

export default function SuccessAlert() {
  const [visible, setVisible] = useState(false);

  function closeModal() {
    setVisible(false);
    return router.push({
      pathname: "/(client)/(tabs)/agendamentos",
    });
  }
  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={({ pressed }) => [
          {
            backgroundColor: "hsl(210 100% 15%)",
            paddingVertical: 12,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            width: 350,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <ThemedText>Confirmar Agendamento</ThemedText>
      </Pressable>

      <Modal transparent visible={visible} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 24,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Ionicons name="checkmark-circle" size={60} color="green" />

            <Text style={{ fontSize: 18, marginTop: 10 }}>
              Agendamento confirmado
            </Text>

            <Pressable
              onPress={closeModal}
              style={{
                marginTop: 20,
                backgroundColor: "green",
                padding: 10,
                borderRadius: 8,
                height: 40,
                width: 90,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
