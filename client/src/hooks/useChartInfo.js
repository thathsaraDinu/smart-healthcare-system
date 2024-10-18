import { useState, useEffect } from 'react';
import { getAppointmentStats } from '@/api/report.api';

const useChartInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Only run fetchData when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAppointmentStats();
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useChartInfo;
