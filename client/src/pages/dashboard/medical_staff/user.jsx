import { getUsers } from '@/api/user.api';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { reportGeneration } from '../report-generation/reportGeneration';

const Patients = () => {
  const [reportLoading, setReportLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the patients data
  const { data, error, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: () => getUsers('user'),
  });
  console.log(' patients: ', data);

  // Filter the data using search query
  const filteredPatients = data?.filter(
    (patient) =>
      patient.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      patient.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      patient.gender
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  // Filter the fields need
  const specificFieldsArray = filteredPatients?.map(
    (patient) => ({
      fullName: patient.fullName,
      dob: new Date(patient.dob).toLocaleDateString(), // Format the date
      email: patient.email,
      gender: patient.gender,
      maritalStatus: patient.maritalStatus,
      mobile: patient.mobile,
    }),
  );

  // Handle the Report Download
  const handleClick = async () => {
    setReportLoading(true); // Start loading
    try {
      reportGeneration(
        specificFieldsArray,
        'Registered Patients Report',
      );
      console.log(' done');
    } catch (error) {
      console.error('Error downloading the report:', error);
    } finally {
      setReportLoading(false); // End loading
    }
  };

  return (
    <div className="w-full flex flex-col p-5">
      <div className="flex px-10 justify-between flex-wrap items-center mb-5">
        <h3 className=" text-xl m-5 font-semibold">
          Registered Patients
        </h3>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 mr-5 border rounded-md w-56 appearance-none focus:outline-none text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-5 flex-wrap">
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
      </div>
      <hr className="mb-5 border-gray-300" />
      <div className="px-10 flex flex-col">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-black py-3">
                Name
              </TableHead>
              <TableHead className="text-black py-3">
                DOB
              </TableHead>
              <TableHead className="text-black py-3">
                Email
              </TableHead>
              <TableHead className="text-black py-3">
                Gender
              </TableHead>
              <TableHead className="text-black py-3">
                Marital Status
              </TableHead>
              <TableHead className="text-black py-3">
                Mobile
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading</p>}
            {specificFieldsArray?.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.fullName}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>
                  {patient.maritalStatus}
                </TableCell>
                <TableCell>{patient.mobile}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Patients;
