import ServiceScreen from "@/app/screens/admin/services/ServiceScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function ListServicesScreen() {
  const { id, barbershopId } = useLocalSearchParams<{
    id: string;
    barbershopId: string;
  }>();
  return <ServiceScreen barberId={id} barbershopId={barbershopId} />;
}
