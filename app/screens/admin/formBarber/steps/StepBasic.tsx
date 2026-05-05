import { Controller, useFormContext } from "react-hook-form";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { PickPhoto } from "@/components/PickPhoto";
import { CreateBarberFormData } from "../schema";

export function StepBasic() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateBarberFormData>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          marginTop: 150,
          gap: 10,
        }}
      >
        <Controller
          control={control}
          name="file"
          render={({ field: { onChange, value } }) => (
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <PickPhoto onPick={(file) => onChange(file)} value={value} />
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
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  color: "#fff",
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: "#000000",
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
    </TouchableWithoutFeedback>
  );
}
