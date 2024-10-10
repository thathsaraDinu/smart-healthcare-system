import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { userLoginValidation } from '@/validations/user-validation';
import InputField from '@/components/form-field';
import { userLogin } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth-store';
import { getProfileData } from '@/api/user.api';

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const profile = useAuthStore((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userLoginValidation),
    reValidateMode: 'onBlur',
  });

  const userData = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
    enabled: false,
  });

  const loginUser = useMutation({
    mutationFn: userLogin,
    onSuccess: async (data) => {
      login(data.accessToken);
      toast.success('Logged in successfully');

      // Fetch profile data after successful login
      try {
        // Enable the query and refetch
        userData
          .refetch()
          .then((result) => {
            profile(result.data);
          })
          .catch((error) => {
            // Handle errors from refetch
            toast.error('Failed to fetch profile data');
            console.error(
              'Error fetching profile data:',
              error,
            );
          });
      } catch (error) {
        toast.error('Failed to fetch profile data');
        console.error(
          'Error fetching profile data:',
          error,
        );
      }
    },
    onError: (error) => {
      console.error('Error logging in:', error);
      if (error.response.status === 401) {
        toast.error('Invalid credentials');
      }

      if (error.response?.status !== 401) {
        toast.error('Something went wrong');
      }
    },
  });

  const onSubmit = (data) => {
    loginUser.mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md mx-4 my-16 h-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your username and password to log in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4 py-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              errors={errors}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
            />
          </CardContent>
          <CardFooter className="p-4">
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
