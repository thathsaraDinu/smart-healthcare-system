import { useQuery } from '@tanstack/react-query';
import { getProfileData } from '@/api/user.api';
import { LoadingSpinner } from '@/components/ui/spinner';

const Profile = () => {
  // Get the user's profile data
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError: isProfileError,
    error: profileError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  return (
    <div>
      {isLoadingProfile && (
        <div className="flex items-center justify-center">
          <LoadingSpinner className="w-36 h-36 my-10" />
        </div>
      )}
      {isProfileError && (
        <div className="text-red-500">
          <p>Error: {profileError.message}</p>
        </div>
      )}
      {profile && (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
        </div>
      )}
    </div>
  );
};
export default Profile;
