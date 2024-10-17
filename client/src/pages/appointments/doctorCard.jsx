import React from 'react';
import avatar from '@/assets/avatar/default.png';
import { Link } from 'react-router-dom';

const DoctorCard = ({ data }) => {
  return (
    <div className="mx-auto min-w-[240px] bg-white border border-gray-200 rounded-lg shadow">
      <img
        className="rounded-full mx-auto mt-5 mb-2 w-[150px]"
        src={avatar}
        alt={avatar}
      />
      <p className="text-xs text-center font-normal text-gray-700">
        {data.gender}
      </p>
      <div className="px-5 pb-5">
        <h5 className="mb-2 text-lg text-center font-bold tracking-tight text-gray-900">
          Dr. {data.fullName}
        </h5>
        <p className="mb-3 text-xs text-center font-normal text-gray-700">
          {data.specialization}
        </p>
        <Link
          to="/channel"
          className="flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Channel Now
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
