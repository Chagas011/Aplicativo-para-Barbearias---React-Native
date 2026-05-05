import { Barbershop } from "@/app/types/Barbershop";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { ThemedText } from "@/components/themed-text";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";

import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { styles } from "./styles";

interface IBarberShopCard {
  barbershop: Barbershop;
}

export default function BarbershopCard({ barbershop }: IBarberShopCard) {
  return (
    <Card>
      <View style={{ flexDirection: "row-reverse", gap: 10 }}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(admin)/barbershop/[id]",
              params: { id: barbershop.id },
            })
          }
        >
          <Ionicons name="create-outline" size={22} color="white" />
        </Pressable>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(admin)/barbershop/barbers/[id]",
              params: { id: barbershop.id },
            })
          }
        >
          <Ionicons name="people" size={22} color="white" />
        </Pressable>
      </View>
      <CardHeader>
        <Image
          source={{
            uri:
              barbershop.photoURL ??
              "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=400&h=250&fit=crop",
          }}
          style={styles.avatar}
        />

        <View>
          <ThemedText style={styles.title}>{barbershop.name}</ThemedText>
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
            <View style={styles.services}>
              <View style={styles.tag}>
                <ThemedText style={styles.tagText}>Corte</ThemedText>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Ionicons name="location-outline" size={16} color="white" />
              <ThemedText>{barbershop.address.street}</ThemedText>
            </View>
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
                <ThemedText>{barbershop.openingHours[0].open}</ThemedText>
                <ThemedText>{barbershop.openingHours[0].close}</ThemedText>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="logo-whatsapp" size={18} color="green" />
                <ThemedText>{barbershop.phone}</ThemedText>
              </View>
              {barbershop.socialMedia.map((socialMedia) => (
                <View
                  key={socialMedia.name}
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="instagram" size={16} color="purple" />
                  <ThemedText>{socialMedia.name}</ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={{ marginRight: 15 }}>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(admin)/barber/[id]",
                  params: { id: barbershop.id },
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
                Novo barbeiro
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
