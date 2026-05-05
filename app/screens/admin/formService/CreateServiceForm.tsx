import { useCreateService } from "@/app/hooks/mutations/createService";
import { uploadToS3 } from "@/app/lib/uploadToS3";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateServiceFormData, createServiceSchema } from "./schema";

interface ICreateServiceFormProps {
  barberId: string;
}

export function CreateServiceForm({ barberId }: ICreateServiceFormProps) {
  const { mutateAsync, isPending } = useCreateService();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServiceFormData>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      barberId: barberId,
      duration: "",
      file: undefined,
      isActive: true,
      name: "",
      price: "",
    },
  });

  async function onSubmit(data: CreateServiceFormData) {
    if (!data.barberId || !data.name || !data.duration || !data.price) {
      return;
    }
    try {
      const { uploadSignature } = await mutateAsync({
        dataService: {
          barberId: barberId,
          duration: Number(data.duration),
          isActive: data.isActive,
          name: data.name,
          price: Number(data.price),
          file: data.file,
        },
      });

      if (uploadSignature && data.file) {
        await uploadToS3(uploadSignature, data.file);
      }

      return router.push({
        pathname: "/(admin)/(tabs)/dashboard",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          padding: 20,
          gap: 20,
          justifyContent: "center",
        }}
      >
        {/* TITLE */}
        <View style={{ gap: 4 }}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Novo serviço
          </Text>
          <Text style={{ color: "gray" }}>
            Cadastre um serviço para sua barbearia
          </Text>
        </View>

        {/* NOME */}
        <View style={{ gap: 6 }}>
          <Text style={{ color: "gray", fontSize: 12 }}>Nome do serviço</Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Ex: Corte + barba"
                value={value}
                onChangeText={onChange}
                style={{
                  borderWidth: 1,
                  borderColor: errors.name ? "#ff4d4d" : "#333",
                  color: "#fff",
                  padding: 14,
                  borderRadius: 10,
                  backgroundColor: "#121212",
                }}
              />
            )}
          />

          {errors.name && (
            <Text style={{ color: "#ff4d4d", fontSize: 12 }}>
              {errors.name.message}
            </Text>
          )}
        </View>

        {/* PREÇO */}
        <View style={{ gap: 6 }}>
          <Text style={{ color: "gray", fontSize: 12 }}>Preço</Text>

          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="R$ 0,00"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                style={{
                  borderWidth: 1,
                  borderColor: errors.price ? "#ff4d4d" : "#333",
                  color: "#fff",
                  padding: 14,
                  borderRadius: 10,
                  backgroundColor: "#121212",
                }}
              />
            )}
          />

          {errors.price && (
            <Text style={{ color: "#ff4d4d", fontSize: 12 }}>
              {errors.price.message}
            </Text>
          )}
        </View>

        {/* DURAÇÃO */}
        <View style={{ gap: 6 }}>
          <Text style={{ color: "gray", fontSize: 12 }}>Duração</Text>

          <Controller
            control={control}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Ex: 30"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                style={{
                  borderWidth: 1,
                  borderColor: errors.duration ? "#ff4d4d" : "#333",
                  color: "#fff",
                  padding: 14,
                  borderRadius: 10,
                  backgroundColor: "#121212",
                }}
              />
            )}
          />

          <Text style={{ color: "gray", fontSize: 11 }}>Tempo em minutos</Text>

          {errors.duration && (
            <Text style={{ color: "#ff4d4d", fontSize: 12 }}>
              {errors.duration.message}
            </Text>
          )}
        </View>

        {/* BOTÃO */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          style={({ pressed }) => [
            {
              backgroundColor: "hsl(210 100% 55%)",
              padding: 16,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 10,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={{ color: "#000", fontWeight: "bold" }}>
            {isPending ? "Cadastrando serviço" : "Cadastrar serviço"}
          </Text>
        </Pressable>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
