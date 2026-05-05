import CreateBarberForm from "@/app/screens/admin/formBarber/CreateBarberForm";
import { useLocalSearchParams } from "expo-router";

export default function CreateBarberScreen() {
  const { id } = useLocalSearchParams();
  return <CreateBarberForm barbershopId={id as string} />;
}
