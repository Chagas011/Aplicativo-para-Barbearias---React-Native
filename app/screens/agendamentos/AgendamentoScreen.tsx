import { useListScheduling } from "@/app/hooks/queries/useListScheduling";
import LoadingPulse from "@/components/loading";
import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardAgendamento from "./CardAgendamento";

export default function AgendamentoScreen() {
  const { data, isLoading } = useListScheduling();
  const today = new Date();

  const upcomingScheduling = data?.scheduling.filter((scheduling) => {
    const schedulingDate = new Date(scheduling.date);

    return schedulingDate >= today;
  });

  if (isLoading || !upcomingScheduling) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingPulse />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
          marginTop: 20,
        }}
      >
        <Ionicons
          name="calendar-number-outline"
          size={24}
          color={"hsl(210 100% 55%)"}
        />
        <ThemedText type="subtitle">Meus Agendamentos</ThemedText>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 10,
          justifyContent: "center",
          marginTop: 80,
          paddingBottom: 50,
          gap: 15,
        }}
        showsVerticalScrollIndicator={false}
      >
        {upcomingScheduling.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ThemedText
              style={{
                color: "#9ca3af",
                textAlign: "center",
                fontSize: 15,
                lineHeight: 22,
              }}
            >
              Você ainda não possui agendamentos...
            </ThemedText>
          </View>
        )}

        {upcomingScheduling.map((item) => (
          <CardAgendamento scheduling={item} key={item.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
