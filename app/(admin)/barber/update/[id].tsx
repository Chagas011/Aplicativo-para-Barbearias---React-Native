import CreateBarberForm from "@/app/screens/admin/formBarber/CreateBarberForm";
import { useLocalSearchParams } from "expo-router";

export default function UpdateBarberScreen() {
  const { barbershopId, barberId } = useLocalSearchParams<{
    barbershopId: string;
    barberId?: string;
  }>();
  return <CreateBarberForm barbershopId={barbershopId} barberId={barberId} />;
}
