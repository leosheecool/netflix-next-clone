import { useQuery } from '@tanstack/react-query';
import { Movie } from '@prisma/client';
import { getMovies } from '@/apiCallFns/Movie';

const useMovies = () => {
  const { data, isLoading, error } = useQuery<{ data: Movie[] }>(['movies'], {
    queryFn: getMovies,
    refetchOnWindowFocus: false
  });

  return { data: data?.data, isLoading, error };
};

export default useMovies;
