import { Button } from '@/components/ui/button';
import { MdBloodtype } from 'react-icons/md';
import { RiBodyScanFill } from 'react-icons/ri';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { InputField } from '@/components/input';

const allergiesOptions = [
  'Medication Allergies',
  'Food Allergies',
  'Environmental Allergies',
  'Severity and Reactions',
];

const cardiovascularOptions = [
  'Hypertension',
  'Coronary Artery Disease',
  'Heart Failure',
];

const otherConditions = [
  'Asthma',
  'Diabetes',
  'Musculoskeletal Disorders',
  'Neurological Disorders',
  'Mental Health Disorders',
  'Cancer',
  'Chronic Kidney Disease',
  'Other',
];

const MedicalHistory = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 items-center justify-between mb-4 border-b border-gray-200 pb-4">
        {/* Left Section (Blood Group & Weight) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Blood Group */}
          <Button
            variant="outline"
            className="flex items-center gap-2 p-4 text-left bg-white rounded-lg shadow-md w-full h-full justify-between"
          >
            <MdBloodtype className="w-10 h-10 text-red-600 mx-5" />
            <div>
              <p className="mb-1 text-sm font-semibold">
                Blood Group
              </p>
              <p className="text-sm">O+</p>
            </div>
          </Button>

          {/* Weight */}
          <Button
            variant="outline"
            className="flex items-center gap-2 p-4 text-left bg-white rounded-lg shadow-md w-full h-full justify-between"
          >
            <RiBodyScanFill className="w-10 h-10 text-yellow-400" />
            <div>
              <p className="mb-1 text-sm font-semibold">
                Weight
              </p>
              <p className="text-sm">70 kg</p>
            </div>
          </Button>

          {/* Reports */}
          <Button
            variant="outline"
            className="flex items-center gap-2 p-4 text-left bg-white rounded-lg shadow-md w-full h-full justify-between"
          >
            <HiOutlineClipboardDocumentList className="w-10 h-10 text-blue-600" />
            <div className="ms-2 text-left w-full">
              <p className="mb-1 text-sm font-semibold">
                Blood Test
              </p>
              <p className="text-sm">2021-09-01</p>
            </div>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 p-4 text-left bg-white rounded-lg shadow-md w-full h-full justify-between"
          >
            <HiOutlineClipboardDocumentList className="w-10 h-10 text-blue-600" />
            <div className="ms-2 text-left w-full">
              <p className="mb-1 text-sm font-semibold">
                General Report
              </p>
              <p className="text-sm">2021-09-01</p>
            </div>
          </Button>
        </div>
      </div>

      {/* Data */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Allergies Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Allergies
            </h3>
            {allergiesOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mb-2"
              >
                <InputField
                  type="checkbox"
                  value={option}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {/* Cardiovascular Diseases Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Cardiovascular Diseases
            </h3>
            {cardiovascularOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mb-2"
              >
                <input
                  type="checkbox"
                  value={option}
                  // onChange={() =>
                  //   handleCheckboxChange('cardiovascularDiseases', option)
                  // }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {/* Other Conditions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Other Conditions
            </h3>
            {otherConditions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 mb-2"
              >
                <input
                  type="checkbox"
                  value={option}
                  // onChange={() =>
                  //   handleCheckboxChange('cardiovascularDiseases', option)
                  // }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {/* For Doctor Section */}
          <div className="">
            <h3 className="text-lg font-semibold mb-2">
              Special Note
            </h3>
            <textarea
              // value={formData.explanation}
              // onChange={(e) =>
              //   setFormData({ ...formData, explanation: e.target.value })
              // }
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              rows={4}
              placeholder="Explanation..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
