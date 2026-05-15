import { CreateServiceForm } from "@/app/screens/admin/formService/CreateServiceForm";
import { useLocalSearchParams } from "expo-router";

export default function CreateServiceScreen() {
  const { id } = useLocalSearchParams();
  return <CreateServiceForm barberId={id as string} />;
}
