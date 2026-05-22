import { ThemedText } from "@/components/themed-text";

import { useFormContext, useWatch } from "react-hook-form";
import { Image, Pressable, View } from "react-native";

import { useCreateScheduling } from "@/app/hooks/mutations/createScheduling";
import { useGetBarberById } from "@/app/hooks/queries/getBarberById";
import { useGetServiceById } from "@/app/hooks/queries/getServiceById";
import LoadingPulse from "@/components/loading";
import { router } from "expo-router";
import { ScheduleFormData } from "./schema";
interface IConfirmProps {
  barbershopId: string;
}

export default function Confirm({ barbershopId }: IConfirmProps) {
  const { control } = useFormContext<ScheduleFormData>();

  const formData = useWatch({
    control,
  });
  const { barber, service, date, time } = formData;
  const { data: barberData, isLoading } = useGetBarberById(
    barbershopId,
    barber?.id!,
  );
  const { data: serviceData } = useGetServiceById(service?.id!, barber?.id!);
  const { mutate } = useCreateScheduling();

  function handleSubmit() {
    if (!barber || !service || !date || !time) {
      return;
    }
    mutate({
      barberId: barber.id!,
      barbershopId,
      dataScheduling: {
        serviceId: service.id!,
        startTime: time,
        date,
      },
    });

    return router.push({
      pathname: "/(client)/(tabs)/agendamentos",
    });
  }

  if (isLoading || !barberData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingPulse />
      </View>
    );
  }
  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ThemedText type="subtitle">Confirme seu agendamento</ThemedText>
      </View>

      <View
        style={{
          gap: 16,
          backgroundColor: "#423d3da2",
          borderRadius: 20,
          padding: 20,
          marginTop: 20,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            borderBottomWidth: 0.3,
            borderBottomColor: "white",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              borderRadius: 20,
              width: 60,
              height: 50,

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri:
                  barberData.barber.photoURL ??
                  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=250&fit=crop",
              }}
              style={{
                width: 60,
                height: 50,
                borderRadius: 30,
              }}
            />
          </View>
          <View>
            <ThemedText style={{ fontWeight: "700" }}>
              {barberData?.barber.name}
            </ThemedText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "space-between",
            borderBottomWidth: 0.3,
            borderBottomColor: "white",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <ThemedText>✂️</ThemedText>
              <ThemedText>{serviceData?.service.name}</ThemedText>
            </View>
            <View style={{ marginLeft: 30 }}>
              <ThemedText style={{ color: "gray" }}>
                {serviceData?.service.duration} Minutos
              </ThemedText>
            </View>
          </View>

          <View>
            <ThemedText>R$ {serviceData?.service.price},00</ThemedText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <ThemedText style={{ color: "gray" }}>Data</ThemedText>
            <ThemedText>{date}</ThemedText>
          </View>

          <View>
            <ThemedText style={{ color: "gray" }}>Horário</ThemedText>
            <ThemedText style={{ marginLeft: 5 }}>{time}</ThemedText>
          </View>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            {
              backgroundColor: "hsl(210 100% 15%)",
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              width: 350,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <ThemedText>Confirmar Agendamento</ThemedText>
        </Pressable>
      </View>
    </>
  );
}
