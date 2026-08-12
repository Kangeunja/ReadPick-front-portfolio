import { useMutation } from '@tanstack/react-query';
import { getBookBuddyReply } from 'api/reviewApi';

export const useBookBuddyMutation = () => {
  return useMutation({
    mutationFn: getBookBuddyReply,
  });
};
