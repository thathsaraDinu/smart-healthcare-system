import { InputField } from '@/components/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { LoadingSpinner } from '@/components/ui/spinner';
import { useProfile } from '@/hooks/use-users';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdEditSquare, MdSaveAs } from 'react-icons/md';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: profile, isLoading: profileLoading } =
    useProfile(true);

  const form = useForm({
    defaultValues: {
      email: profile.email,
      fullName: profile.fullName,
    },
  });

  const editHandler = () => {
    setIsEditing(!isEditing);
    // Submit form
    if (isEditing) {
      form.handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  if (profileLoading) {
    return <LoadingSpinner />;
  }

  console.log(isEditing);

  return (
    <div>
      {profile && (
        <div>
          <Form {...form}>
            <form className="space-y-4 max-w-2xl mx-auto mt-8">
              <div className="flex justify-end">
                {!isEditing ? (
                  <Button
                    variant="primary"
                    className="text-blue-500"
                    onClick={editHandler}
                    type="button"
                  >
                    Update Info
                    <MdEditSquare
                      className="ml-1"
                      size={20}
                    />
                  </Button>
                ) : (
                  <div>
                    <Button
                      variant="primary"
                      className="text-red-500"
                      type="button"
                      onClick={editHandler}
                    >
                      Discard Changes
                    </Button>
                    <Button
                      variant="primary"
                      className="text-blue-500"
                      type="button"
                      onClick={editHandler}
                    >
                      Save Changes
                      <MdSaveAs
                        className="ml-1"
                        size={20}
                      />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <div className="font-bold mb-2">Name</div>
                <p className="mx-5 border-b">
                  {profile.fullName}
                </p>
              </div>
              <div>
                <InputField
                  disabled={!isEditing}
                  control={form.control}
                  label="Email"
                  labelStyle="font-bold"
                  name="email"
                  inputStyle={`mx-5 border-t-0 border-r-0 border-l-0 shadow-none rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-blue-500 ${isEditing ? 'border-blue-500' : 'disabled:cursor-auto disabled:opacity-100'}`}
                  value={profile.email}
                />
              </div>
              <div>
                <div>Gender</div>
                <p>{profile.gender}</p>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Profile;
