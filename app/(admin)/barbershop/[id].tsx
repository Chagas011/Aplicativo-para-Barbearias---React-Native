import CreateBarbershopForm from "@/app/screens/admin/form/CreateBarbershopForm";
import { useLocalSearchParams } from "expo-router";

export default function UpdateBarbershopScreen() {
  const { id } = useLocalSearchParams();
  return <CreateBarbershopForm barbershopId={id as string} />;
}
