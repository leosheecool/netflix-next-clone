import { getCurrentUser } from '@/apiCallFns/User';
import { useQuery } from '@tanstack/react-query';

const useCurrentUser = () => {
  const { data, error, isLoading } = useQuery(['/current'], {
    queryFn: getCurrentUser
  });
  return { data, error, isLoading };
};

export default useCurrentUser;
