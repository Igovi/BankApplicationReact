import axios from 'axios';
import { Transaction } from '../interfaces/Transaction';

const API_URL = 'http://localhost:8080/transactions';

export const getAllTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get<Transaction[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; // Você pode optar por tratar o erro aqui ou relançá-lo para ser tratado onde a função é chamada
  }
};

export const createTransaction = async (transaction: Transaction): Promise<Transaction> => {
  try {
    const response = await axios.post<Transaction>(API_URL, transaction);
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};
