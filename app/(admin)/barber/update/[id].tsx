import CreateBarberForm from "@/app/screens/admin/formBarber/CreateBarberForm";
import { useLocalSearchParams } from "expo-router";

export default function UpdateBarberScreen() {
  const { id, barberId } = useLocalSearchParams<{
    id: string;
    barberId?: string;
  }>();
  return <CreateBarberForm barbershopId={id} barberId={barberId} />;
}
