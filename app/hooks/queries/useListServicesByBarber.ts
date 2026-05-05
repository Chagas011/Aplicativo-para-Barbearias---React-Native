import { listServicesByBarber } from "@/app/services/client/listServicesByBarber";
import { useQuery } from "@tanstack/react-query";

export function useListServicesByBarber(barberId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["servicesByBarber", barberId],
    queryFn: () => listServicesByBarber({ barberId }),
  });

  return {
    data,
    isLoading,
  };
}
