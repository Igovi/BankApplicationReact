
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const fetchTransactions = async (clientId: any) => {
  try {
    const response = (clientId) ?  await axios.get(`${API_URL}/extract/client/${clientId}`):  await axios.get(`${API_URL}/extract/client`) ;
    return {
      transactions: response.data.transactions,
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};


