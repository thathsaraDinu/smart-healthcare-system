import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveCard, getSavedCards } from '@/api/card.api'; // Assuming you have your card API ready
import { updateAppointment } from '@/api/appointment.api';
import { useAuthStore } from '@/store/auth-store';
import jsPDF from 'jspdf';

const Paymentpage = () => {
  const navigate = useNavigate();
  const loc = useLocation();

  const userId = useAuthStore((state) => state.id);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // For showing popup
  const [enteredCardName, setEnteredCardName] = useState(''); // For storing entered card name
  const [savedCards, setSavedCards] = useState([]); // Store user's saved cards
  const [selectedCard, setSelectedCard] = useState(null); // Store selected saved card

  const {
    doctor,
    hospital,
    location,
    bookingFee,
    date,
    time,
  } = loc.state.schedule || {};

  // Set default payment method to "card"
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cashAmount, setCashAmount] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardname: '',
    cardholdername: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [saveCardInfo, setSaveCardInfo] = useState(false); // Checkbox for saving card details
  const totalFee = bookingFee + 600 + 199;

  // Fetch saved cards on component load
  useEffect(() => {
    const fetchSavedCards = async () => {
      try {
        const response = await getSavedCards(userId);
        const cards = response.cards;
        setSavedCards(cards);
      } catch (error) {
        console.error('Error fetching saved cards:', error);
      }
    };

    fetchSavedCards();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if it's a card payment and all required card details are filled
    if (paymentMethod === 'card') {
      if (
        !cardDetails.cardholdername ||
        !cardDetails.cardNumber ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      ) {
        alert('Please fill in all card details.');
        return;
      }

      // If save card is checked, show the popup for entering card name
      if (saveCardInfo) {
        setIsPopupVisible(true);
        return;
      }

      // Proceed with payment process if no popup is required
      processPayment();
    }

    if (paymentMethod === 'cash') {
      if (cashAmount < totalFee) {
        alert('Insufficient cash amount.');
        return;
      }

      // If cash amount is enough, proceed with payment
      processPayment();
    }
  };

  const processPayment = async () => {
    // Save card details if "save card details" is checked and card name has been provided
    if (saveCardInfo && enteredCardName) {
      try {
        const cardData = {
          appointmentId: loc.state._id,
          userId: userId,
          paymentMethod: paymentMethod,
          cardholderName: cardDetails.cardholdername,
          cardNumber: cardDetails.cardNumber,
          expiry: cardDetails.expiry,
          cvv: cardDetails.cvv,
          totalFee: totalFee,
          cardname: enteredCardName,
        };

        console.log('Card Data:', cardData);
        const savedCardResponse = await saveCard(cardData);
        console.log(savedCardResponse);
      } catch (error) {
        console.error('Error saving card details:', error);
      }
    }

    try {
      await updateAppointment(loc.state._id, { ispaid: true });
      console.log("Appointment payment status updated");
      alert('Payment successful!');
      generatePDFReport();
      navigate('/myAppointments'); // Redirect to appointments page after payment
    } catch (error) {
      console.error('Error updating appointment payment status:', error);
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();

    // Set the background color for the header
    doc.setFillColor(173, 216, 230); // Light blue color
    doc.rect(0, 0, 210, 20, 'F'); // Fill the rectangle for the header

    // Add title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text('Appointment Details', 14, 15);

    // Set font size and color for details
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50); // Dark gray for details

    // Add appointment details
    doc.text(`Doctor: ${doctor.fullName}`, 14, 30);
    doc.text(`Hospital: ${hospital}`, 14, 40);
    doc.text(`Location: ${location}`, 14, 50);
    doc.text(`Date: ${date}`, 14, 60);
    doc.text(`Time: ${time}`, 14, 70);
    doc.text(`Payment Method: ${paymentMethod}`, 14, 80);

    // Add a line separator
    doc.setDrawColor(173, 216, 230); // Light blue for line
    doc.line(14, 85, 196, 85); // Horizontal line

    // Payment breakdown title
    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204); // Blue color for section title
    doc.text('Payment Breakdown:', 14, 100);

    // Reset font size and color for payment details
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50); // Dark gray for payment details

    // Payment breakdown details
    doc.text(`Doctor Fee: Rs ${bookingFee.toFixed(2)}`, 14, 110);
    doc.text(`Hospital Fee: Rs 600.00`, 14, 120);
    doc.text(`eChannelling Fee: Rs 199.00`, 14, 130);
    doc.text(`Total Fee: Rs ${totalFee.toFixed(2)}`, 14, 140);

    // Save the PDF
    doc.save('appointment_report.pdf');
  };


  // Autofill card details when a saved card is selected
  const handleSelectSavedCard = (card) => {
    setSelectedCard(card);
    setCardDetails({
      cardholdername: card.cardholderName,
      cardNumber: card.cardNumber,
      expiry: card.expiry,
      cvv: '***', // Hide CVV for security reasons
    });
    setSaveCardInfo(false); // Uncheck save card info checkbox
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

  const handleSaveCardChange = (e) => {
    setSaveCardInfo(e.target.checked); // Handle the checkbox for saving card
  };

  const handleConfirmCardName = () => {
    if (!enteredCardName) {
      alert('Please enter a card name.');
      return;
    }
    setIsPopupVisible(false); // Close the popup
    processPayment(); // Proceed with payment
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

            <div className="xl:col-span-3 ml-2 mr-2">
              <div className="mb-4">
                <div className="font-semibold text-blue-500 mb-1">Select Payment Method</div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      className="form-radio"
                      checked={paymentMethod === 'card'}
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

              {/* Display saved cards */}
              {paymentMethod === 'card' && savedCards.length > 0 && (
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Select a saved card</label>
                  <select
                    onChange={(e) => handleSelectSavedCard(savedCards.find(card => card.cardname === e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">-- Select a Card --</option>
                    {savedCards.map((card) => (
                      <option key={card._id} value={card.cardname}>
                        {card.cardname}
                      </option>
                    ))}
                  </select>
                </div>
              )}

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
                      className={`w-full border ${cardDetails.cardholdername ? 'border-gray-300' : 'border-red-500'} rounded px-3 py-2`}
                      placeholder="Enter your name as on the card"
                      required
                    />
                    {!cardDetails.cardholdername && (
                      <span className="text-red-500 text-sm">Card holder name is required.</span>
                    )}

                    <label className="block font-medium mb-2 mt-3">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardDetailsChange}
                      className={`w-full border ${/^\d{16}$/.test(cardDetails.cardNumber) ? 'border-gray-300' : 'border-red-500'} rounded px-3 py-2`}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    {cardDetails.cardNumber && !/^\d{16}$/.test(cardDetails.cardNumber) && (
                      <span className="text-red-500 text-sm">Invalid card number. Must be 16 digits.</span>
                    )}

                    <div className="flex space-x-4 mt-3">
                      <div className="flex-1">
                        <label className="block font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardDetailsChange}
                          className={`w-full border ${/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry) ? 'border-gray-300' : 'border-red-500'} rounded px-3 py-2`}
                          placeholder="MM/YY"
                          required
                        />
                        {cardDetails.expiry && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry) && (
                          <span className="text-red-500 text-sm">Invalid expiry date. Format MM/YY.</span>
                        )}
                      </div>

                      <div className="flex-1">
                        <label className="block font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardDetailsChange}
                          className={`w-full border ${selectedCard || /^\d{3}$/.test(cardDetails.cvv) ? 'border-gray-300' : 'border-red-500'} rounded px-3 py-2`}
                          placeholder="123"
                          required
                        />
                        {cardDetails.cvv && !selectedCard && !/^\d{3}$/.test(cardDetails.cvv) && (
                          <span className="text-red-500 text-sm">Invalid CVV. Must be 3 digits.</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Conditionally render the save card checkbox */}
                  {!selectedCard && (
                    <div className="mt-5 flex items-center">
                      <input
                        type="checkbox"
                        checked={saveCardInfo}
                        onChange={handleSaveCardChange}
                        className="form-checkbox"
                      />
                      <label className="ml-2 text-sm">Save card details for future use</label>
                    </div>
                  )}
                </div>
              )}

            </div>
            <div>

              {/* Add Popup for entering card name */}
              {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-5 rounded-md shadow-lg">
                    <h3 className="mb-4 text-lg font-semibold">Enter Card Name</h3>
                    <input
                      type="text"
                      value={enteredCardName}
                      onChange={(e) =>
                        setEnteredCardName(e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                      placeholder="Enter a name for this card"
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleConfirmCardName}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsPopupVisible(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
          </form>
        </div>
      </section>
    </>
  );
};

export default Paymentpage;
