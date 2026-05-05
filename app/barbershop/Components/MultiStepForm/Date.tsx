import { ThemedText } from "@/components/themed-text";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { Calendar } from "react-native-calendars";

import { useListAvailableTimes } from "@/app/hooks/queries/useListAvailableTimes";
import CardTime from "../CardTime";
import { ScheduleFormData } from "./schema";

interface IDateProps {
  barbershopId: string;
}

export default function Date({ barbershopId }: IDateProps) {
  const { control, setValue } = useFormContext<ScheduleFormData>();

  const formData = useWatch({
    control,
  });

  const { barber, service } = formData;

  const selectedDate = useWatch({
    control,
    name: "date",
  });

  const { data, isLoading } = useListAvailableTimes(
    barbershopId,
    barber?.id!,
    service?.id!,
    selectedDate,
  );

  function handleSelectDate(day: any) {
    setValue("date", day.dateString, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  const selectedTime = useWatch({
    control,
    name: "time",
  });

  function handleSelectedTime(time: string) {
    setValue("time", time, {
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
      <ThemedText type="subtitle">Selecione a data e horario</ThemedText>
      <View style={{ marginTop: 10 }}>
        <Calendar
          onDayPress={handleSelectDate}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "#00d5ff",
            },
          }}
          theme={{
            backgroundColor: "#121212",
            calendarBackground: "#121212",

            dayTextColor: "white",
            monthTextColor: "white",

            arrowColor: "#00d5ff",

            todayTextColor: "#00d5ff",

            textDayFontWeight: "500",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "600",
          }}
        />
      </View>

      <View style={{ marginTop: 15 }}>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 10,
          }}
        >
          {data.availableTimes.map((hora) => {
            const selected = selectedTime === hora;

            return (
              <Pressable key={hora} onPress={() => handleSelectedTime(hora)}>
                <CardTime time={hora} selected={selected} />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}
