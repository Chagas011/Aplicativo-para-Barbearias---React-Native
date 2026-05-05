import { useCreateBarbershop } from "@/app/hooks/mutations/createBarbershop";
import { useUpdateBarbershop } from "@/app/hooks/mutations/updateBarbershop";
import { uploadToS3 } from "@/app/lib/uploadToS3";
import { Days } from "@/app/types/Days";
import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";
import { useFormContext, useWatch } from "react-hook-form";
import { Image, Pressable, ScrollView, View } from "react-native";
import { CreateBarbershopFormData } from "../schema";

interface IStepConfirmProps {
  isEdit: boolean;
  barbershopId?: string;
}
export function StepConfirm({ isEdit, barbershopId }: IStepConfirmProps) {
  const { control } = useFormContext<CreateBarbershopFormData>();
  const { mutateAsync, isPending } = useCreateBarbershop();
  const { mutateAsync: updateBarbershop, isPending: isPendingUpdate } =
    useUpdateBarbershop();

  const data = useWatch({ control }) as CreateBarbershopFormData;

  const { name, phone, address, openingHours, socialMedia, file } = data;
  const loading = isPending || isPendingUpdate;
  async function handleSubmit() {
    if (!name || !phone || !address || !openingHours) {
      return;
    }
    try {
      if (isEdit && barbershopId) {
        const { uploadSignature } = await updateBarbershop({
          barbershopId,
          dataBarbershop: {
            name,
            address,
            openingHours,
            phone,
            file,
            socialMedia,
          },
        });
        if (uploadSignature && file) {
          await uploadToS3(uploadSignature, file);
        }

        return router.push("/(admin)/(tabs)/dashboard");
      }

      const { uploadSignature } = await mutateAsync({
        dataBarbershop: {
          name,
          address,
          openingHours,
          phone,
          file,
          socialMedia,
        },
      });

      if (uploadSignature && file) {
        await uploadToS3(uploadSignature, file);
      }

      return router.push({
        pathname: "/(admin)/(tabs)/dashboard",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ gap: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* CARD */}
      <View
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: 16,
          padding: 16,
          gap: 20,
          marginTop: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {file?.uri ? (
            <Image
              source={{ uri: file.uri }}
              style={{
                width: "100%",
                height: 180,
                borderRadius: 12,
              }}
            />
          ) : (
            <View
              style={{
                width: "100%",
                height: 180,
                borderRadius: 12,
                backgroundColor: "#2a2a2a",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedText style={{ color: "#888" }}>
                Sem imagem selecionada
              </ThemedText>
            </View>
          )}
        </View>

        {/* NOME */}
        <View>
          <ThemedText style={{ color: "gray" }}>Nome</ThemedText>
          <ThemedText style={{ fontWeight: "bold", fontSize: 16 }}>
            {name}
          </ThemedText>
        </View>

        {/* TELEFONE */}
        <View>
          <ThemedText style={{ color: "gray" }}>Telefone</ThemedText>
          <ThemedText>{phone}</ThemedText>
        </View>

        {/* ENDEREÇO */}
        <View>
          <ThemedText style={{ color: "gray" }}>Endereço</ThemedText>
          <ThemedText>
            {address?.street}, {address?.number}
          </ThemedText>
          <ThemedText>
            {address?.city} - {address?.state}
          </ThemedText>
          <ThemedText>CEP: {address?.zipCode}</ThemedText>
        </View>

        {/* HORÁRIOS */}
        <View>
          <ThemedText style={{ color: "gray" }}>
            Horário de funcionamento
          </ThemedText>

          {openingHours?.map((item, index) => (
            <View
              key={item.dayOfWeek}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ThemedText>{Days[index]}</ThemedText>
              <ThemedText>
                {item.open} - {item.close}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* REDES SOCIAIS */}
        {socialMedia?.length! > 0 && (
          <View>
            <ThemedText style={{ color: "gray" }}>Redes sociais</ThemedText>

            {socialMedia!.map((item, index) => (
              <ThemedText key={index}>
                {item.name}: {item.url}
              </ThemedText>
            ))}
          </View>
        )}
      </View>

      {/* BOTÃO */}
      <Pressable
        disabled={isPending}
        onPress={handleSubmit}
        style={({ pressed }) => [
          {
            backgroundColor: "hsl(210 100% 55%)",
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <ThemedText style={{ fontWeight: "bold" }}>
          {loading
            ? "Salvando..."
            : isEdit
              ? "Atualizar Barbearia"
              : "Criar Barbearia"}
        </ThemedText>
      </Pressable>
    </ScrollView>
  );
}
