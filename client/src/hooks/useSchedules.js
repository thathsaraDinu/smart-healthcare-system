import { useEffect, useState } from 'react';
import { instance } from '@/hooks/use-axios';

const useSchedules = (doctorId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get(
        `/api/doctor/schedules/${doctorId}`,
      );

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, error, refetch };
};

export default useSchedules;
