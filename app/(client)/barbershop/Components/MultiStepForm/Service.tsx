import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";

import { useListServicesByBarber } from "@/app/hooks/queries/useListServicesByBarber";
import LoadingPulse from "@/components/loading";
import { ThemedText } from "@/components/themed-text";
import CardService from "../CardService";
import { ScheduleFormData } from "./schema";

export default function Service() {
  const { setValue, control } = useFormContext<ScheduleFormData>();

  const selectedService = useWatch({
    control,
    name: "service",
  });

  const barber = useWatch({
    control,
    name: "barber",
  });

  const { data, isLoading } = useListServicesByBarber(barber.id);

  function handleSelectService(service: ScheduleFormData["service"]) {
    setValue("service", service, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  if (isLoading || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingPulse />
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 20,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <View
        style={{
          marginTop: 10,
          padding: 20,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <ThemedText type="subtitle">Escolha o serviço</ThemedText>
      </View>

      {data.service.map((servico) => {
        const selected = selectedService?.id === servico.id;

        return (
          <Pressable
            key={servico.id}
            onPress={() => handleSelectService({ id: servico.id })}
          >
            <CardService service={servico} selected={selected} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
