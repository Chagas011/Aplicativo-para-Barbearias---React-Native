import ServiceScreen from "@/app/screens/admin/services/ServiceScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function ListServicesScreen() {
  const { id } = useLocalSearchParams();
  return <ServiceScreen barberId={id as string} />;
}
