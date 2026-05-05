import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Alert, Image, TouchableOpacity, View } from "react-native";

type PickPhotoProps = {
  onPick: (file: {
    uri: string;
    type: string;
    size?: number;
    name: string;
  }) => void;

  value?: {
    uri: string;
  };
};

export function PickPhoto({ onPick, value }: PickPhotoProps) {
  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Precisamos de acesso à sua galeria");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];

    const file = {
      uri: asset.uri,
      name: `barbershop-${Date.now()}.jpeg`,
      type: "image/jpeg",
      size: asset.fileSize,
    };

    onPick(file);
  }

  return (
    <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
      <View
        style={{
          width: 220,
          height: 160,
          borderRadius: 16,
          borderWidth: 1.5,
          borderStyle: "dashed",
          borderColor: value?.uri ? "#00d5ff" : "#666",
          backgroundColor: value?.uri ? "#00d5ff15" : "#1e1e1e",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {value?.uri ? (
          <Image
            source={{ uri: value.uri }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <View style={{ alignItems: "center", gap: 8 }}>
            <Ionicons name="camera-outline" size={32} color="#aaa" />

            <ThemedText style={{ color: "#aaa", fontSize: 13 }}>
              Adicionar foto
            </ThemedText>
          </View>
        )}
      </View>

      <View style={{ marginTop: 8, alignItems: "center" }}>
        <ThemedText style={{ fontSize: 12, color: "#888" }}>
          Toque para selecionar uma imagem
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}
