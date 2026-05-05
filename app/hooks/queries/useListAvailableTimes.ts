import { listAvailableTimes } from "@/app/services/client/listAvailableTimes";
import { useQuery } from "@tanstack/react-query";

export function useListAvailableTimes(
  barbershopId: string,
  barberId: string,
  serviceId: string,
  date: string,
) {
  const { data, isLoading } = useQuery({
    queryKey: ["available-times", barbershopId, barberId, serviceId, date],
    queryFn: () =>
      listAvailableTimes({ barbershopId, barberId, date, serviceId }),
  });

  return {
    data,
    isLoading,
  };
}
