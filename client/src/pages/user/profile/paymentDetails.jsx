import React, { useEffect, useState } from 'react';
import { getSavedCards, deleteCard } from '@/api/card.api'; // Ensure the path is correct
import { useAuthStore } from '@/store/auth-store'; // Assuming you have this for user ID

function PaymentDetails() {
    const [savedCards, setSavedCards] = useState([]); // State to hold saved cards
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const userId = useAuthStore((state) => state.id); // Get user ID from your auth store

    useEffect(() => {
        // Function to fetch saved cards from the API
        const fetchSavedCards = async () => {
            try {
                const response = await getSavedCards(userId); // Fetch saved cards
                setSavedCards(response.cards); // Assuming your response contains a 'cards' array
            } catch (error) {
                console.error('Error fetching saved cards:', error); // Log any errors
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchSavedCards(); // Call the function to fetch cards
    }, [userId]); // Dependency on userId

    // Function to handle card deletion
    const handleDeleteCard = async (cardId) => {
        if (confirm('Are you sure you want to delete this card?')) { // Confirmation before deleting
            try {
                await deleteCard(cardId); // Call the API to delete the card
                setSavedCards(savedCards.filter((card) => card._id !== cardId)); // Update the state to remove the deleted card
            } catch (error) {
                console.error('Error deleting card:', error); // Log any errors
            }
        }
    };

    // Show loading state while fetching data
    if (isLoading) {
        return <div className="text-center">Loading saved card details...</div>; // Loading state
    }

    return (
        <section className="lg:container my-10 px-4">
            <h2 className="font-bold text-2xl mb-5 text-gray-800">Saved Card Details</h2>
            {savedCards.length === 0 ? (
                <p className="text-center text-gray-600">No saved cards found.</p> // Message when no cards are found
            ) : (
                <ul className="space-y-4">
                    {savedCards.map((card) => (
                        <li key={card._id} className="p-5 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 relative">
                            <p className="font-semibold text-gray-700">Card Name: {card.cardname}</p>
                            <p className="text-gray-700">Cardholder Name: {card.cardholderName}</p>
                            <p className="text-gray-600">Card Number: **** **** **** {card.cardNumber.slice(-4)}</p>
                            <p className="text-gray-600">Expiry Date: {card.expiry}</p>
                            <button
                                onClick={() => handleDeleteCard(card._id)} // Call the delete handler
                                className="absolute bottom-4 right-4 p-2 text-white bg-red-500 hover:bg-red-800 rounded-lg transition-all duration-300"
                            >
                                Delete Card
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default PaymentDetails;
