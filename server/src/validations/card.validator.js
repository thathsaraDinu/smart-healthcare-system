// Function to validate card details
export const validateCard = (data) => {
    // Destructure the required fields from the data object
    const { userId, cardholderName, cardNumber, expiry, cvv, cardname } = data;

    // Check if any of the required fields are missing
    if (!userId || !cardholderName || !cardNumber || !expiry || !cvv || !cardname) {
        // Throw an error if any field is missing
        throw new Error('All fields are required');
    }
};
