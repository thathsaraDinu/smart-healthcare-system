import React, { useEffect, useState } from 'react';
import { getPaidAppointments } from '@/api/appointment.api.js'; // Adjust this import based on your file structure

function PaidAppointments() {
    const [appointments, setAppointments] = useState([]); // Initializing with an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaidAppointments = async () => {
            try {
                setLoading(true);
                const response = await getPaidAppointments(); // Fetching paid appointments from your API

                // Check if response is an array
                if (Array.isArray(response)) {
                    setAppointments(response); // Assign the appointments array directly
                } else {
                    // Handle unexpected response structure
                    throw new Error('Response is not an array');
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPaidAppointments();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>; // Show loading state
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen">Error fetching appointments: {error.message}</div>; // Show error message
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Paid Appointments</h1>
            {appointments.length === 0 ? (
                <div className="text-center text-gray-600">No paid appointments found.</div> // Handle no appointments case
            ) : (
                <ul className="space-y-4">
                    {appointments.map((appointment) => (
                        <li key={appointment._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                            <p className="text-gray-700">Appointment Number: <span className="font-semibold">{appointment.appointmentNumber}</span></p>
                            <p className="text-gray-700">Doctor: <span className="font-semibold">{appointment.schedule.doctor.fullName}</span></p>
                            <p className="text-gray-700">Date: <span className="font-semibold">{new Date(appointment.schedule.date).toLocaleDateString()}</span></p>
                            {/* Add other relevant details here */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PaidAppointments;
