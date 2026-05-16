import { useMutation } from "@tanstack/react-query";
import { submitUserPicks } from "../../api/userPickApi";

export const useUserPickMutation = () => {
  return useMutation({
    mutationFn: submitUserPicks,
  });
};
