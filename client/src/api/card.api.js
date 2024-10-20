import { instance } from '@/hooks/use-axios';

// Save a new card
// This function sends a POST request to save a new card with the provided data.
export const saveCard = async (data) => {
  const response = await instance.post(
    '/api/card/cards',
    data,
  );
  return response.data;
};

// Get saved cards for a user
// This function sends a GET request to retrieve all saved cards for a specific user by their userId.
export const getSavedCards = async (userId) => {
  const response = await instance.get(
    `/api/card/cards/${userId}`,
  );
  return response.data;
};

// Update card details (if needed)
// This function sends a PUT request to update the details of a specific card identified by cardId with the provided data.
export const updateCard = async (cardId, data) => {
  const response = await instance.put(
    `/api/cards/${cardId}`,
    data,
  );
  return response.data;
};

// Delete a card by card ID
// This function sends a DELETE request to remove a specific card identified by cardId.
export const deleteCard = async (cardId) => {
  const response = await instance.delete(
    `/api/card/cards/${cardId}`,
  );
  return response.data;
};
