import useAppointmentsAll from '@/hooks/useAppointmentsAll';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { reportGeneration } from '../report-generation/reportGeneration';
function AllAppointments() {
  const [reportLoading, setReportLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the appointments Data
  const { queryData, isLoading, isError } =
    useAppointmentsAll();

  // Filter the data based on the search term
  const filteredAppointments = queryData?.filter(
    (appointments) =>
      appointments.hospital
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointments.patientName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointments.doctorName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  // Filter the fields need
  const specificFieldsArray = filteredAppointments?.map(
    (appointment) => ({
      patientName: appointment.patientName,
      phoneNumber: appointment.phoneNumber,
      nic: appointment.nic,
      doctorName: appointment.doctorName,
      hospital: appointment.hospital,
      createdAt: new Date(
        appointment.createdAt,
      ).toLocaleDateString(),
    }),
  );

  // Handle the Report Download
  const handleClick = async () => {
    setReportLoading(true); // Start ReportLoading
    try {
      reportGeneration(specificFieldsArray, 'Appointments Report');
      console.log(' done');
    } catch (error) {
      console.error('Error downloading the report:', error);
    } finally {
      setReportLoading(false); // End ReportLoading
    }
  };

  return (
    <div className="w-full flex flex-col  p-5">
      <div className="flex px-10 justify-between flex-wrap items-center mb-5">
        <h3 className=" text-xl m-5 font-semibold">
          All Appointments
        </h3>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search Appointments..."
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>NIC</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading</p>}
            {specificFieldsArray?.map(
              (appointment, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {appointment.patientName}
                  </TableCell>
                  <TableCell>
                    {appointment.phoneNumber}
                  </TableCell>
                  <TableCell>{appointment.nic}</TableCell>
                  <TableCell>
                    {appointment.doctorName}
                  </TableCell>
                  <TableCell>
                    {appointment.hospital}
                  </TableCell>
                  <TableCell>
                    {appointment.createdAt}
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AllAppointments;
