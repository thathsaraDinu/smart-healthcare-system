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
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Change rows per page 

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

  // Filter the fields needed
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
  const handleClick = () => {
    setReportLoading(true); // Start ReportLoading
    try {
      reportGeneration(
        specificFieldsArray,
        'Appointments Report',
      );
    } catch (error) {
      console.error('Error downloading the report:', error);
    } finally {
      setReportLoading(false); // End ReportLoading
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(
    specificFieldsArray?.length / rowsPerPage,
  );
  const paginatedAppointments = specificFieldsArray?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

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

      <div className="px-10 h-[490px] flex flex-col relative">
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
            {paginatedAppointments?.map(
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

        {/* Pagination controls */}
        <div className="absolute text-sm bottom-0 right-20">
          <div className="flex justify-center mt-10 items-center ">
            <Button
              className="px-3 py-1 border rounded-md "
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              Previous
            </Button>
            <span className="px-2 py-1 text-center w-36">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              className="px-3 py-1 border rounded-md"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllAppointments;
