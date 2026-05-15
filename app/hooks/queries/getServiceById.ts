import { getServiceById } from "@/app/services/client/getServiceById";
import { useQuery } from "@tanstack/react-query";

export function useGetServiceById(serviceId: string, barberId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["barber", serviceId, barberId],
    queryFn: () => getServiceById({ barberId, serviceId }),
  });

  return {
    data,
    isLoading,
  };
}
