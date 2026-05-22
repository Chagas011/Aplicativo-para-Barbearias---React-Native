import { useListAvailableTimes } from "@/app/hooks/queries/useListAvailableTimes";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IAvailableTimesScreenProps {
  id: string;
  barberId: string;
  barbershopId: string;
}

export default function AvailableTimesScreen({
  barberId,
  barbershopId,
  id,
}: IAvailableTimesScreenProps) {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const { data, isLoading } = useListAvailableTimes(
    barbershopId,
    barberId,
    id,
    date,
  );

  function showDatePicker() {
    setDatePickerVisible(true);
  }

  function hideDatePicker() {
    setDatePickerVisible(false);
  }

  function handleConfirm(selectedDate: Date) {
    const formatted = selectedDate.toISOString().split("T")[0];

    setDate(formatted);
  }

  const selectedDate = new Date(date).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
    >
      {/* HEADER */}
      <View style={{ flexDirection: "row", gap: 5, padding: 20 }}>
        <Pressable
          style={{ flexDirection: "row", gap: 5 }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={25} color="hsl(210 100% 55%)" />
        </Pressable>
      </View>

      {/* TITLE */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          gap: 20,
        }}
      >
        <View>
          <ThemedText
            style={{
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            Horários disponíveis
          </ThemedText>

          <ThemedText
            style={{
              color: "#888",
              marginTop: 5,
            }}
          >
            Escolha um horário disponível
          </ThemedText>
        </View>

        {/* DATE CARD */}
        <Pressable
          onPress={showDatePicker}
          style={({ pressed }) => [
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#111",
              borderRadius: 18,
              padding: 18,
              borderWidth: 1,
              borderColor: "#1f1f1f",
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: "#00d5ff20",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="calendar-outline" size={22} color="#00d5ff" />
            </View>

            <View>
              <ThemedText
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 15,
                  textTransform: "capitalize",
                }}
              >
                {selectedDate}
              </ThemedText>

              <ThemedText
                style={{
                  color: "#777",
                  fontSize: 12,
                  marginTop: 2,
                }}
              >
                Toque para alterar a data
              </ThemedText>
            </View>
          </View>

          <Ionicons name="chevron-down" size={20} color="#777" />
        </Pressable>
      </View>

      {/* LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          gap: 12,
          paddingBottom: 40,
        }}
      >
        {isLoading && (
          <View
            style={{
              marginTop: 80,
              alignItems: "center",
              gap: 14,
            }}
          >
            <ActivityIndicator size="large" color="#00d5ff" />

            <ThemedText style={{ color: "#888" }}>
              Carregando horários...
            </ThemedText>
          </View>
        )}

        {!isLoading &&
          data?.availableTimes?.map((time: string) => (
            <Pressable
              key={time}
              style={({ pressed }) => [
                {
                  backgroundColor: "#111",
                  borderWidth: 1,
                  borderColor: "#1f1f1f",
                  padding: 18,
                  borderRadius: 18,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: pressed ? 0.75 : 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    backgroundColor: "#00d5ff15",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="time-outline" size={20} color="#00d5ff" />
                </View>

                <View>
                  <ThemedText
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    {time}
                  </ThemedText>

                  <ThemedText
                    style={{
                      color: "#777",
                      fontSize: 12,
                    }}
                  >
                    Horário disponível
                  </ThemedText>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "#0fe46820",
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderRadius: 999,
                }}
              >
                <ThemedText
                  style={{
                    color: "#0fe468",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  Disponivel
                </ThemedText>
              </View>
            </Pressable>
          ))}

        {!isLoading && data?.availableTimes?.length === 0 && (
          <View
            style={{
              marginTop: 100,
              alignItems: "center",
              gap: 14,
              paddingHorizontal: 20,
            }}
          >
            <Ionicons name="calendar-clear-outline" size={70} color="#222" />

            <ThemedText
              style={{
                color: "#888",
                textAlign: "center",
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              Nenhum horário disponível para esta data.
            </ThemedText>
          </View>
        )}
      </ScrollView>

      {/* DATE MODAL */}
      <Modal visible={isDatePickerVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <View
            style={{
              backgroundColor: "#111",
              borderRadius: 24,
              padding: 20,
              width: "90%",
              borderWidth: 1,
              borderColor: "#222",
            }}
          >
            <ThemedText
              style={{
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Escolha uma data
            </ThemedText>

            <DateTimePicker
              value={new Date(date)}
              mode="date"
              display="inline"
              locale="pt-BR"
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  handleConfirm(selectedDate);
                }
              }}
            />

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginTop: 20,
              }}
            >
              <Pressable
                onPress={hideDatePicker}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 12,
                  backgroundColor: "#1f1f1f",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  Cancelar
                </ThemedText>
              </Pressable>

              <Pressable
                onPress={hideDatePicker}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 12,
                  backgroundColor: "hsl(210 100% 55%)",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  style={{
                    color: "#000",
                    fontWeight: "700",
                  }}
                >
                  Confirmar
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
