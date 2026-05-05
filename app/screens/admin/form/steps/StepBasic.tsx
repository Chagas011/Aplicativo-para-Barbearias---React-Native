import { Controller, useFormContext } from "react-hook-form";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { PickBarbershopPhoto } from "../components/PickBarbershopPhoto";
import { CreateBarbershopFormData } from "../schema";

export function StepBasic() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateBarbershopFormData>();

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
              <PickBarbershopPhoto
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
                placeholder="Nome da Barbearia"
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

        <View>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Telefone da Barbearia"
                autoCapitalize="none"
                keyboardType="numeric"
                maxLength={11}
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

          {errors.phone && (
            <Text style={{ color: "#c21a1a", paddingTop: 5 }}>
              {errors.phone.message}
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
