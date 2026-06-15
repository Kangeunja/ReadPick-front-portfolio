import { useQuery } from "@tanstack/react-query";
import { getTodayBook } from "../../api/bookApi";

export const useTodayBookQuery = () => {
  return useQuery({
    queryKey: ["todayBook"],
    queryFn: getTodayBook,
  });
}