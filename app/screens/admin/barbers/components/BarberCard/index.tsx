import { Card, CardContent, CardHeader } from "@/components/Card";
import { ThemedText } from "@/components/themed-text";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";

import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";

import { useDeleteBarber } from "@/app/hooks/mutations/deleteBarber";
import { Barber } from "@/app/types/Barber";
import { useState } from "react";
import DeleteModal from "../DeleteModal";
import { styles } from "./styles";

interface IBarberCard {
  barber: Barber;
  barbershopId: string;
}

export default function BarberCard({ barber, barbershopId }: IBarberCard) {
  const [visible, setVisible] = useState(false);
  const { mutate, isPending } = useDeleteBarber();
  function onConfirm() {
    mutate({ barbershopId, barberId: barber.id });
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
      <Card>
        <View
          style={{
            gap: 8,
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 5,
          }}
        >
          <View>
            <Pressable onPress={() => setVisible(true)}>
              <Ionicons name="trash" size={22} color={"#af0e0e"} />
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(admin)/barber/update/[id]",
                  params: {
                    id: barbershopId,
                    barberId: barber.id,
                  },
                })
              }
            >
              <Ionicons name="create-outline" size={22} color="white" />
            </Pressable>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(admin)/barbershop/services/[id]",
                  params: { id: barber.id },
                })
              }
            >
              <Ionicons name="cut" size={22} color="white" />
            </Pressable>
          </View>
        </View>
        <CardHeader>
          <Image
            source={{
              uri:
                barber.photoURL ??
                "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=400&h=250&fit=crop",
            }}
            style={styles.avatar}
          />

          <View>
            <ThemedText style={styles.title}>{barber.name}</ThemedText>
          </View>
        </CardHeader>

        <CardContent>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Octicons name="stopwatch" size={16} color="#00d5ff96" />
                  <ThemedText>{barber.workingHours[0].start}</ThemedText>
                  <ThemedText>{barber.workingHours[0].end}</ThemedText>
                </View>
              </View>
            </View>

            <View style={{ marginRight: 15 }}>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/(admin)/service/[id]",
                    params: { id: barber.id },
                  })
                }
                style={({ pressed }) => [
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    backgroundColor: "#0fe46820",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#0fe468",
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Ionicons name="person-add-outline" size={18} color="#0fe468" />

                <ThemedText
                  style={{
                    color: "#0fe468",
                    fontWeight: "600",
                    fontSize: 13,
                  }}
                >
                  Novo servico
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </CardContent>
      </Card>

      <DeleteModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={onConfirm}
      />
    </>
  );
}
