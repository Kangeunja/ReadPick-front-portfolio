import { useSearchParams } from 'react-router-dom';

export const useBookSearchParams = () => {
  const [searchParams] = useSearchParams();
  const bsIdx = Number(searchParams.get('bsIdx')) || null;
  const bssIdx = Number(searchParams.get('bssIdx')) || null;

  const option = searchParams.get('option') || '';
  const keyword = searchParams.get('keyword') || '';

  return { bsIdx, bssIdx, option, keyword };
};
