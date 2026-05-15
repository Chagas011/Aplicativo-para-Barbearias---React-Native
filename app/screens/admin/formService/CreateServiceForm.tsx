import { useCreateService } from "@/app/hooks/mutations/createService";
import { useUpdateService } from "@/app/hooks/mutations/updateService";
import { useGetServiceById } from "@/app/hooks/queries/getServiceById";
import { uploadToS3 } from "@/app/lib/uploadToS3";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect } from "react";
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
  serviceId?: string;
}

export function CreateServiceForm({
  barberId,
  serviceId,
}: ICreateServiceFormProps) {
  const isEdit = !!serviceId;
  const { data: service, isLoading } = useGetServiceById(
    serviceId ?? "",
    barberId,
  );
  const { mutateAsync: updateService, isPending: isPendingUpdate } =
    useUpdateService();
  const { mutateAsync, isPending } = useCreateService();

  const loading = isPending || isPendingUpdate;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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

  useEffect(() => {
    if (service?.service) {
      const data = service.service;
      reset({
        barberId,
        duration: String(data.duration),
        file: undefined,
        isActive: data.isActive,
        name: data.name,
        price: String(data.price),
      });
    }
  }, [barberId, reset, service]);

  async function onSubmit(data: CreateServiceFormData) {
    if (!data.barberId || !data.name || !data.duration || !data.price) {
      return;
    }
    try {
      if (isEdit && serviceId) {
        const { uploadSignature } = await updateService({
          barberId,
          serviceId,
          dataService: {
            duration: Number(data.duration),
            file: data.file,
            isActive: data.isActive,
            name: data.name,
            price: Number(data.price),
          },
        });
        if (uploadSignature && data.file) {
          await uploadToS3(uploadSignature, data.file);
        }

        return router.push({
          pathname: "/(admin)/barbershop/services/[id]",
          params: { id: barberId },
        });
      }

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
  if (isEdit && isLoading) {
    return <ThemedText>Carregando...</ThemedText>;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={{
          flex: 1,
          padding: 20,
          gap: 20,
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Pressable
            style={{ flexDirection: "row", gap: 5 }}
            onPress={() =>
              router.push({
                pathname: "/(admin)/(tabs)/dashboard",
              })
            }
          >
            <Ionicons name="arrow-back" size={25} color="hsl(210 100% 55%)" />
          </Pressable>
        </View>

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
          disabled={loading}
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
            {loading
              ? "Salvando..."
              : isEdit
                ? "Atualizar Serviço"
                : "Cadastrar Serviço"}
          </Text>
        </Pressable>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
