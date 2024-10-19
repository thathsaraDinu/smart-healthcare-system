import { useQuery } from '@tanstack/react-query';
import { getAllAppointments } from '@/api/report.api';

const useAppointmentsAll = () => {
  const {
    data: queryData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['appointments'],
    queryFn: getAllAppointments,
  });

  return { queryData, isLoading, isError };
};

export default useAppointmentsAll;
