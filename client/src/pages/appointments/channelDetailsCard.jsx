import React from 'react';
import { Link } from 'react-router-dom';
import { compareAsc, format } from 'date-fns';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const nextDayOfTheWeek = (dayName) => {
  const date = new Date();
  date.setDate(date.getDate() + 1);

  while (dayName !== days[date.getDay()]) {
    date.setDate(date.getDate() + 1);
  }

  return format(date, 'EEEE, dd MMM yyyy');
};

const ChannelDetailsCard = ({ data, arrivalTime, doctor }) => {
  const nextDate = nextDayOfTheWeek(arrivalTime.dayOfWeek);
  console.log(doctor)

  const appointmentData = {
    doctor: doctor,
    bookingFee: data.bookingFee,
    hospital: data.hospital,
    location: data.location,
    date: nextDate,
    time: arrivalTime.time,
  };

  return (
    <div className="px-4 mb-4">
      <p className="text-lg text-gray-600 mb-1">
        {nextDate}
      </p>

      <div className="justify-evenly w-full md:items-center py-5 md:py-6 px-3 gap:2 md:gap-10 flex flex-row shadow border border-gray-100  rounded-lg">
        <div className="text-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-5  w-1/2">
          <div className="">
            <p className="font-semibold text-blue-500 mb-3">
              {data.hospital}
            </p>
            <p className="text-gray-500">{data.location}</p>
            <p className="font-semibold text-blue-500">
              {data.specilization}
            </p>
          </div>
          <div className="text-sm mb-2">
            <p className="font-semibold text-blue-500">
              {arrivalTime.time}
            </p>
          </div>
        </div>

        <div className="flex items-end md:items-center gap-5 flex-col md:flex-row h-full justify-between w-1/2 text-sm">
          <div className="flex flex-col  md:items-start items-end text-right md:text-left">
            <div className="font-semibold text-green-500 ">
              Rs {data.bookingFee.toFixed(2)} + Booking Fee
            </div>
            <div className="text-gray-500">
              Channelling Fee
            </div>
          </div>

          <Link
            to="/appointmentform"
            state={appointmentData}
            className="  px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetailsCard;
