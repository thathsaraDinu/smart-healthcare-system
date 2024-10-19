import { instance } from '@/hooks/use-axios';

// Save a new card
export const saveCard = async (data) => {
  console.log('DDDDDDDDDDDDDD', data);
  const response = await instance.post(
    '/api/card/cards',
    data,
  );
  return response.data;
};

// Get saved cards for a user
export const getSavedCards = async (userId) => {
  const response = await instance.get(
    `/api/card/cards/${userId}`,
  );
  return response.data;
};

// Update card details (if needed)
export const updateCard = async (cardId, data) => {
  const response = await instance.put(
    `/api/cards/${cardId}`,
    data,
  );
  return response.data;
};

// Delete a card by card ID
export const deleteCard = async (cardId) => {
  const response = await instance.delete(
    `/api/cards/${cardId}`,
  );
  return response.data;
};
