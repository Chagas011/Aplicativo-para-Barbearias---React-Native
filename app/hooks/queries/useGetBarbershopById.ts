import { getBarbershopById } from "@/app/services/admin/getBarbershopById";
import { useQuery } from "@tanstack/react-query";

export function useGetBarbershopById(barbershopId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["barbershopById", barbershopId],
    queryFn: () => getBarbershopById({ barbershopId }),
  });

  return {
    data,
    isLoading,
  };
}
