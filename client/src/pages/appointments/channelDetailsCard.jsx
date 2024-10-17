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

const ChannelDetailsCard = ({
  doctor,
  data,
  arrivalTime,
}) => {
  const nextDate = nextDayOfTheWeek(arrivalTime.dayOfWeek);

  const appointmentData = {
    doctor,
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
      <div className="flex items-center justify-between p-3 shadow border border-gray-100 h-[100px] rounded-lg">
        <div className="text-sm">
          <p className="font-semibold text-blue-500 mb-2">
            {data.hospital}
          </p>
          <p className="text-gray-500">{data.location}</p>
          <p className="font-semibold text-blue-500">
            {data.specilization}
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-blue-500">
            {arrivalTime.time}
          </p>
        </div>
        <div className="flex items-center text-sm">
          <div className="mr-4">
            <p className="font-semibold text-green-500">
              Rs {data.bookingFee.toFixed(2)} + Booking Fee
            </p>
            <p className="text-gray-500 ">
              Channelling Fee
            </p>
          </div>

          <Link
            to="/appointmentform"
            state={appointmentData}
            className="flex justify-center items-center px-10 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetailsCard;
