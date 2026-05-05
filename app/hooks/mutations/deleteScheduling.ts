import { deleteScheduling } from "@/app/services/client/deleteScheduling";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteScheduling = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteScheduling,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["scheduling"],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
