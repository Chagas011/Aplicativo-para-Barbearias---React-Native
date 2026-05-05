import BarberScreen from "@/app/screens/admin/barbers/BarberScreen";
import { useLocalSearchParams } from "expo-router";

export default function ListBarbersScreen() {
  const { id } = useLocalSearchParams();
  return <BarberScreen barbershopId={id as string} />;
}
