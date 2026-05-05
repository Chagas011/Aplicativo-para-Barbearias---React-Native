import { login } from "@/app/services/loginAuth";
import { useAuthStore } from "@/app/store/auth";

import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      if (data) {
        setAuth(data.accessToken);
      }
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
