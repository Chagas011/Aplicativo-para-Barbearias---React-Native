import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MultiStepForm from "./Components/MultiStepForm";

export default function BarberShopSchedule() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Agendamento",
          headerBackTitle: "Voltar",
        }}
      />

      <MultiStepForm barbershopId={id as string} />
    </SafeAreaView>
  );
}
