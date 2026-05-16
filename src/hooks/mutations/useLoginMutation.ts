import { useMutation } from "@tanstack/react-query";

import useAuthStore from "../../store/authStore";
import { login } from "../../api/authApi";

export const useLoginMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (loginData: { id: string; pw: string }) => login(loginData),

    onSuccess: (res) => {
      if (res !== "fail") {
        setUser(res);
      }
    },
  });
};
