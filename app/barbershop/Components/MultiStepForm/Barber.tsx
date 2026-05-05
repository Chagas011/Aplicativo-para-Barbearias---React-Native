import { ThemedText } from "@/components/themed-text";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, View } from "react-native";

import { useListBarberByBarbershop } from "@/app/hooks/queries/useListBarberByBarbershop";
import CardBarber from "../CardBarber";
import { ScheduleFormData } from "./schema";
interface IBarberProps {
  barbershopId: string;
}

export default function Barber({ barbershopId }: IBarberProps) {
  const { data, isLoading } = useListBarberByBarbershop(barbershopId);

  const { setValue, control } = useFormContext<ScheduleFormData>();
  const selectedBarber = useWatch({
    control,
    name: "barber",
  });

  function handleSelectBarber(barbeiro: ScheduleFormData["barber"]) {
    setValue("barber", barbeiro, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }
  if (isLoading || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Carregando...</ThemedText>
      </View>
    );
  }
  return (
    <>
      <View style={{ marginTop: 10, padding: 20 }}>
        <ThemedText type="subtitle">Escolha o barbeiro</ThemedText>
        <ThemedText style={{ color: "gray" }}>
          Selecione o profissional de sua preferencia
        </ThemedText>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {data.barber.map((barber) => {
          const selected = selectedBarber?.id === barber.id;

          return (
            <Pressable
              key={barber.id}
              onPress={() => handleSelectBarber(barber)}
            >
              <CardBarber barbeiro={barber} selected={selected} />
            </Pressable>
          );
        })}
      </View>
    </>
  );
}
