import { getCurrentUser } from '@/apiCallFns/User';
import { useQuery } from '@tanstack/react-query';

const useCurrentUser = () => {
  const { data, error, isLoading } = useQuery(['currentUser'], {
    queryFn: getCurrentUser
  });
  return { data: data?.data, error, isLoading };
};

export default useCurrentUser;
