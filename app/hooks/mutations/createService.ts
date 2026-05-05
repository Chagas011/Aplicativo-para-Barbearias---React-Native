import { createService } from "@/app/services/admin/createService";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createService,
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
