import { getRandomMovie } from '@/apiCallFns/Movie';
import { useQuery } from '@tanstack/react-query';
import { Movie } from '@prisma/client';

const useBillBoard = () => {
  const { data, isLoading, error } = useQuery<{ data: Movie }>(['billboard'], {
    queryFn: getRandomMovie,
    refetchOnWindowFocus: false
  });

  return { data: data?.data, isLoading, error };
};

export default useBillBoard;
