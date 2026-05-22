import { Controller, useFormContext } from "react-hook-form";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateBarbershopFormData } from "../schema";

export function StepAddress() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateBarbershopFormData>();

  async function handleZipCodeChange(zipCode: string) {
    const formattedZipCode = zipCode.replace(/\D/g, "");

    if (formattedZipCode.length !== 8) {
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${formattedZipCode}/json/`,
      );

      const data = await response.json();

      if (data.erro) {
        return;
      }

      setValue("address.street", data.logradouro);
      setValue("address.city", data.localidade);
      setValue("address.state", data.uf);
    } catch {
      Alert.alert("Erro ao buscar CEP");
    }
  }

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
              <View>
                <Controller
                  control={control}
                  name="address.zipCode"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="digite o CEP"
                      autoCapitalize="none"
                      keyboardType="numeric"
                      value={value}
                      maxLength={8}
                      onChangeText={(text) => {
                        onChange(text);
                        handleZipCodeChange(text);
                      }}
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

                {errors.address?.number && (
                  <Text style={{ color: "#c21a1a", paddingTop: 5 }}>
                    {errors.address?.number.message}
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
