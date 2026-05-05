import { Barbershop } from "@/app/types/Barbershop";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { ThemedText } from "@/components/themed-text";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

interface IBarberShopCard {
  barber: Barbershop;
}

export default function BarberShopCard({ barber }: IBarberShopCard) {
  return (
    <Card>
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
          <ThemedText>{barber.address.street}</ThemedText>
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
            <ThemedText>{barber.openingHours[0].open}</ThemedText>
            <ThemedText>{barber.openingHours[0].close}</ThemedText>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="phone" size={16} color="green" />
            <ThemedText>{barber.phone}</ThemedText>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <FontAwesome name="instagram" size={16} color="purple" />
            <ThemedText>insta</ThemedText>
          </View>
        </View>

        <View style={{ flexDirection: "row-reverse", marginTop: 10 }}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/barbershop/[id]",
                params: { id: barber.id },
              })
            }
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={styles.buttonText}>Reservar</Text>
          </Pressable>
        </View>
      </CardContent>
    </Card>
  );
}
