import useDoctors from '../../../hooks/useDoctors';
import avatar from '@/assets/avatar/default.png';
import { useState } from 'react';
import { MdFemale, MdMale } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { reportGeneration } from '../report-generation/reportGeneration';

const AllDoctors = () => {
  const [reportLoading, setReportLoading] = useState(false);
  const { data, isLoading, error } = useDoctors();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter the data based on the search term and status
  const filteredDoctors = data?.filter((doctor) => {
    const matchesSearch =
      doctor.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doctor.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' ||
      doctor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Filter the fields need
  const specificFieldsArray = filteredDoctors?.map(
    (doctor) => ({
      fullName: doctor.fullName,
      specialization: doctor.specialization,
      mobile: doctor.mobile,
      email: doctor.email,
      gender: doctor.gender,
      status: doctor.status,
    }),
  );

  // Handle the Report Download
  const handleClick = async () => {
    setReportLoading(true); // Start loading
    try {
      reportGeneration(specificFieldsArray, 'Registered Doctors Report');
      console.log(' done');
    } catch (error) {
      console.error('Error downloading the report:', error);
    } finally {
      setReportLoading(false); // End loading
    }
  };

  return (
    <div className="flex flex-col p-5">
      <div className="flex px-10 justify-between flex-wrap items-center mb-5">
        <h3 className="text-xl m-5 font-semibold">
          Registered Doctors
        </h3>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search by name or specialization"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 mr-5 border rounded-md w-72 appearance-none focus:outline-none text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
            className="px-4 py-2 mr-5 border rounded-md w-56 appearance-none focus:outline-none text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="active">Available</option>
            <option value="inactive">Unavailable</option>
          </select>
          <Button
            disabled={reportLoading}
            onClick={handleClick}
            className="bg-red-500 text-white text-sm transition rounded-md px-5 py-2 hover:bg-red-600"
          >
            {reportLoading
              ? 'Loading...'
              : 'Download Report'}
          </Button>
        </div>
      </div>
      <hr className="mb-5 border-gray-300" />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading</p>}
      <div className="flex gap-5 flex-wrap justify-center ">
        {specificFieldsArray?.map((doctor, index) => (
          <div
            key={index}
            className="lg:w-[260px] bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 "
          >
            <img
              className="rounded-full mx-auto mt-5 mb-2 w-[150px] h-[150px] object-cover"
              src={avatar} // Make sure to define the 'avatar' source
              alt={`${doctor.fullName}'s profile`}
            />
            <div className="px-5 pb-5">
              <div className="mb-2 text-center flex justify-between items-center">
                <h5 className="font-bold text-lg tracking-tight text-gray-900 line-clamp-1">
                  {doctor.fullName}
                </h5>
                {doctor.gender === 'male' ? (
                  <MdMale size={20} color="#0000FF" />
                ) : (
                  <MdFemale size={20} color="#FF69B4" />
                )}
              </div>
              <p className="mb-3 text-sm text-center font-medium text-gray-700">
                Specialization: {doctor.specialization}
              </p>
              <p className="mb-3 text-xs text-center font-normal text-gray-700">
                {doctor.mobile}
              </p>
              <p className="mb-3 text-xs text-center font-normal text-gray-700">
                {doctor.email}
              </p>
              <p
                className="text-xs text-center font-normal"
                style={{
                  color:
                    doctor.status === 'Available'
                      ? 'green'
                      : 'red',
                }}
              >
                Status: {doctor.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDoctors;
