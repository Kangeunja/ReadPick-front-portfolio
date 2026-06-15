import { useQuery } from '@tanstack/react-query';
import { getFavoriteBooks, getFavoriteBooksImages } from '../../api/mypageApi';

export const useFavoritQuery = () => {
  return useQuery({
    queryKey: ['favorit'],
    queryFn: getFavoriteBooks,
  });
};

export const useFavoritImgQuery = () => {
  return useQuery({
    queryKey: ['favoritImg'],
    queryFn: getFavoriteBooksImages,
  });
};
