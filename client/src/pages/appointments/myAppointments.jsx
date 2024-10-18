import { deleteAppointment } from '@/api/appointment.api';
import useAppointments from '@/hooks/useAppointments';
import React from 'react';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Link } from 'react-router-dom';

const MyAppointments = () => {
  const { data, refetch } = useAppointments();
  const [tab, setTab] = useState('Today');

  return (
    <>
      <section className="container">
        <div className="mt-10 px-[120px]">
          <div className="relative">
            <div>
              <div className="mb-8  max-w-2xl mx-auto">
                <div className="border border-blue-500 rounded-xl overflow-clip mx-[5%] lg:mx-0">
                  <div className="grid grid-cols-2 ">
                    <div
                      onClick={() => setTab('Today')}
                      className={`${tab == 'Today' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} font-medium p-2 sm:p-3 text-center cursor-pointer group`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="hidden sm:block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-6 group-hover:rotate-45 duration-200 "
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <div className="text-sm sm:text-base">
                          Today's appointments
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => setTab('History')}
                      className={`${tab == 'History' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} font-medium p-2 sm:p-3 text-center cursor-pointer group`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="hidden sm:block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-6 group-hover:rotate-45 duration-200 "
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            ></path>
                          </svg>
                        </div>
                        <div className="text-sm sm:text-base">
                          Appointment history
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Today */}
            {tab == 'Today' && (
              <div className="-mt-12">
                <div>
                  <div className="rounded-3xl shadow border border-gray-200 p-5 sm:p-10 pt-14 max-w-6xl mx-auto">
                    <div className=" text-lg font-semibold">
                      Check today's appointments
                    </div>
                    <div className="text-sm mt-1 mb-8 text-gray-500">
                      Please enter your phone number used to
                      place the Appointment
                    </div>
                    <form className="flex sm:flex-row flex-col items-start gap-3">
                      <div className="w-full">
                        <div className="text-xs mb-2 font-medium pl-2">
                          Appointment ID
                        </div>
                        <div className="relative">
                          <input
                            className="w-full  undefined false rounded-xl py-[12px] px-4 text-sm focus:outline-none border border-blue-500"
                            placeholder="XXXXXXX"
                            name="mobile"
                          />
                        </div>
                      </div>
                      <div className="w-full sm:w-1/3 mt-6">
                        <button
                          type="button"
                          className="w-full px-7 py-1.5 text-sm bg-green-500 text-white px-2 py-1.5 md:py-3 mt-auto rounded-xl text-sm group border border-green-500"
                        >
                          <div className="flex justify-center items-center group-hover:gap-3">
                            <div className="flex items-center capitalize gap-3 whitespace-nowrap">
                              Search
                            </div>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="w-4 group-hover:ml-0 -ml-7 group-hover:opacity-100 opacity-0 duration-200 stroke-current stroke-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {data &&
                  data.map(
                    (item) =>
                      new Date().getDate() ==
                        item.schedule.date.split(
                          ' ',
                        )[1] && (
                        <div
                          key={item._id}
                          className="mt-10"
                        >
                          <div className="px-4 mb-4">
                            <div className="flex items-center justify-between p-3 shadow border border-gray-100 h-[100px] rounded-lg">
                              <div className="text-sm">
                                <p className="font-semibold text-blue-500 mb-2">
                                  Appointment No
                                </p>
                                <p className="text-gray-500">
                                  {item.appointmentNumber}
                                </p>
                              </div>
                              <div className="text-sm pl-2 border-l border-gray-300">
                                <p className="font-semibold text-blue-500 mb-2">
                                  Doctor
                                </p>
                                <p className="text-gray-500">
                                  {
                                    item.schedule.doctor
                                      .fullName
                                  }
                                </p>
                              </div>
                              <div className="text-sm pl-2 border-l border-gray-300">
                                <p className="font-semibold text-blue-500 mb-2">
                                  {item.schedule.hospital}
                                </p>
                                <p className="text-gray-500">
                                  {item.schedule.location}
                                </p>
                                <p className="font-semibold text-blue-500">
                                  {
                                    item.schedule.doctor
                                      .specialization
                                  }
                                </p>
                              </div>
                              <div className="text-sm pl-2 border-l border-gray-300">
                                <p className="font-semibold text-blue-500">
                                  {item.schedule.date}
                                </p>
                                <p className="font-semibold text-blue-500">
                                  {item.schedule.time}
                                </p>
                              </div>
                              <div className="flex items-center text-sm pl-2 border-l border-gray-300">
                                <div className="mr-4">
                                  <p className="font-semibold text-green-500">
                                    Rs{' '}
                                    {item.schedule.bookingFee.toFixed(
                                      2,
                                    )}{' '}
                                    + Booking Fee
                                  </p>
                                  <p className="text-gray-500 ">
                                    Channelling Fee
                                  </p>
                                </div>
                              </div>
                              <div className="text-xs pl-2 border-l border-gray-300">
                                <button className="p-2 mx-2 text-blue-500 border border-blue-500 rounded-lg">
                                  Update
                                </button>
                                <button className="p-2 mx-2 text-red-500 border border-red-500 rounded-lg">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                  )}
              </div>
            )}
            {/* History */}
            {tab == 'History' && (
              <div className="-mt-12">
                <div className="rounded-3xl shadow border border-gray-200 p-5 sm:p-10 pt-14 mx-auto">
                  <div className=" text-lg font-semibold">
                    Check appointments history
                  </div>
                  <div className="text-sm mt-1 mb-8 text-gray-500">
                    Review your past appointments and
                    reconfirm appointments
                  </div>
                  <form className="max-w-6xl">
                    <div className="flex sm:flex-row flex-col items-start gap-3">
                      <div className="w-full">
                        <div className="text-xs mb-2 font-medium pl-2">
                          Appointment ID
                        </div>
                        <div className="relative">
                          <input
                            className="w-full  undefined false rounded-xl py-[12px] px-4 text-sm focus:outline-none border border-blue-500"
                            placeholder="XXXXXX"
                          />
                        </div>
                      </div>

                      <div className="mt-6 sm:w-auto w-full">
                        <button
                          type="button"
                          className="w-full px-7 py-1.5 text-sm bg-green-500 text-white px-2 py-1.5 md:py-3 mt-auto rounded-xl text-sm group border border-primaryGreen"
                        >
                          <div className="flex justify-center items-center group-hover:gap-3">
                            <div className="flex items-center capitalize gap-3 whitespace-nowrap">
                              Search
                            </div>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="w-4 group-hover:ml-0 -ml-7 group-hover:opacity-100 opacity-0 duration-200 stroke-current stroke-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray mt-4 flex items-center gap-2">
                      <div className="w-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      Please enter patient's NIC / Passport
                      number registered under the booking
                    </div>
                  </form>
                </div>
                {data &&
                  data.map((item) => (
                    <div key={item._id} className="mt-10">
                      <div className="px-4 mb-4">
                        <div className="flex items-center justify-between p-3 shadow border border-gray-100 h-[100px] rounded-lg">
                          <div className="text-sm">
                            <p className="font-semibold text-blue-500 mb-2">
                              Appointment No
                            </p>
                            <p className="text-gray-500">
                              {item.appointmentNumber}
                            </p>
                          </div>
                          <div className="text-sm pl-2 border-l border-gray-300">
                            <p className="font-semibold text-blue-500 mb-2">
                              Doctor
                            </p>
                            <p className="text-gray-500">
                              {
                                item.schedule.doctor
                                  .fullName
                              }
                            </p>
                          </div>
                          <div className="text-sm pl-2 border-l border-gray-300">
                            <p className="font-semibold text-blue-500 mb-2">
                              {item.schedule.hospital}
                            </p>
                            <p className="text-gray-500">
                              {item.schedule.location}
                            </p>
                            <p className="font-semibold text-blue-500">
                              {
                                item.schedule.doctor
                                  .specialization
                              }
                            </p>
                          </div>
                          <div className="text-sm pl-2 border-l border-gray-300">
                            <p className="font-semibold text-blue-500">
                              {item.schedule.date}
                            </p>
                            <p className="font-semibold text-blue-500">
                              {item.schedule.time}
                            </p>
                          </div>
                          <div className="flex items-center text-sm pl-2 border-l border-gray-300">
                            <div className="mr-4">
                              <p className="font-semibold text-green-500">
                                Rs{' '}
                                {item.schedule.bookingFee.toFixed(
                                  2,
                                )}{' '}
                                + Booking Fee
                              </p>
                              <p className="text-gray-500 ">
                                Channelling Fee
                              </p>
                            </div>
                          </div>
                          <div className="text-xs pl-2 border-l border-gray-300">
                            <Link
                              to="/appointmentupdate"
                              state={item}
                              className="p-2 mx-2 text-blue-500 border border-blue-500 rounded-lg"
                            >
                              Update
                            </Link>
                            <AlertDialog>
                              <AlertDialogTrigger className="p-2 mx-2 text-red-500 border border-red-500 rounded-lg">
                                Cancel
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-blue-500">
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be
                                    undone. This will
                                    permanently delete your
                                    Appointment.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="text-blue-500 hover:text-blue-600">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={async () => {
                                      await deleteAppointment(
                                        item._id,
                                      );
                                      refetch();
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600"
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAppointments;
