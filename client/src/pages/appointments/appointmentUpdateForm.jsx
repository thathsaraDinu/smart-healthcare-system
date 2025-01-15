import { updateAppointment } from '@/api/appointment.api';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const {
    _id: appointmentId,
    appointmentNumber,
    patientName,
    email,
    phoneNumber,
    area,
    nic,
    schedule,
  } = loc.state || {};

  const [formData, setFormData] = useState({
    patientName: patientName || '',
    email: email || '',
    phoneNumber: phoneNumber || '',
    area: area || '',
    nic: nic || '',
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patientName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.area ||
      !formData.nic
    ) {
      setError(true);
      setTimeout(() => setError(false), 3000);

      return;
    }

    const appointmentData = {
      patientName: formData.patientName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      area: formData.area,
      nic: formData.nic,
      schedule,
    };

    try {
      await updateAppointment(
        appointmentId,
        appointmentData,
      );

      navigate('/myappointments');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="container">
        <div className="mt-10">
          <div className="mb-5 text-xl font-semibold">
            Place Appointment
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 xl:grid-cols-5 gap-5"
          >
            <div>
              <div className="p-5 rounded-xl shadow border border-gray-200 flex xl:gap-0 gap-10 flex-col md:flex-row xl:flex-col">
                <div>
                  <div className="font-medium text-sm">
                    {schedule.hospital}
                  </div>
                  <div className="text-sm text-gray-500">
                    {schedule.location}
                  </div>
                  <div className="mt-5">
                    <div className="text-sm xl:text-xs 2xl:text-sm">
                      Doctor
                    </div>
                    <div className="font-medium text-xs mt-1">
                      {schedule.doctor.fullName}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-sm xl:text-xs 2xl:text-sm">
                      Session date
                    </div>
                    <div className="font-medium text-xs mt-1">
                      {schedule.date}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-sm xl:text-xs 2xl:text-sm">
                      Session time
                    </div>
                    <div className="font-medium text-xs mt-1">
                      {schedule.time}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-sm xl:text-xs 2xl:text-sm">
                      Appointment no
                    </div>
                    <div className="font-medium text-xs mt-1">
                      {appointmentNumber}
                    </div>
                  </div>
                  <div className="text-xs mt-4 text-gray-500">
                    Your estimated appointment time is{' '}
                    <span className="text-blue-500 font-medium">
                      {schedule.time}
                    </span>
                    . This time depends on the time spent
                    with patients ahead of you.
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-8 gap-5 gap-y-5 md:gap-y-8">
                <div className="flex md:col-span-4">
                  <div className="w-full">
                    <div className="text-xs mb-2 font-medium pl-2">
                      Name
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    </div>
                    <input
                      className="w-full rounded-xl py-[12px] px-4 text-sm focus:outline-none border border-blue-500"
                      placeholder="Enter patient name"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="text-xs mb-2 font-medium pl-2">
                    Email
                  </div>
                  <input
                    className="w-full rounded-xl py-[12px] px-4 text-sm focus:outline-none border border-blue-500"
                    placeholder="Receipt will be sent to this email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex md:col-span-4">
                  <div className="w-1/3">
                    <div className="text-xs mb-2 font-medium pl-2">
                      Number
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    </div>
                    <button className="w-full rounded-r-none border-r-0 py-3 px-4 text-sm focus:outline-none rounded-xl border border-blue-500 bg-white text-left">
                      +94
                    </button>
                  </div>
                  <div className="w-full mt-6">
                    <input
                      className="w-full rounded-l-none rounded-xl py-[12px] px-4 text-sm focus:outline-none border border-blue-500"
                      placeholder="71XXXXXXX"
                      type="number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="text-xs mb-2 font-medium pl-2">
                    Area
                  </div>
                  <input
                    className="w-full rounded-xl py-[12px] px-4 text-sm focus:outline-none border border-blue-500"
                    placeholder="Please enter your closest city"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex md:col-span-5 col-start-1">
                  <div className="w-full">
                    <div className="text-xs mb-2 font-medium pl-2">
                      NIC Number
                      <span className="text-red-500 ml-1">
                        *
                      </span>
                    </div>
                    <input
                      className="w-full rounded-xl py-[12px] px-4 text-sm focus:outline-none border border-blue-500"
                      placeholder="Enter NIC number"
                      name="nic"
                      value={formData.nic}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {error && (
                <div
                  className="mt-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">
                    Error!
                  </strong>{' '}
                  <span className="block sm:inline">
                    Fields cann't be empty
                  </span>
                </div>
              )}
            </div>
            <div>
              <div className="shadow border border-gray-200 p-5 rounded-xl mb-5">
                <div className="font-semibold text-blue-500 mb-1">
                  Payment Details
                </div>
                <div className="text-xs text-gray-500">
                  Detailed payment breakdown on your
                  transaction
                </div>
                <div>
                  <div className="flex flex-col gap-4 border-y border-black/5 py-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs 2xl:text-sm">
                        Doctor fee
                      </div>
                      <div className="font-semibold text-sm xl:text-xs 2xl:text-sm">
                        Rs {schedule.bookingFee.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs 2xl:text-sm">
                        Hospital fee
                      </div>
                      <div className="font-semibold text-sm xl:text-xs 2xl:text-sm">
                        Rs 600.00
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs 2xl:text-sm">
                        eChannelling fee
                      </div>
                      <div className="font-semibold text-sm xl:text-xs 2xl:text-sm">
                        Rs 199.00
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs 2xl:text-sm">
                        Discount
                      </div>
                      <div className="font-semibold text-sm xl:text-xs 2xl:text-sm text-red-600">
                        - Rs 0.00
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs 2xl:text-sm">
                        No show fee
                      </div>
                      <div className="font-semibold text-sm xl:text-xs 2xl:text-sm">
                        Rs 0.00
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="font-semibold">
                      Total fee
                    </div>
                    <div className="font-semibold">
                      Rs{' '}
                      {(
                        schedule.bookingFee +
                        199 +
                        600
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-7 py-3 text-sm bg-blue-500 text-white font-medium rounded-xl"
              >
                Update Appointment
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AppointmentForm;
