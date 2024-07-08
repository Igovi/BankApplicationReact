import axios from 'axios';
import { Transaction } from '../interfaces/Transaction';

const API_URL = 'http://localhost:8080/transactions';

export const getAllTransactions = async (page = 0 , size = 5) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
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
