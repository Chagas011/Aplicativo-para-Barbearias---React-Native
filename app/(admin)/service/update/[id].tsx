import { CreateServiceForm } from "@/app/screens/admin/formService/CreateServiceForm";
import { useLocalSearchParams } from "expo-router";

export default function UpdateServiceScreen() {
  const { id, serviceId } = useLocalSearchParams<{
    id: string;
    serviceId: string;
  }>();
  return <CreateServiceForm barberId={id as string} serviceId={serviceId} />;
}
