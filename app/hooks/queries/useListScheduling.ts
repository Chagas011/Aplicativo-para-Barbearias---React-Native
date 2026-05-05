import { listScheduling } from "@/app/services/client/listScheduling";
import { useQuery } from "@tanstack/react-query";

export function useListScheduling() {
  const { data, isLoading } = useQuery({
    queryKey: ["scheduling"],
    queryFn: () => listScheduling(),
  });

  return {
    data,
    isLoading,
  };
}
