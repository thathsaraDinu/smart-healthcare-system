import { useQuery } from '@tanstack/react-query';
import { getProfileData } from '@/api/user.api';

const Profile = () => {
  // Get the user's profile data
  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  if (profile.isLoading) {
    return <div>Loading...</div>;
  }

  if (profile.isError) {
    return <div>Error: {profile.error.message}</div>;
  }

  return (  
    <div>
      <h1>Profile</h1>
    </div>
  );
};
export default Profile;
