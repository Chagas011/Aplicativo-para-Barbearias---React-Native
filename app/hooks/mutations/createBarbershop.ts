import { createBarbershop } from "@/app/services/admin/createBarbershop";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBarbershop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBarbershop,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["barbershopAdmin"],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
