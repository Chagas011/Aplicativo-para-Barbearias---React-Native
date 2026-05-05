import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  Keyboard,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CreateBarbershopFormData } from "../schema";

export function StepSocialMedia() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateBarbershopFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          marginTop: 150,
          gap: 10,
        }}
      >
        <View style={{ gap: 20 }}>
          {fields.map((field, index) => (
            <View
              key={field.id}
              style={{
                gap: 10,
                backgroundColor: "#1e1e1e",
                padding: 15,
                borderRadius: 12,
              }}
            >
              {/* HEADER */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText>Rede social #{index + 1}</ThemedText>

                {fields.length > 1 && (
                  <Pressable onPress={() => remove(index)}>
                    <Ionicons name="trash-outline" size={20} color="#ff4d4f" />
                  </Pressable>
                )}
              </View>

              {/* NAME */}
              <Controller
                control={control}
                name={`socialMedia.${index}.name`}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Ex: Instagram"
                    value={value}
                    onChangeText={onChange}
                    style={{
                      borderWidth: 1,
                      borderColor: "#333",
                      color: "#fff",
                      padding: 12,
                      borderRadius: 8,
                      backgroundColor: "#000",
                    }}
                  />
                )}
              />

              {/* URL */}
              <Controller
                control={control}
                name={`socialMedia.${index}.url`}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="https://instagram.com/..."
                    value={value}
                    onChangeText={onChange}
                    style={{
                      borderWidth: 1,
                      borderColor: "#333",
                      color: "#fff",
                      padding: 12,
                      borderRadius: 8,
                      backgroundColor: "#000",
                    }}
                  />
                )}
              />
            </View>
          ))}

          {/* ADD BUTTON */}
          <Pressable
            onPress={() =>
              append({
                name: "",
                url: "",
              })
            }
            style={{
              flexDirection: "row",
              gap: 8,
              justifyContent: "center",
              alignItems: "center",
              padding: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#00d5ff",
            }}
          >
            <Ionicons name="add-circle-outline" size={18} color="#00d5ff" />
            <ThemedText>Adicionar rede social</ThemedText>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
