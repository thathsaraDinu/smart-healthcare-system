import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserRegisterForm from './user-register';
import StaffRegisterForm from './staff-register';

export default function Register() {
  const [formType, setFormType] = useState('user');

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-2xl mx-4 my-16 h-full">
        <div className="flex h-12">
          <Button
            className={`w-full rounded-none rounded-tl-xl h-full text-lg ${formType === 'user' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-gray-600'} hover:bg-blue-500 hover:text-white`}
            variant="ghost"
            onClick={() => setFormType('user')}
          >
            Patient Register
          </Button>
          <div className="w-px bg-gray-300" />
          <Button
            className={`w-full rounded-none rounded-tr-xl h-full text-lg ${formType === 'staff' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-gray-600'} hover:bg-blue-500 hover:text-white`}
            onClick={() => setFormType('staff')}
          >
            Staff Register
          </Button>
        </div>
        {formType === 'user' ? (
          <UserRegisterForm />
        ) : (
          <StaffRegisterForm />
        )}
      </Card>
    </div>
  );
}
