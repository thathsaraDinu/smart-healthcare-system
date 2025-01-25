import { useEffect, useState } from 'react';
import ChannelDetailsCard from './channelDetailsCard';
import { useParams } from 'react-router-dom';
import { getDoctorById } from '@/api/user.api';
import DoctorCard from './doctorCard';
import { useQuery } from '@tanstack/react-query';

const ChannelingDetails = () => {
  const { doctorId } = useParams();
  const [doctorData, setDoctorData] = useState({
    fullName: '',
    specialization: '',
    status: 'inactive',
    gender: '',
    createdAt: '',
    mobile: '',
    email: '',
    hospitalDetails: [],
    education: [],
    awards: [],
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['doctorinfo', doctorId],
    queryFn: () => getDoctorById(doctorId),
  });
  useEffect(() => {
    if (data) {
      setDoctorData(data.user);
    }
  }, [data]);

   const doctor = {
     fullName: doctorData.fullName,
     specialization: doctorData.specialization,
     gender: doctorData.gender,
   };

  return (
    <div className="py-12 lg:container mx-auto xl:px-[120px] ">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : doctorData ? (
        <div className=" flex flex-col gap-10">
          <div className="text-xl text-center md:text-left font-bold px-4">
            Channeling
          </div>
          <div className="flex flex-col md:flex-row gap-10 md:gap-0 lg:px-10">
            <div className="px-4 mb-4">
              <DoctorCard
                key={doctorId}
                data={doctorData}
                isChannelingPage={true}
              />
            </div>
            <div className="grow">
              {doctorData.hospitalDetails.map((item) =>
                item.arrivalTimes.map((arrivalTime) => (
                  <ChannelDetailsCard
                    key={arrivalTime._id}
                    data={item}
                    arrivalTime={arrivalTime}
                    doctor={doctor}
                  />
                )),
              )}
            </div>
          </div>
        </div>
      ) : (
        error && <></>
      )}
    </div>
  );
};

export default ChannelingDetails;
