import { createScheduling } from "@/app/services/client/createScheduling";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateScheduling = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createScheduling,
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
