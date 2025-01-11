import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '@/assets/avatar/default.png';
import ChannelDetailsCard from './channelDetailsCard';
import { useParams } from 'react-router-dom';
import useSchedules from '@/hooks/useSchedules';

const ChannelingDetails = () => {
  const { doctorId } = useParams();
  const { data, isLoading, error } = useSchedules(doctorId);

  const {
    fullName,
    gender,
    specialization,
    hospitalDetails,
  } = data || {};

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : data ? (
        <section className="container px-2 md:px-10">
          <div className="mt-10 xl:px-[120px]">
            <h2 className="text-xl font-bold mb-5">
              Channeling
            </h2>
            <div className="flex flex-col items-center md:items-start lg:flex-row gap-5">
              <div className="max-w-[250px] max-h-[320px] bg-white border border-gray-200 rounded-lg shadow grow">
                <img
                  className="rounded-full mx-auto mt-5 mb-2 w-[150px]"
                  src={avatar}
                  alt={avatar}
                />
                <p className="text-xs text-center font-normal text-gray-700">
                  {gender}
                </p>
                <div className="px-5 pb-5">
                  <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900">
                    {fullName}
                  </h5>
                  <p className="mb-3 text-xs text-center font-normal text-gray-700">
                    {specialization}
                  </p>
                  <Link
                    to={`/doctorprofile/${doctorId}`}
                    className="flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
              <div className="grow">
                {hospitalDetails.map((item) =>
                  item.arrivalTimes.map((arrivalTime) => (
                    <ChannelDetailsCard
                      key={arrivalTime._id}
                      doctor={{
                        fullName,
                        gender,
                        specialization,
                      }}
                      data={item}
                      arrivalTime={arrivalTime}
                    />
                  )),
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        error && <></>
      )}
    </>
  );
};

export default ChannelingDetails;
