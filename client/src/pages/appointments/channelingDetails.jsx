import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '@/assets/avatar/default.png';
import ChannelDetailsCard from './channelDetailsCard';

const ChannelingDetails = () => {
  return (
    <section className="container">
      <div className="mt-10 px-[120px]">
        <h2 className="text-xl font-bold mb-5">
          Channeling
        </h2>
        <div className="flex">
          <div className="max-w-[250px] max-h-[320px] bg-white border border-gray-200 rounded-lg shadow grow">
            <img
              className="rounded-full mx-auto mt-5 mb-2 w-[150px]"
              src={avatar}
              alt={avatar}
            />
            <p className="text-xs text-center font-normal text-gray-700">
              Male
            </p>
            <div className="px-5 pb-5">
              <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900">
                Dr. Samantha
              </h5>
              <p className="mb-3 text-xs text-center font-normal text-gray-700">
                CARDIOLOGIST
              </p>
              <Link
                to="/channel"
                className="flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                View Profile
              </Link>
            </div>
          </div>
          <div className="grow">
            <ChannelDetailsCard />
            <ChannelDetailsCard />
            <ChannelDetailsCard />
            <ChannelDetailsCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChannelingDetails;
