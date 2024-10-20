import { instance } from '@/hooks/use-axios';

// Get all promotions
export const getAllAppointments = async () => {
    try {
        const response = await instance.get(
          `api/report`,
        );
        
        return response.data;
    } catch (error) {
        console.error('Error fetching promotions:', error);
        throw error;
    }
};

// Get appointment stats
export const getAppointmentStats = async () => {
    try {
        const response = await instance.get(
            `api/report/stats`,
        );
        
        return response.data;
    } catch (error) {
        console.error(
            'Error fetching appointment stats:',
            error,
        );
        throw error;
    }
};

// Create a new promotion
export const createPromotion = async (promotionData) => {
    try {
        const response = await instance.post(
          `api/report`,
          promotionData,
        );
        return response.data;
    } catch (error) {
        console.error('Error creating promotion:', error);
        throw error;
    }
};
