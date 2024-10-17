import { useQuery } from '@tanstack/react-query';
import { getProfileData } from '@/api/user.api';

// Get profile data
export const useProfile = (enabled) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
    enabled: !!enabled,
  });
};
