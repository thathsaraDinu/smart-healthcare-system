import { useState, useEffect } from 'react';
import { Combobox } from '@/components/ui/combobox';
import DoctorCard from './doctorCard';
import { DatePicker } from '@/components/ui/date-picker';
import useDoctors from '@/hooks/useDoctors';
import { LoadingSpinner } from '@/components/ui/spinner';

const Appointment = () => {
  const { data, isLoading } = useDoctors();
  const [filteredDoctors, setFilteredDoctors] = useState(
    [],
  );
  const [currentDoctors, setCurrentDoctors] = useState([]); // Active or all doctors, depending on toggle state
  const [hospital, setHospital] = useState('');
  const [doctor, setDoctor] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [date, setDate] = useState('');
  const [isActiveDoctors, setIsActiveDoctors] =
    useState(false);

  useEffect(() => {
    if (data) {
      setCurrentDoctors(data); // Default to all doctors
      setFilteredDoctors(data);
    }
  }, [data]);

  // the hospital list
  const hospitalNames =
    [
      ...new Set(
        data?.flatMap((item) =>
          item.hospitalDetails.map(
            (hospital) => hospital.hospital,
          ),
        ),
      ),
    ] // Remove duplicates
      .map((hospital) => ({
        value: hospital,
        label: hospital,
      })) || [];

  // the specialization list
  const specializations =
    [...new Set(data?.map((item) => item.specialization))] // Remove duplicates
      .map((specialization) => ({
        value: specialization,
        label: specialization,
      })) || [];

  // Handle form search
  const onSearch = (e) => {
    e.preventDefault();
    const filtered = applyFilters(currentDoctors); // Filter from currentDoctors (active or all)
    setFilteredDoctors(filtered);
  };

  // Toggle active/all doctors
  const toggleDoctors = () => {
    setIsActiveDoctors((prev) => !prev);
    const targetDoctors = isActiveDoctors
      ? data // Show all doctors
      : data.filter((doc) => doc.status === 'active'); // Show only active doctors
    setCurrentDoctors(targetDoctors); // Update currentDoctors
    setFilteredDoctors(applyFilters(targetDoctors)); // Apply current filters to the toggled list
  };

  // Filter based on the form inputs
  const applyFilters = (doctors) => {
    return doctors.filter((item) => {
      const hospitalMatch = hospital
        ? item.hospitalDetails.some((h) =>
            h.hospital
              .toLowerCase()
              .includes(hospital.toLowerCase()),
          )
        : true;
      const doctorMatch = doctor
        ? item.fullName
            .toLowerCase()
            .includes(doctor.toLowerCase())
        : true;
      const specializationMatch = specialization
        ? item.specialization
            .toLowerCase()
            .includes(specialization.toLowerCase())
        : true;
      const dateMatch = date
        ? item.hospitalDetails.some((h) =>
            h.arrivalTimes.some((a) =>
              a.time.includes(date),
            ),
          )
        : true;

      return (
        hospitalMatch &&
        doctorMatch &&
        specializationMatch &&
        dateMatch
      );
    });
  };

  return (
    <>
      <section className="lg:container">
        <div className="mt-10 xl:px-[120px] p-5 flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h2 className="mt-2 text-4xl font-bold leading-[50px]">
              <span className="text-blue-500">
                Find your Doctor
              </span>{' '}
              and{' '}
              <span className="text-blue-500">Make</span> an{' '}
              <br />
              Appointment
            </h2>
            <p className="mt-5 text-lg">
              Find the best healthcare providers near you.{' '}
              <br />
              Simple search, quick bookings, and expert
              care.
            </p>
            {data && (
              <button
                type="button"
                className={`mt-[50px] px-10 py-2 rounded-lg transition-all border font-medium ${
                  isActiveDoctors
                    ? 'bg-blue-500 text-white border-blue-600 shadow-md' // Selected state
                    : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-md' // Unselected state
                }`}
                onClick={toggleDoctors}
              >
                {isActiveDoctors
                  ? 'View All Doctors'
                  : 'View Active Doctors'}
              </button>
            )}
          </div>
          {data && (
            <div className="flex w-full md:w-auto justify-center lg:justify-end">
              <form
                onSubmit={onSearch}
                className="mx-4 lg:mx-10 md:w-[400px] w-full  space-y-4 "
              >
                <h3 className="text-lg font-semibold text-center lg:text-left">
                  Search Form
                </h3>

                <div>
                  <p className="text-sm font-light mb-1">
                    Doctor Name
                  </p>
                  <input
                    type="text"
                    placeholder="Doctor name"
                    value={doctor}
                    onChange={(e) =>
                      setDoctor(e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                  />
                </div>

                <div>
                  <p className="text-sm font-light mb-1">
                    Hospital
                  </p>
                  <Combobox
                    data={hospitalNames}
                    placeholder="Hospital"
                    value={hospital}
                    setValue={setHospital}
                    className="w-full"
                  />
                </div>

                <div>
                  <p className="text-sm font-light mb-1">
                    Specialization
                  </p>
                  <Combobox
                    data={specializations}
                    placeholder="Specialization"
                    value={specialization}
                    setValue={setSpecialization}
                  />
                </div>

                <div>
                  <p className="text-sm font-light mb-1">
                    Date
                  </p>
                  <DatePicker
                    date={date}
                    setDate={setDate}
                  />
                </div>
                <div className="flex text-sm md:text-base gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setDoctor('');
                      setHospital('');
                      setSpecialization('');
                      setDate('');
                    }}
                    className="py-2 px-1 text-primary border bg-gray-100 md:w-[400px] w-full  rounded-lg hover:bg-gray-200 transition-all"
                  >
                    Reset Filters
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-1 text-white bg-blue-500 md:w-[400px] w-full  rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Search Doctors
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
      <section className="container my-10">
        <div className="lg:px-[120px]">
          <h2 className="font-bold text-2xl mb-5">
            {isActiveDoctors ? (
              <>
                Results from{' '}
                <span className="text-blue-500">
                  Active
                </span>{' '}
                Doctors
              </>
            ) : (
              <>
                Results from{' '}
                <span className="text-blue-500">All</span>{' '}
                Doctors
              </>
            )}
          </h2>
          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 place-items-strech gap-4">
            {isLoading ? (
              <div className="col-span-5 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : filteredDoctors &&
              filteredDoctors.length > 0 ? (
              filteredDoctors.map((item) => (
                <DoctorCard key={item._id} data={item} />
              ))
            ) : (
              <div className="font-semibold mt-10">
                No Doctors Available
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointment;
