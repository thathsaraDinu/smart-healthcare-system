import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  getProfileData,
  updateUserProfile,
  getProfileDataById,
} from '@/api/user.api';
import toast from 'react-hot-toast';

// Get profile data
export const useProfile = (enabled) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
    enabled: !!enabled,
  });
};

// Get profile data
export const GetProfileDataId = (enabled, userId) => {
  return useQuery({
    queryKey: ['profileData', userId],
    queryFn: () => getProfileDataById(userId),
    enabled: !!enabled,
  });
};

// Update profile data
export const useUpdateProfile = (refetch) => {
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      refetch();
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    },
  });
};
