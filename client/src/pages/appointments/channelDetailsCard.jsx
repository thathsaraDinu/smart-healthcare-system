import React from 'react';
import { Link } from 'react-router-dom';

const ChannelDetailsCard = () => {
  return (
    <div className="px-4 mb-4">
      <p className="text-lg text-gray-600 mb-1">
        Saturday, 19 Oct 2024
      </p>
      <div className="flex items-center justify-between p-3 shadow border border-gray-100 h-[100px] rounded-lg">
        <div className="text-sm">
          <p className="font-semibold text-blue-500 mb-2">
            Arogya Hospital
          </p>
          <p className="text-gray-500">Gampaha</p>
          <p className="font-semibold text-blue-500">
            PHYSICIAN
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-blue-500">
            06:45 AM
          </p>
          <p className="text-gray-500">Morning</p>
        </div>
        <div className="flex items-center text-sm">
          <div className="mr-4">
            <p className="font-semibold text-green-500">
              Rs 2,100.00 + Booking Fee
            </p>
            <p className="text-gray-500 ">
              Channelling Fee
            </p>
          </div>

          <Link className="flex justify-center items-center px-10 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetailsCard;
