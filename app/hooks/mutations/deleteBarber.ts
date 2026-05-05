import { deleteBarber } from "@/app/services/admin/deleteBarber";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBarber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBarber,
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
