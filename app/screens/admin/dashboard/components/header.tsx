import { useAuthStore } from "@/app/store/auth";
import { ThemedText } from "@/components/themed-text";
import { Pressable, View } from "react-native";

export default function Header() {
  const { logout } = useAuthStore();
  return (
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
  );
}
