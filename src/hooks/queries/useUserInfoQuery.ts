import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../api/mypageApi";

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
  });
};
