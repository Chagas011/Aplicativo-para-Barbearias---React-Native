import { updateBarbershop } from "@/app/services/admin/updateBarbershop";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateBarbershop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBarbershop,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["barbershop"],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
