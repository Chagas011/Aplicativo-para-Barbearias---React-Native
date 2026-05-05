import { updateBarber } from "@/app/services/admin/updateBarber";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateBarber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBarber,
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
