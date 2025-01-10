import { useState, useEffect } from 'react';
import { Combobox } from '@/components/ui/combobox';
import DoctorCard from './doctorCard';
import { DatePicker } from '@/components/ui/date-picker';
import useDoctors from '@/hooks/useDoctors';
import { LoadingSpinner } from '@/components/ui/spinner';

const Appointment = () => {
  const { data, isLoading } = useDoctors();
  const [filteredDoctors, setFilteredDoctors] =
    useState(data);
  const [hospital, setHospital] = useState('');
  const [doctor, setDoctor] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (data) {
      setFilteredDoctors(data);
    }
  }, [data]);

  const doctorNames =
    data?.map((item) => ({
      value: item.fullName,
      label: item.fullName,
    })) || [];

  const hospitalNames =
    data?.flatMap((item) =>
      item.hospitalDetails.map((hospital) => ({
        value: hospital.hospital,
        label: hospital.hospital,
      })),
    ) || [];

  const specializations =
    data?.map((item) => ({
      value: item.specialization,
      label: item.specialization,
    })) || [];

  const onSearch = async (e) => {
    e.preventDefault();

    const results = data.filter((item) => {
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

    setFilteredDoctors(results);
  };

  const [showActive, setShowActive] = useState(false);

  const toggleDoctors = () => {
    if (showActive) {
      setFilteredDoctors(data);
    } else {
      const activeDoctors = data.filter(
        (doctor) => doctor.status === 'active',
      );
      setFilteredDoctors(activeDoctors);
    }
    setShowActive(!showActive);
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
              We know how large objects will act,
              <br />
              But things on a small scale.
            </p>
            {filteredDoctors && (
              <button
                type="button"
                className="mt-[50px] text-blue-500 border border-blue-500 hover:text-white px-10 py-2 rounded-lg hover:bg-blue-600 transition-all"
                onClick={toggleDoctors}
              >
                {showActive
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
                    Doctor name
                  </p>
                  <Combobox
                    data={doctorNames}
                    placeholder="Doctor"
                    value={doctor}
                    setValue={setDoctor}
                    className="w-full"
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

                <button
                  type="submit"
                  className="mt-5 h-9 text-white bg-blue-500 md:w-[400px] w-full  rounded-lg hover:bg-blue-600 transition-all"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
      <section className="container my-10">
        <div className="lg:px-[120px]">
          <h2 className="font-bold text-2xl mb-5">
            Available Doctors
          </h2>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-strech gap-4">
            {isLoading ? (
              <div className="col-span-5 h-36 flex items-center justify-center">
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
