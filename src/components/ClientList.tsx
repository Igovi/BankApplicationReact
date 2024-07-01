import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Spinner } from 'react-bootstrap';
import { createClient, deleteClient, editClient, getAllClients } from '../services/clientService';
import { Client } from '../interfaces/Client';


const ClientList: React.FC = () => {
  const [clientList, setClientList] = useState<Client[]>([]);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    email: '',
    age: 0,
    account_number: 0,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [removingClientId, setRemovingClientId] = useState<number | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const clients = await getAllClients();
      setClientList(clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { id, name, email, age, account_number } = formData;
    const data: Client = { id, name, email, age, account_number };

    if (isEditMode) {
      await handleEditClient(data);
    } else {
      await handleCreateClient(data);
    }
    clearForm();
  };

  const handleCreateClient = async (data: Client) => {
    try {
      const newClient = await createClient(data);
      setClientList((prev) => [...prev, newClient]);
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  const handleEditClient = async (data: Client) => {
    try {
      const updatedClient = await editClient(data.id, data);
      setClientList((prev) =>
        prev.map((client) => (client.id === data.id ? updatedClient : client))
      );
    } catch (error) {
      console.error('Error editing client:', error);
    }
  };

  const handleDeleteClient = async (id: number) => {
    setRemovingClientId(id); // Marca o cliente como sendo removido
    try {
      await deleteClient(id);
      setClientList((prev) => prev.filter((client) => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    } finally {
      setRemovingClientId(null); // Finaliza a marcação de remoção
    }
  };

  const edit = (client: Client) => {
    setFormData(client);
    setIsEditMode(true);
  };

  const clearForm = () => {
    setFormData({
      id: 0,
      name: '',
      email: '',
      age: 0,
      account_number: 0,
    });
    setIsEditMode(false);
  };

  return (
    <div className="client-list__container">
      <Table striped bordered hover className="client-list__content">
        <thead className="thead-dark">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Account Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientList.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.age}</td>
              <td>{client.account_number}</td>
              <td>
                {removingClientId === client.id ? (
                  <Spinner animation="border" variant="danger" size="sm" />
                ) : (
                  <>
                    <Button variant="primary" size="sm" className="me-2" onClick={() => edit(client)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClient(client.id)} disabled={removingClientId !== null}>
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Form onSubmit={onSubmit} className="bg-light p-4 rounded">
        <h3 className="mb-4">{isEditMode ? 'Edit client' : 'Add client'}</h3>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter client name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter client email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })} placeholder="Enter client age" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Account Number</Form.Label>
          <Form.Control type="number" value={formData.account_number} onChange={(e) => setFormData({ ...formData, account_number: Number(e.target.value) })} placeholder="Enter client account number" />
        </Form.Group>
        <div className="text-center">
          <Button variant="dark" className="me-2" onClick={clearForm}>
            Clear
          </Button>
          <Button variant="success" type="submit" className="ml-2">
            {isEditMode ? 'Update' : 'Submit'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ClientList;
