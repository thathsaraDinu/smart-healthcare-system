import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Paymentpage = () => {
  const navigate = useNavigate();
  const loc = useLocation();

  console.log(loc.state);
  const {
    doctor,
    hospital,
    location,
    bookingFee,
    date,
    time,
  } = loc.state.schedule || {};

  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [area, setArea] = useState('');
  const [nic, setNic] = useState('');

  const [paymentMethod, setPaymentMethod] = useState(''); // For selecting payment method
  const [cashAmount, setCashAmount] = useState(''); // For cash payments
  const [cardDetails, setCardDetails] = useState({ // For card payments
    cardholdername: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const totalFee = bookingFee + 600 + 199;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      patientName,
      email,
      phoneNumber,
      area,
      nic,
      schedule: {
        doctor: {
          fullName: doctor?.fullName,
          gender: doctor?.gender,
          specialization: doctor?.specialization,
        },
        hospital,
        location,
        bookingFee,
        date,
        time,
      },
      paymentMethod,
      cashAmount: paymentMethod === 'cash' ? cashAmount : null,
      cardDetails: paymentMethod === 'card' ? cardDetails : null,
    };

    console.log('Appointment Data:', appointmentData);
    // Send the data to the backend here
  };

  const handleCashAmountChange = (e) => {
    setCashAmount(e.target.value);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                  <div>
                    <div className="font-medium text-sm">
                      {hospital}
                    </div>
                    <div className="text-sm text-gray-500">
                      {location}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-sm xl:text-xs 2xl:text-sm">
                      Doctor
                    </div>
                    <div className="font-medium text-xs mt-1">
                      {doctor.fullName}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-sm xl:text-xs 2xl:text-sm">
                      Session date
                    </div>
                    <div className="font-medium text-xs mt-1">
                      {date}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-sm xl:text-xs 2xl:text-sm">
                      Session time
                    </div>
                    <div className="font-medium text-xs mt-1">
                      {time}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-sm xl:text-xs 2xl:text-sm">
                      Appointment no
                    </div>
                    <div className="font-medium text-xs mt-1">
                      1
                    </div>
                  </div>
                  <div className="text-xs mt-4 text-gray-500">
                    Your estimated appointment time is{' '}
                    <span className="text-blue-500 font-medium">
                      {time}
                    </span>
                    . This time is depending on the time
                    spend with patients ahead of you
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:col-span-3">
              <div className="mb-4">
                <div className="font-semibold text-blue-500 mb-1">Select Payment Method</div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      className="form-radio"
                      onChange={() => setPaymentMethod('card')}
                    />
                    <span className="text-sm">Card</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      className="form-radio"
                      onChange={() => setPaymentMethod('cash')}
                    />
                    <span className="text-sm">Cash</span>
                  </label>
                </div>
              </div>

              {/* Conditional UI based on payment method */}
              {paymentMethod === 'cash' && (
                <div className="mt-5">
                  <label className="block font-medium mb-2">Enter Cash Amount</label>
                  <input
                    type="number"
                    value={cashAmount}
                    onChange={handleCashAmountChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <div className="mt-2">
                    <div className="font-medium">Balance:</div>
                    <div className="text-red-600">
                      {cashAmount && cashAmount >= totalFee
                        ? `Rs ${(cashAmount - totalFee).toFixed(2)}`
                        : 'Insufficient Cash'}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (


                <div className="mt-5">
                  <div>
                    <label className="block font-medium mb-2">Card Holder Name</label>
                    <input
                      type="text"
                      name="cardholdername"
                      value={cardDetails.cardholdername}
                      onChange={handleCardDetailsChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardDetailsChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardDetailsChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
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
                      <div className="font-semibold text-sm xl:text-xs 2xl:text-sm ">
                        Rs {bookingFee.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs 2xl:text-sm">
                        Hospital fee
                      </div>
                      <div className="font-semibold text-sm xl:text-xs 2xl:text-sm ">
                        Rs 600.00
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs 2xl:text-sm">
                        eChannelling fee
                      </div>
                      <div className="font-semibold text-sm xl:text-xs 2xl:text-sm ">
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
                      <div className="font-semibold text-sm xl:text-xs 2xl:text-sm ">
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
                      {(bookingFee + 600 + 199).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-7 py-1.5 text-sm bg-blue-500 text-white px-2 py-1.5 md:py-3 mt-auto rounded-xl text-sm group border border-blue-500"
              >
                <div className="flex justify-center items-center group-hover:gap-3">
                  <div className="mr-3 group-hover:mr-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-4 text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center capitalize gap-3 whitespace-nowrap">
                    Pay
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
          </form >
        </div >
      </section >
    </>
  );
};

export default Paymentpage;


