import { useDeleteScheduling } from "@/app/hooks/mutations/deleteScheduling";
import { Scheduling } from "@/app/types/Scheduling";
import { Card, CardContent } from "@/components/Card";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import DeleteModal from "./Components/DeleteModal";

interface ICardAgendamentoProps {
  scheduling: Scheduling;
}

export default function CardAgendamento({ scheduling }: ICardAgendamentoProps) {
  const { barber, barbershop, service, date, startTime } = scheduling;
  const { mutate, isPending } = useDeleteScheduling();

  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function onConfirm() {
    mutate({ barberId: barber.id, date, startTime });
    setVisible(false);
  }

  if (isPending) {
    return (
      <View>
        <ThemedText>Carregando...</ThemedText>
      </View>
    );
  }

  return (
    <>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <Card>
          <CardContent>
            {/* HEADER */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View style={{ flexDirection: "row", gap: 8 }}>
                <ThemedText>⚡</ThemedText>
                <ThemedText>PRÓXIMO AGENDAMENTO</ThemedText>
              </View>

              <View style={{ flexDirection: "row", gap: 10 }}>
                {/* expand icon */}
                <Ionicons
                  name={expanded ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="gray"
                />

                {/* delete */}
                <Pressable onPress={() => setVisible(true)}>
                  <Ionicons name="trash" size={18} color={"#af0e0e"} />
                </Pressable>
              </View>
            </View>

            {/* CONTEÚDO */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "gray",
                borderWidth: 0.2,
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Image
                  source={{
                    uri:
                      barber.photoURL ??
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
                  }}
                  style={{
                    width: 60,
                    height: 50,
                    borderRadius: 10,
                  }}
                />

                <View>
                  <ThemedText style={{ fontWeight: "700", fontSize: 16 }}>
                    💈 {service.name}
                  </ThemedText>

                  <ThemedText style={{ color: "gray" }}>
                    {barbershop.name}
                  </ThemedText>

                  <ThemedText style={{ color: "gray" }}>
                    Com {barber.name}
                  </ThemedText>
                </View>
              </View>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <ThemedText style={{ color: "#0fe468", fontWeight: "bold" }}>
                  R$ {service.price},00
                </ThemedText>
              </View>
            </View>

            {/* DATA / HORA */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
                padding: 5,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={"hsl(210 100% 55%)"}
                />
                <ThemedText>{date}</ThemedText>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={"hsl(210 100% 55%)"}
                />
                <ThemedText>{startTime}</ThemedText>
              </View>
            </View>

            {/* 🔽 ENDEREÇO (EXPANSÍVEL) */}
            {expanded && (
              <View
                style={{
                  marginTop: 10,
                  padding: 10,
                  borderTopWidth: 0.5,
                  borderTopColor: "gray",
                  gap: 6,
                }}
              >
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Ionicons name="location-outline" size={16} color="gray" />
                  <ThemedText style={{ color: "gray" }}>
                    {barbershop.address?.street}, {barbershop.address?.number}
                  </ThemedText>
                </View>

                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Ionicons name="business-outline" size={16} color="gray" />
                  <ThemedText style={{ color: "gray" }}>
                    {barbershop.address?.city}
                  </ThemedText>
                </View>
              </View>
            )}
          </CardContent>
        </Card>
      </Pressable>

      <DeleteModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={onConfirm}
      />
    </>
  );
}
