import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { useLogin } from "../hooks/mutations/useLogin";
import { signInSchema, SignInSchema } from "./schema/signInSchema";

export function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useLogin();
  function onSubmit(data: SignInSchema) {
    mutate(data);
  }

  return (
    <View style={{ gap: 16, width: "100%" }}>
      {/* EMAIL */}
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
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

        {errors.email && (
          <Text style={{ color: "red" }}>{errors.email.message}</Text>
        )}
      </View>

      {/* PASSWORD */}
      <View>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 12,
                color: "#fff",
                borderRadius: 8,
                backgroundColor: "#000000",
              }}
            />
          )}
        />

        {errors.password && (
          <Text style={{ color: "red" }}>{errors.password.message}</Text>
        )}
      </View>

      {/* BUTTON */}
      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        style={{
          backgroundColor: "#050229",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>
          {isPending ? "Entrando..." : "Entrar"}
        </Text>
      </Pressable>
    </View>
  );
}
