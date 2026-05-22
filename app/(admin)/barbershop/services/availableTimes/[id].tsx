import AvailableTimesScreen from "@/app/screens/admin/services/AvailableTimesScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function ListAvailableTimesScreen() {
  const { id, barberId, barbershopId } = useLocalSearchParams<{
    id: string;
    barberId: string;
    barbershopId: string;
  }>();
  return (
    <AvailableTimesScreen
      id={id}
      barberId={barberId}
      barbershopId={barbershopId}
    />
  );
}
