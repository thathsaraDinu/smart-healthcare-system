import { UserRegister } from '@/api/user.api';
import { InputField } from '@/components/input';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { createUserValidation } from '@/validations/user-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const StaffRegisterForm = () => {
  const staffForm = useForm({
    resolver: zodResolver(createUserValidation),
    defaultValues: {
      fullName: '',
      email: '',
      dob: '',
      password: '',
      confirmPassword: '',
    },
  });

  const addUser = useMutation({
    mutationFn: UserRegister,
    onSuccess: () => {
      toast.success('Registered successfully');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    },
    onError: (error) => {
      if (error.response.status === 500) {
        toast.error('User already exists');
      } else if (error.response?.status === 400) {
        toast.error('Something went wrong');
      }
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    addUser.mutate(data);
  };

  return (
    <Form {...staffForm}>
      <form onSubmit={staffForm.handleSubmit(onSubmit)}>
        <CardHeader className="p-2">
          <CardDescription className="text-center">
            Enter your details to register.
          </CardDescription>
        </CardHeader>
        <div className="border-t border-gray-300" />
        <CardContent className="space-y-4 px-4 py-6">
          <InputField
            control={staffForm.control}
            name="fullName"
            label="Full Name"
            type="text"
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              control={staffForm.control}
              name="dob"
              label="Date of Birth"
              type="date"
            />
            <InputField
              control={staffForm.control}
              name="email"
              label="Email"
              type="email"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              control={staffForm.control}
              name="password"
              label="Password"
              type="password"
            />
            <InputField
              control={staffForm.control}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex p-4 justify-center">
          <Button
            type="submit"
            className="w-48 bg-blue-500 text-white hover:bg-blue-600"
          >
            Register
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default StaffRegisterForm;
