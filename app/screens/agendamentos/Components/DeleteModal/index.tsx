import { ThemedText } from "@/components/themed-text";
import { Modal, Pressable, View } from "react-native";

interface IDeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  onClose,
  onConfirm,
  visible,
}: IDeleteModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "#1e1e1e",
            borderRadius: 16,
            padding: 20,
            gap: 15,
          }}
        >
          <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
            Cancelar agendamento
          </ThemedText>

          <ThemedText style={{ color: "gray" }}>
            Deseja realmente cancelar este agendamento?
          </ThemedText>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 10,
            }}
          >
            {/* Cancelar */}
            <Pressable
              onPress={onClose}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}
            >
              <ThemedText style={{ color: "gray" }}>Voltar</ThemedText>
            </Pressable>

            {/* Confirmar */}
            <Pressable
              onPress={onConfirm}
              style={{
                backgroundColor: "#af0e0e",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
              }}
            >
              <ThemedText>Cancelar agendamento</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
