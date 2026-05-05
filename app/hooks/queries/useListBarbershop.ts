import { listBarbershop } from "@/app/services/client/listBarbershop";
import { useQuery } from "@tanstack/react-query";

export function useListBarbershop() {
  const { data, isLoading } = useQuery({
    queryKey: ["barbershop"],
    queryFn: listBarbershop,
  });

  return {
    data,
    isLoading,
  };
}
