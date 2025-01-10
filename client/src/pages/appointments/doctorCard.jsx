import React from 'react';
import avatar from '@/assets/avatar/default.png';
import { Link } from 'react-router-dom';
import {
  Calendar,
  User,
  Medal,
  ArrowRight,
} from 'lucide-react';

export default function DoctorCard({ data }) {
  const genderIcon =
    data.gender.toLowerCase() === 'male' ? (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="blue"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 3C15 2.44772 15.4477 2 16 2H20C21.1046 2 22 2.89543 22 4V8C22 8.55229 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V5.41288L15.4671 9.94579C15.4171 9.99582 15.363 10.0394 15.3061 10.0767C16.3674 11.4342 17 13.1432 17 15C17 19.4183 13.4183 23 9 23C4.58172 23 1 19.4183 1 15C1 10.5817 4.58172 7 9 7C10.8559 7 12.5642 7.63197 13.9214 8.69246C13.9587 8.63539 14.0024 8.58128 14.0525 8.53118L18.5836 4H16C15.4477 4 15 3.55228 15 3ZM9 20.9963C5.68831 20.9963 3.00365 18.3117 3.00365 15C3.00365 11.6883 5.68831 9.00365 9 9.00365C12.3117 9.00365 14.9963 11.6883 14.9963 15C14.9963 18.3117 12.3117 20.9963 9 20.9963Z"
          ></path>{' '}
        </g>
      </svg>
    ) : data.gender.toLowerCase() === 'female' ? (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="red"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {' '}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
          ></path>{' '}
        </g>
      </svg>
    ) : null;

  const statusStyle =
    data.status.toLowerCase() === 'active'
      ? 'text-green-700 bg-green-100'
      : 'text-red-700 bg-red-100';

  return (
    <div className="relative mx-auto w-[240px] bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {/* Profile link overlay on avatar */}
        <Link
          to={`/doctorprofile/${data._id}`}
          className="absolute inset-0 z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-t-xl"
        >
          <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700 flex items-center gap-1">
            View Profile <ArrowRight size={16} />
          </span>
        </Link>

        <div className="pt-6 pb-4 mb-2 bg-gradient-to-b from-blue-50 to-white rounded-t-xl">
          <img
            className="rounded-full mx-auto w-[140px] h-[140px] object-cover border-4 border-white shadow-md"
            src={avatar}
            alt={`${data.fullName}`}
          />
        </div>
      </div>
      <div
        className={`absolute top-2 right-2 text-xs font-semibold py-1 px-3 rounded-full ${statusStyle}`}
      >
        {data.status.toUpperCase()}
      </div>

      <div className="px-5 pb-5">
        {/* Status Display */}

        {/* Gender and Name */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <span
            className={`px-2 py-1 ${data.gender == 'male' ? 'text-blue-600 bg-blue-50 ' : 'text-pink-600 bg-pink-50'}  text-xs font-medium rounded-full flex items-center gap-1`}
          >
            {genderIcon}
            {data.gender}
          </span>
        </div>

        <h5 className="mb-2 text-xl text-center font-bold text-gray-900">
          {data.fullName}
        </h5>

        {/* Specialization */}
        <div className="flex items-center justify-center gap-1 mb-4">
          <Medal size={16} className="text-blue-500" />
          <p className="text-sm font-medium text-gray-600">
            {data.specialization}
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <Link
            to={`/channel/${data._id}`}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold text-white  rounded-lg  transition-colors duration-300"
            style={{
              pointerEvents:
                data.status.toUpperCase() === 'INACTIVE'
                  ? 'none'
                  : 'auto',
              backgroundColor:
                data.status.toUpperCase() === 'INACTIVE'
                  ? '#ccc'
                  : '#3b82f6',
              cursor:
                data.status.toUpperCase() === 'INACTIVE'
                  ? 'not-allowed'
                  : 'pointer',
              hover: {
                backgroundColor:
                  data.status.toUpperCase() === 'INACTIVE'
                    ? '#ccc'
                    : '#2563eb',
              },
            }}
          >
            <Calendar size={18} />
            Channel Now
          </Link>

          <Link
            to={`/doctorprofile/${data._id}`}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300"
          >
            <User size={18} />
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
