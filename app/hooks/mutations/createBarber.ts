import { createBarber } from "@/app/services/admin/createBarber";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBarber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBarber,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["barberByBarbershop"],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
