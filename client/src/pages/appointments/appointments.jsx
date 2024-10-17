import React, { useState, useEffect } from 'react';
import { Combobox } from '@/components/ui/combobox';
import DoctorCard from './doctorCard';
import { DatePicker } from '@/components/ui/date-picker';
import useDoctors from '@/hooks/useDoctors';

const doctors = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const Appointment = () => {
  const { data } = useDoctors();
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

  return (
    <>
      <section className="lg:container">
        <div className="mt-10 lg:px-[120px] p-5 flex flex-col lg:flex-row  justify-between">
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
            <button
              type="submit"
              className="mt-[50px] h-9 text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500 w-[300px] rounded-lg hover:bg-blue-600 transition-all"
            >
              View Available Doctors
            </button>
          </div>
          {data && (
            <form
              onSubmit={onSearch}
              className="mx-0 lg:mx-10 max-w-[400px]"
            >
              <h3></h3>
              <div className="mt-4">
                <p className="text-sm font-light mb-1">
                  Doctor name
                </p>
                <Combobox
                  data={doctorNames}
                  width="400px"
                  placeholder="Doctor"
                  value={doctor}
                  setValue={setDoctor}
                />
              </div>
              <div className="mt-4">
                <p className="text-sm font-light mb-1">
                  Hospital
                </p>
                <Combobox
                  data={hospitalNames}
                  width="400px"
                  placeholder="Hospital"
                  value={hospital}
                  setValue={setHospital}
                />
              </div>
              <div className="mt-4">
                <p className="text-sm font-light mb-1">
                  Specialization
                </p>
                <Combobox
                  data={specializations}
                  width="400px"
                  placeholder="Specilization"
                  value={specialization}
                  setValue={setSpecialization}
                />
              </div>
              <div className="mt-4">
                <p className="text-sm font-light mb-1">
                  Date
                </p>
                <DatePicker date={date} setDate={setDate} />
              </div>
              <button
                type="submit"
                className="mt-5 h-9 text-white bg-blue-500 w-full rounded-lg hover:bg-blue-600 transition-all"
              >
                Search
              </button>
            </form>
          )}
        </div>
      </section>
      <section className="container my-10">
        <div className="lg:px-[120px]">
          <h2 className="font-bold text-2xl mb-5">
            Available Doctors
          </h2>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-strech gap-4">
            {filteredDoctors &&
            filteredDoctors.length > 0 ? (
              filteredDoctors.map((item) => (
                <DoctorCard key={item._id} data={item} />
              ))
            ) : (
              <>
                <div className="font-semibold mt-10">
                  No Doctors Availabe
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointment;
