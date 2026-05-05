import { useCreateBarber } from "@/app/hooks/mutations/createBarber";
import { useUpdateBarber } from "@/app/hooks/mutations/updateBarber";
import { uploadToS3 } from "@/app/lib/uploadToS3";
import { Days } from "@/app/types/Days";
import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";
import { useFormContext, useWatch } from "react-hook-form";
import { Image, Pressable, ScrollView, View } from "react-native";
import { CreateBarberFormData } from "../schema";
interface IStepConfirmProps {
  isEdit: boolean;
  barberId?: string;
}
export function StepConfirm({ isEdit, barberId }: IStepConfirmProps) {
  const { control } = useFormContext<CreateBarberFormData>();
  const { mutateAsync, isPending } = useCreateBarber();
  const { mutateAsync: updateBarber, isPending: isPendingUpdate } =
    useUpdateBarber();
  const data = useWatch({ control }) as CreateBarberFormData;

  const { name, workingHours, file, barbershopId } = data;
  const loading = isPending || isPendingUpdate;
  async function handleSubmit() {
    if (!name || !workingHours) {
      return;
    }
    try {
      if (isEdit && barberId) {
        const { uploadSignature } = await updateBarber({
          barberId,
          barbershopId,
          dataBarber: {
            barbershopId,
            file,
            name,
            workingHours,
          },
        });

        if (uploadSignature && file) {
          await uploadToS3(uploadSignature, file);
        }
        return router.push({
          pathname: "/(admin)/barbershop/barbers/[id]",
          params: { id: barbershopId },
        });
      }

      const { uploadSignature } = await mutateAsync({
        dataBarber: {
          barbershopId,
          name,
          workingHours,
          file,
        },
      });

      if (uploadSignature && file) {
        await uploadToS3(uploadSignature, file);
      }

      return router.push({
        pathname: "/(admin)/barbershop/barbers/[id]",
        params: { id: barbershopId },
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

        {/* ENDEREÇO */}

        {/* HORÁRIOS */}
        <View>
          <ThemedText style={{ color: "gray" }}>Horário de trabalho</ThemedText>

          {workingHours?.map((item, index) => (
            <View
              key={item.dayOfWeek}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ThemedText>{Days[index]}</ThemedText>
              <ThemedText>
                {item.start} - {item.end}
              </ThemedText>
            </View>
          ))}
        </View>
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
              ? "Atualizar Barbeiro"
              : "Cadastrar Barbeiro"}
        </ThemedText>
      </Pressable>
    </ScrollView>
  );
}
