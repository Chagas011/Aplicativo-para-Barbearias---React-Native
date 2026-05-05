import { getBarberById } from "@/app/services/client/getBarberById";
import { useQuery } from "@tanstack/react-query";

export function useGetBarberById(barbershopId: string, barberId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["barber", barbershopId, barberId],
    queryFn: () => getBarberById({ barbershopId, barberId }),
  });

  return {
    data,
    isLoading,
  };
}
