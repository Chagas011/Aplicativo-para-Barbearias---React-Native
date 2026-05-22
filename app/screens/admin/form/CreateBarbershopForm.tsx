import { ThemedText } from "@/components/themed-text";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetBarbershopById } from "@/app/hooks/queries/useGetBarbershopById";
import LoadingPulse from "@/components/loading";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateBarbershopFormData, createBarbershopSchema } from "./schema";
import { StepProvider, useStep } from "./StepContext";
import { StepAddress } from "./steps/StepAddress";
import { StepBasic } from "./steps/StepBasic";
import { StepConfirm } from "./steps/StepCofirm";
import { StepOpeningHours } from "./steps/StepOpeningHours";
import { StepSocialMedia } from "./steps/StepSocialMedia";

interface IFormContentProps {
  isEdit: boolean;
  barbershopId?: string;
}

function FormContent({ isEdit, barbershopId }: IFormContentProps) {
  const { step, nextStep, prevStep } = useStep();
  const methods = useFormContext<CreateBarbershopFormData>();

  async function handleNext() {
    let fields: any = [];

    if (step === 1) fields = ["name", "phone", "file"];
    if (step === 2)
      fields = [
        "address.street",
        "address.number",
        "address.city",
        "address.state",
        "address.zipCode",
      ];
    if (step === 3) fields = ["openingHours"];
    if (step === 4) fields = ["socialMedia"];
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
          {isEdit ? "Atualizar Barbearia" : "Cadastro da Barbearia"}
        </ThemedText>
      </View>
      <View style={{ height: 4, backgroundColor: "#333" }}>
        <View
          style={{
            width: `${(step / 5) * 100}%`,
            height: 4,
            borderRadius: 8,
            backgroundColor: "#00d5ff",
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        {step === 1 && <StepBasic />}
        {step === 2 && <StepAddress />}
        {step === 3 && <StepOpeningHours />}
        {step === 4 && <StepSocialMedia />}
        {step === 5 && (
          <StepConfirm isEdit={isEdit} barbershopId={barbershopId} />
        )}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {step > 1 && (
          <Pressable onPress={prevStep}>
            <ThemedText>Voltar</ThemedText>
          </Pressable>
        )}

        {step < 5 && (
          <Pressable onPress={handleNext}>
            <ThemedText>Próximo</ThemedText>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

interface ICreateBarbershopProps {
  barbershopId?: string;
}
export default function CreateBarbershopForm({
  barbershopId,
}: ICreateBarbershopProps) {
  const isEdit = !!barbershopId;
  const { data: barbershop, isLoading } = useGetBarbershopById(
    barbershopId ?? "",
  );

  const form = useForm<CreateBarbershopFormData>({
    resolver: zodResolver(createBarbershopSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      address: {
        street: "",
        number: "",
        city: "",
        state: "",
        zipCode: "",
      },
      openingHours: [
        { dayOfWeek: 1, open: "", close: "" },
        { dayOfWeek: 2, open: "", close: "" },
        { dayOfWeek: 3, open: "", close: "" },
        { dayOfWeek: 4, open: "", close: "" },
        { dayOfWeek: 5, open: "", close: "" },
        { dayOfWeek: 6, open: "", close: "" },
      ],
      socialMedia: [{ name: "", url: "" }],
      file: undefined,
    },
  });

  useEffect(() => {
    if (barbershop?.barbershop) {
      const data = barbershop.barbershop;

      form.reset({
        name: data.name,
        phone: data.phone,
        address: {
          street: data.address.street,
          number: data.address.number,
          city: data.address.city,
          state: data.address.state,
          zipCode: data.address.zipCode,
        },
        openingHours: data.openingHours,
        socialMedia: data.socialMedia ?? [],
        file: undefined,
      });
    }
  }, [barbershop, form]);

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
        <FormContent isEdit={isEdit} barbershopId={barbershopId} />
      </FormProvider>
    </StepProvider>
  );
}
