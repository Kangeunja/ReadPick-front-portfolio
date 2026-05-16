import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/authApi";
import useAuthStore from "../../store/authStore";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser();

      queryClient.clear(); // React Query가 메모리에 들고 있는 다른 api 데이터가 남아있는 잔상을 다 없애려면 사용.
    },
  });
};
