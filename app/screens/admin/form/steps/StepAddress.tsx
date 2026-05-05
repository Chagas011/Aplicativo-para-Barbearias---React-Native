import { Controller, useFormContext } from "react-hook-form";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CreateBarbershopFormData } from "../schema";

export function StepAddress() {
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
        <View>
          <Controller
            control={control}
            name="address.zipCode"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="CEP"
                autoCapitalize="none"
                keyboardType="numeric"
                value={value}
                maxLength={8}
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

          {errors.address?.zipCode && (
            <Text style={{ color: "#c21a1a", paddingTop: 5 }}>
              {errors.address.zipCode.message}
            </Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="address.street"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Rua da Barbearia"
                autoCapitalize="words"
                keyboardType="default"
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

          {errors.address?.street && (
            <Text style={{ color: "#c21a1a", paddingTop: 5 }}>
              {errors.address?.street.message}
            </Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="address.city"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Cidade"
                autoCapitalize="words"
                keyboardType="default"
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

          {errors.address?.city && (
            <Text style={{ color: "#c21a1a", paddingTop: 5 }}>
              {errors.address?.city.message}
            </Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="address.state"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Estado"
                autoCapitalize="words"
                keyboardType="default"
                maxLength={2}
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

          {errors.address?.state && (
            <Text style={{ color: "#c21a1a", paddingTop: 5 }}>
              {errors.address?.state.message}
            </Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="address.number"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Numero"
                autoCapitalize="words"
                keyboardType="default"
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

          {errors.address?.number && (
            <Text style={{ color: "#c21a1a", paddingTop: 5 }}>
              {errors.address?.number.message}
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
