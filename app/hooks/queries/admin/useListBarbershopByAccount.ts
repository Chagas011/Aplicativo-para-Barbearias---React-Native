import { listBarbershopByAccount } from "@/app/services/admin/listBarbershopByAccount";
import { useQuery } from "@tanstack/react-query";

export function useListBarbershopByAccount() {
  const { data, isLoading } = useQuery({
    queryKey: ["barbershopAdmin"],
    queryFn: listBarbershopByAccount,
  });

  return {
    data,
    isLoading,
  };
}
