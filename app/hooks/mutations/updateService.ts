import { updateService } from "@/app/services/admin/updateService";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["servicesByBarber"],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
