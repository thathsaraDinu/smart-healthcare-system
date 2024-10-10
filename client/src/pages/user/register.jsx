import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import InputField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { createUserValidation } from '@/validations/user-validation';
import { UserRegister } from '@/api/user.api';

export default function Register() {
  const [form, setForm] = useState('user');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createUserValidation),
    reValidateMode: 'onBlur',
    defaultValues: {
      gender: 'male',
    },
  });

  const addUser = useMutation({
    mutationFn: UserRegister,
    onSuccess: () => {
      toast.success('Registered successfully');
      reset();
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    },
    onError: (error) => {
      if (error.response.status === 500) {
        toast.error('User already exists');
      }

      if (error.response?.status === 400) {
        toast.error('Something went wrong');
      }
    },
  });

  const onSubmit = (data) => {
    addUser.mutate(data);
  };

  // User registration form
  const UserRegisterForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader className="p-2">
        <CardTitle className="text-2xl text-center">
          User Registration
        </CardTitle>
        <CardDescription className="text-center">
          Enter your details to register.
        </CardDescription>
      </CardHeader>
      <div className="border-t border-gray-300" />
      <CardContent className="space-y-4 px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            register={register}
            errors={errors}
          />
          <InputField
            label="Last Name"
            name="lastName"
            register={register}
            errors={errors}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            register={register}
            errors={errors}
          />
          <InputField
            label="Mobile"
            name="mobile"
            register={register}
            errors={errors}
          />
        </div>
        <InputField
          type="radio"
          label="Gender"
          name="gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          register={register}
          errors={errors}
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
          />
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            errors={errors}
          />
        </div>
        <div className="hidden">
          <InputField
            label="Role"
            name="role"
            defaultValue="user"
            register={register}
            errors={errors}
          />
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button type="submit" className="w-full">
          Register
        </Button>
      </CardFooter>
    </form>
  );

  // Shop registration form
  const ShopRegisterForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}></form>
  );

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-2xl mx-4 my-16 h-full">
        <div className="flex h-12">
          <Button
            className="w-full rounded-none rounded-tl-xl rounded-tr-xl h-full text-lg"
            onClick={() => setForm('user')}
          >
            User Register
          </Button>
          <div className="w-px bg-gray-300 hidden" />
          <Button
            className="w-1/2 rounded-none rounded-tr-xl h-full text-lg hidden"
            onClick={() => setForm('shop')}
          >
            Shop Register
          </Button>
        </div>
        {form === 'user' && <UserRegisterForm />}
        {form === 'shop' && <ShopRegisterForm />}
      </Card>
    </div>
  );
}
