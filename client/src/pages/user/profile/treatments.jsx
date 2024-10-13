import { Input } from '@/components/ui/input';

const Treatments = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Treatments
        </h2>
        <div className="flex items-center space-x-2">
          <Input
            id="notify"
            type="checkbox"
            className="w-4 h-4 hover:cursor-pointer hover:ring-1 hover:ring-gray-300"
          />
          <label
            className="text-sm text-gray-500 hover:cursor-pointer"
            htmlFor="notify"
          >
            Turn on reminder notifications
          </label>
        </div>
      </div>
    </div>
  );
};

export default Treatments;
