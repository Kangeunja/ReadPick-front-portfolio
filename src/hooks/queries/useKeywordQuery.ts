import { useQuery } from "@tanstack/react-query";
import { getKeywordList } from "../../api/keywordApi";

export const useKeywordQuery = () => {
  return useQuery({
    queryKey: ["keyword"],
    queryFn: getKeywordList,
  });
};
