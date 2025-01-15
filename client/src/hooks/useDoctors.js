import { useQuery } from '@tanstack/react-query';
import { instance } from '@/hooks/use-axios';

const fetchDoctors = async () => {
  const response = await instance.get('/api/user/doctors');
  return response.data;
};

const useDoctors = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: 'doctors',
    queryFn: fetchDoctors,
  });

  return { data, isLoading, error, refetch };
};

export default useDoctors;
