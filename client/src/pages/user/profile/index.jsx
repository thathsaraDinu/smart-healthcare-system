import { InputField } from '@/components/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/spinner';
import {
  useProfile,
  useUpdateProfile,
} from '@/hooks/use-users';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdEditSquare, MdSaveAs } from 'react-icons/md';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { userUpdateSchema } from '@/validations/user-validation';
import { useEffect } from 'react';

const UpdatedInputField = ({
  name,
  label,
  form,
  disabled,
  className,
  type,
}) => {
  return (
    <InputField
      disabled={disabled}
      control={form.control}
      label={label}
      labelStyle="font-bold"
      name={name}
      type={type || 'text'}
      className={className}
      inputStyle={`mx-5 border-t-0 border-r-0 border-l-0 shadow-none rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-blue-500 ${!disabled ? 'border-blue-500' : 'disabled:cursor-auto disabled:opacity-100'}`}
    />
  );
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: profile,
    isLoading: profileLoading,
    refetch,
  } = useProfile(true);

  const form = useForm({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      fullName: profile.fullName,
      gender:
        profile.gender.charAt(0).toUpperCase() +
        profile.gender.slice(1),
      dob: format(new Date(profile.dob), 'dd/MM/yyyy'),
      patientId: profile.patientId,
      maritalStatus: profile.maritalStatus,
      physicianName: profile.physicianName,
      physicianMobile: profile.physicianMobile,
      email: profile.email,
      mobile: profile.mobile,
      emergencyContact: profile.emergencyContact,
    },
  });

  const {
    mutate: updateMutate,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = useUpdateProfile(refetch);

  const onSubmit = (data) => {
    console.log(data);
    updateMutate(data);
  };

  useEffect(() => {
    if (updateSuccess) {
      setIsEditing(false);
    }
  }, [updateSuccess]);

  const ignoredForm = useForm({
    defaultValues: {
      age:
        new Date().getFullYear() -
        new Date(profile.dob).getFullYear(),
    },
  });

  const editHandler = () => {
    setIsEditing(true);

    if (isEditing) {
      form.handleSubmit(onSubmit)();
    }
  };

  if (profileLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {profile && (
        <div>
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-2xl mx-auto mt-8"
            >
              <div className="flex justify-end">
                <div className="flex justify-end">
                  {!isEditing && (
                    <Button
                      variant="primary"
                      className="text-blue-500 font-semibold text-md p-0 m-0"
                      onClick={editHandler}
                      type="button"
                    >
                      Update Info
                      <MdEditSquare
                        className="ml-1"
                        size={20}
                      />
                    </Button>
                  )}
                  {isEditing && (
                    <Button
                      variant="primary"
                      className="text-blue-500 font-semibold text-md p-0 m-0"
                      type="button"
                      onClick={editHandler}
                    >
                      {updatePending ? (
                        <>
                          Saving...
                          <LoadingSpinner className="ml-1" />
                        </>
                      ) : (
                        <>
                          Save Changes
                          <MdSaveAs
                            className="ml-1"
                            size={20}
                          />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <UpdatedInputField
                  name="fullName"
                  label="Full Name"
                  disabled={!isEditing}
                  form={form}
                />
              </div>
              <div className="flex justify-between gap-20">
                {/* Age */}
                <UpdatedInputField
                  name="age"
                  label="Age"
                  disabled={true}
                  form={ignoredForm}
                  className="w-full"
                />
                {/* Gender */}
                <UpdatedInputField
                  name="gender"
                  label="Gender"
                  disabled={true}
                  form={form}
                  className="w-full"
                />
              </div>
              {/* Date of Birth */}
              <div>
                <UpdatedInputField
                  name="dob"
                  label="Date of Birth"
                  disabled={true}
                  form={form}
                />
              </div>
              {/* Patient ID */}
              <div>
                <UpdatedInputField
                  name="patientId"
                  label="Patient ID"
                  disabled={true}
                  form={form}
                />
              </div>
              {/* Marital Status */}
              <div>
                <UpdatedInputField
                  name="maritalStatus"
                  label="Marital Status"
                  disabled={!isEditing}
                  form={form}
                />
              </div>
              {/* Physician Name */}
              <div>
                <UpdatedInputField
                  name="physicianName"
                  label="Primary Care Physician"
                  disabled={!isEditing}
                  form={form}
                />
              </div>
              {/* Physician Number */}
              <div>
                <UpdatedInputField
                  name="physicianMobile"
                  label="Primary Care Physician's Number"
                  disabled={!isEditing}
                  form={form}
                />
              </div>
              {/* Email */}
              <div>
                <UpdatedInputField
                  name="email"
                  label="Email"
                  disabled={!isEditing}
                  form={form}
                />
              </div>
              {/* Mobile Number */}
              <div>
                <UpdatedInputField
                  name="mobile"
                  label="Mobile Number"
                  disabled={!isEditing}
                  form={form}
                />
              </div>
              {/* Emergency Contact */}
              <div>
                <UpdatedInputField
                  name="emergencyContact"
                  label="Emergency Contact"
                  disabled={!isEditing}
                  form={form}
                />
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Profile;

// Prop Types
UpdatedInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};
