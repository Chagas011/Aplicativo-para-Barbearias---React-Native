import { listBarberByBarbershop } from "@/app/services/client/listBarberByBarbershop";
import { useQuery } from "@tanstack/react-query";

export function useListBarberByBarbershop(barbershopId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["barberByBarbershop", barbershopId],
    queryFn: () => listBarberByBarbershop({ barbershopId }),
  });

  return {
    data,
    isLoading,
  };
}
