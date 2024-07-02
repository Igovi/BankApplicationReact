import axios from 'axios';
import { Client } from '../interfaces/Client';

const API_URL = 'http://localhost:8080/clients';

export const getAllClients = async (page = 0, size = 10, sortField = 'id', sortOrder = 'asc') => {
  const response = await axios.get(`${API_URL}?page=${page}&size=${size}&sortField=${sortField}&sortOrder=${sortOrder}`);
  return response.data;
};

export const createClient = async (client: Client) => {
  const response = await axios.post<Client>(API_URL, client);
  return response.data;
};

export const editClient = async (id: number, client: Client) => {
  const response = await axios.put<Client>(`${API_URL}/${id}`, client);
  return response.data;
};

export const deleteClient = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
