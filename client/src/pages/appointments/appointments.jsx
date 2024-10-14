import React, { useState } from 'react';
import { Combobox } from '@/components/ui/combobox';
import DoctorCard from './doctorCard';
import { DatePicker } from '@/components/ui/date-picker';

const doctors = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
];

const Appointment = () => {
  const [hospital, setHospital] = useState('');
  const [doctor, setDoctor] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [date, setDate] = useState('');

  const onSearch = async (e) => {
    e.preventDefault();
    console.log({ hospital, doctor, specialization, date });
  };

  return (
    <>
      <section className="container">
        <div className="mt-10 px-[120px] flex justify-between">
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
          <form
            onSubmit={onSearch}
            className="mx-10 min-w-[400px]"
          >
            <h3></h3>
            <div className="mt-4">
              <p className="text-sm font-light mb-1">
                Doctor name
              </p>
              <Combobox
                data={doctors}
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
                data={doctors}
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
                data={doctors}
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
        </div>
      </section>
      <section className="container my-10">
        <div className="px-[120px]">
          <h2 className="font-bold text-2xl mb-5">
            Available Doctors
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <DoctorCard
              text="Here are the biggest enterprise technology
          acquisitions of 2021 so far, in reverse
          chronological order."
            />
            <DoctorCard />
            <DoctorCard />
            <DoctorCard />
            <DoctorCard />
            <DoctorCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointment;
