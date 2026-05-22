import { ThemedText } from "@/components/themed-text";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetBarberById } from "@/app/hooks/queries/getBarberById";
import LoadingPulse from "@/components/loading";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StepProvider, useStep } from "./StepContext";
import { CreateBarberFormData, createBarberSchema } from "./schema";
import { StepBasic } from "./steps/StepBasic";
import { StepConfirm } from "./steps/StepConfirm";
import { StepWorkingHours } from "./steps/StepWorkingHours";

interface IFormContentProps {
  isEdit: boolean;
  barberId?: string;
}

function FormContent({ isEdit, barberId }: IFormContentProps) {
  const { step, nextStep, prevStep } = useStep();
  const methods = useFormContext<CreateBarberFormData>();

  async function handleNext() {
    let fields: any = [];

    if (step === 1) fields = ["name", "file"];
    if (step === 2) fields = ["workingHours"];
    const valid = await methods.trigger(fields);
    if (!valid) return;

    nextStep();
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
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
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText type="defaultSemiBold">
          {isEdit ? "Atualizar Barbeiro" : "Cadastro de Barbeiro"}
        </ThemedText>
      </View>
      <View style={{ height: 4, backgroundColor: "#333" }}>
        <View
          style={{
            width: `${(step / 3) * 100}%`,
            height: 4,
            borderRadius: 8,
            backgroundColor: "#00d5ff",
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        {step === 1 && <StepBasic />}
        {step === 2 && <StepWorkingHours />}
        {step === 3 && <StepConfirm isEdit={isEdit} barberId={barberId} />}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {step > 1 && (
          <Pressable onPress={prevStep}>
            <ThemedText>Voltar</ThemedText>
          </Pressable>
        )}

        {step < 3 && (
          <Pressable onPress={handleNext}>
            <ThemedText>Próximo</ThemedText>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

interface ICreateBarberFormProps {
  barbershopId: string;
  barberId?: string;
}
export default function CreateBarberForm({
  barbershopId,
  barberId,
}: ICreateBarberFormProps) {
  const isEdit = !!barberId;
  const { data: barber, isLoading } = useGetBarberById(
    barbershopId,
    barberId ?? "",
  );
  const form = useForm<CreateBarberFormData>({
    resolver: zodResolver(createBarberSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      workingHours: [
        { dayOfWeek: 1, start: "", end: "" },
        { dayOfWeek: 2, start: "", end: "" },
        { dayOfWeek: 3, start: "", end: "" },
        { dayOfWeek: 4, start: "", end: "" },
        { dayOfWeek: 5, start: "", end: "" },
        { dayOfWeek: 6, start: "", end: "" },
      ],
      barbershopId: barbershopId,
      file: undefined,
    },
  });

  useEffect(() => {
    if (barber?.barber) {
      const data = barber.barber;

      form.reset({
        barbershopId,
        name: data.name,
        workingHours: data.workingHours,
        file: undefined,
      });
    }
  }, [barber, barbershopId, form]);

  if (isEdit && isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingPulse />
      </View>
    );
  }
  return (
    <StepProvider>
      <FormProvider {...form}>
        <FormContent isEdit={isEdit} barberId={barberId} />
      </FormProvider>
    </StepProvider>
  );
}
