import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { loginSchema } from '@/validations/user-validation';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/input';
import { Form } from '@/components/ui/form';
import { useAuthStore } from '@/store/auth-store';
import { useProfile } from '@/hooks/use-users';
import { userLogin } from '@/api/auth.api';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const profile = useAuthStore((state) => state.profile);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const userData = useProfile(false);
  const navigate = useNavigate();

  const loginUser = useMutation({
    mutationFn: userLogin,
    onSuccess: async (data) => {
      login(data.accessToken);
      toast.success('Logged in successfully');
      navigate('/');

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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Login
              </CardTitle>
              <CardDescription className="text-center">
                Enter your username and password to log in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-4 py-6">
              {/* Email */}
              <InputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
              />

              {/* Password */}
              <InputField
                control={form.control}
                name="password"
                label="Password"
                type="password"
              />
            </CardContent>
            <CardFooter className="flex p-4 justify-center">
              <Button
                type="submit"
                className="w-48 bg-blue-500 text-white hover:bg-blue-600"
              >
                Login
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
