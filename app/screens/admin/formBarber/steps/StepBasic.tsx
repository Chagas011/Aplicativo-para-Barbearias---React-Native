import { Controller, useFormContext } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { PickPhoto } from "@/components/PickPhoto";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateBarberFormData } from "../schema";

export function StepBasic() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateBarberFormData>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 40,
              paddingHorizontal: 20,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                paddingTop: 40,
                gap: 12,
              }}
            >
              <Controller
                control={control}
                name="file"
                render={({ field: { onChange, value } }) => (
                  <View style={{ alignItems: "center", marginBottom: 20 }}>
                    <PickPhoto
                      onPick={(file) => onChange(file)}
                      value={value}
                    />
                  </View>
                )}
              />

              <View>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="Nome do Barbeiro"
                      autoCapitalize="words"
                      value={value}
                      onChangeText={onChange}
                      placeholderTextColor="#777"
                      style={{
                        borderWidth: 1,
                        borderColor: "#333",
                        color: "#fff",
                        padding: 14,
                        borderRadius: 12,
                        backgroundColor: "#121212",
                      }}
                    />
                  )}
                />

                {errors.name && (
                  <Text style={{ color: "#c21a1a", paddingTop: 5 }}>
                    {errors.name.message}
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
