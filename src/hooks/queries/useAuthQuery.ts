import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../../api/authApi";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getAuthUser,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
};
