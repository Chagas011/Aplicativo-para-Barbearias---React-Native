import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";

import { ScheduleFormData, scheduleSchema } from "./schema";

import { ThemedText } from "@/components/themed-text";
import { zodResolver } from "@hookform/resolvers/zod";
import Barber from "./Barber";
import Confirm from "./Confirm";
import Date from "./Date";
import Service from "./Service";

interface IMultiStepFormProps {
  barbershopId: string;
}

export default function MultiStepForm({ barbershopId }: IMultiStepFormProps) {
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      barber: undefined,
      service: undefined,
      date: "",
      time: "",
    },
  });

  const [step, setStep] = useState(1);

  async function nextStep() {
    let fields: any = [];

    if (step === 1) fields = ["barber"];
    if (step === 2) fields = ["service"];
    if (step === 3) fields = ["date", "time"];

    const valid = await form.trigger(fields);

    if (!valid) return;

    setStep((prev) => prev + 1);
  }

  function prevStep() {
    setStep((prev) => prev - 1);
  }

  return (
    <FormProvider {...form}>
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ flex: 1 }}>
          {step === 1 && <Barber barbershopId={barbershopId} />}
          {step === 2 && <Service />}
          {step === 3 && <Date barbershopId={barbershopId} />}
          {step === 4 && <Confirm barbershopId={barbershopId} />}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          {step > 1 && (
            <Pressable onPress={prevStep}>
              <ThemedText>Voltar</ThemedText>
            </Pressable>
          )}

          {step < 4 && (
            <Pressable onPress={nextStep}>
              <ThemedText>Próximo</ThemedText>
            </Pressable>
          )}
        </View>
      </View>
    </FormProvider>
  );
}
