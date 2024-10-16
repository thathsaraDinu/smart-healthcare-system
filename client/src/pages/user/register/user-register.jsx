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
import { USER_ROLES } from '@/constants';
import { userRegisterSchema } from '@/validations/user-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const UserRegisterForm = () => {
  const userForm = useForm({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      fullName: '',
      dob: '',
      maritalStatus: '',
      gender: '',
      mobile: '',
      email: '',
      physicianName: '',
      physicianMobile: '',
      emergencyContact: '',
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
    data.role = USER_ROLES.USER;
    addUser.mutate(data);
  };

  return (
    <Form {...userForm}>
      <form onSubmit={userForm.handleSubmit(onSubmit)}>
        <CardHeader className="p-2">
          <CardDescription className="text-center">
            Enter your details to register.
          </CardDescription>
        </CardHeader>
        <div className="border-t border-gray-300" />
        <CardContent className="space-y-4 px-4 py-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-4">
            {/* Full Name */}
            <InputField
              control={userForm.control}
              name="fullName"
              label="Full Name"
              type="text"
            />
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date of Birth */}
            <InputField
              control={userForm.control}
              name="dob"
              label="Date of Birth"
              type="date"
            />
            {/* Marital Status */}
            <InputField
              control={userForm.control}
              name="maritalStatus"
              label="Marital Status"
              placeholder="Select Marital Status"
              type="select"
              values={[
                {
                  id: 'single',
                  label: 'Single',
                  value: 'single',
                },
                {
                  id: 'married',
                  label: 'Married',
                  value: 'married',
                },
                {
                  id: 'divorced',
                  label: 'Divorced',
                  value: 'divorced',
                },
                {
                  id: 'widowed',
                  label: 'Widowed',
                  value: 'widowed',
                },
              ]}
            />
          </div>
          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Gender */}
            <InputField
              control={userForm.control}
              name="gender"
              label="Gender"
              type="radio"
              values={[
                {
                  id: 'male',
                  label: 'Male',
                  value: 'male',
                },
                {
                  id: 'female',
                  label: 'Female',
                  value: 'female',
                },
              ]}
              formStyle="flex items-center space-x-3 space-y-0"
            />
          </div>
          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Mobile Number */}
            <InputField
              control={userForm.control}
              name="mobile"
              label="Mobile"
              placeholder="0771234567"
              type="text"
            />
            {/* Email */}
            <InputField
              control={userForm.control}
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
            />
          </div>
          {/* Row 5 */}
          <div className="grid grid-cols-1 gap-4">
            {/* Primary Care Physician */}
            <InputField
              control={userForm.control}
              name="physicianName"
              label="Primary Care Physician"
              type="text"
            />
          </div>
          {/* Row 6 */}
          <div className="grid grid-cols-2 gap-4">
            {/* Primary Care Physician Mobile */}
            <InputField
              control={userForm.control}
              name="physicianMobile"
              label="Physician Mobile"
              placeholder="0771234567"
              type="text"
            />
            {/* Emergancy Contact Number */}
            <InputField
              control={userForm.control}
              name="emergencyContact"
              label="Emergency Contact"
              placeholder="0771234567"
              type="text"
            />
          </div>
          {/* Row 6 - Password Section */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              control={userForm.control}
              name="password"
              label="Password"
              type="password"
            />
            <InputField
              control={userForm.control}
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

export default UserRegisterForm;
