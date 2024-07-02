import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Spinner, Alert, Pagination } from 'react-bootstrap';
import { getAllClients, createClient, editClient, deleteClient } from '../services/clientService';
import { z, ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Client } from '../interfaces/Client';

const clientSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  age: z.number().min(1, { message: 'Age must be at least 1' }),
  account_number: z.string().min(1, { message: 'Account number must be at least 1 characters long' }),
});

const ClientList: React.FC = () => {
  const [clientList, setClientList] = useState<Client[]>([]);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    email: '',
    age: 0,
    account_number: '0',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [removingClientId, setRemovingClientId] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients(currentPage,sortField,sortOrder);
  }, [currentPage,sortField,sortOrder]);

  const fetchClients = async (page: number,sortField?:string,sortOrder?:string) => {
    try {
      const response = await getAllClients(page, 5, sortField, sortOrder);
      setClientList(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const validatedData = clientSchema.parse(formData);
      if (isEditMode) {
        await handleEditClient(formData.id, validatedData as Client);
      } else {
        await handleCreateClient(validatedData as Client);
      }
      clearForm();
      fetchClients(currentPage);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => err.message);
        setValidationErrors(errors);
      } else {
        console.error('Validation error:', error);
      }
    }
  };

  const handleCreateClient = async (data: Client) => {
    try {
      await createClient(data);
      fetchClients(currentPage);
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  const handleEditClient = async (id: number, data: Client) => {
    try {
      await editClient(id, data);
      fetchClients(currentPage);
    } catch (error) {
      console.error('Error editing client:', error);
    }
  };

  const handleDeleteClient = async (id: number) => {
    setRemovingClientId(id);
    try {
      await deleteClient(id);
      fetchClients(currentPage);
    } catch (error) {
      console.error('Error deleting client:', error);
    } finally {
      setRemovingClientId(null);
    }
  };

  const edit = (client: Client) => {
    setFormData(client);
    setIsEditMode(true);
  };

  const goToExtractPage = (clientId: number) => {
    navigate(`/extracts/${clientId}`);
  };

  const clearForm = () => {
    setFormData({
      id: 0,
      name: '',
      email: '',
      age: 0,
      account_number: '0',
    });
    setIsEditMode(false);
    setValidationErrors([]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (field: string) => {
    setSortField(field);
    fetchClients(currentPage,field);
  };
  
  

  return (
    <div className="client-list__container">
      <Form className="mb-3">
        <Form.Group controlId="sortField">
          <Form.Label>Sort By:</Form.Label>
          <Form.Control as="select" value={sortField} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="id">Id</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="age">Age</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="sortOrder">
        <Form.Label>Sort Order:</Form.Label>
        <Form.Control as="select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Form.Control>
      </Form.Group>
      </Form>
      

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
                    <Button className="me-2" variant="info" size="sm" onClick={() => goToExtractPage(client.id)}>
                      Extract
                    </Button>
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

      <Pagination>
        {[...Array(totalPages)].map((_, pageIndex) => (
          <Pagination.Item key={pageIndex} active={pageIndex === currentPage} onClick={() => handlePageChange(pageIndex)}>
            {pageIndex + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Form onSubmit={onSubmit} className="bg-light p-4 rounded">
        <h3 className="mb-4">{isEditMode ? 'Edit client' : 'Add client'}</h3>

        {/* Exibir erros de validação */}
        {validationErrors.length > 0 && (
          <Alert variant="danger">
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}

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
          <Form.Control type="number" value={formData.account_number} onChange={(e) => setFormData({ ...formData, account_number: e.target.value })} placeholder="Enter client account number" />
        </Form.Group>
        <div className="text-center">
          <Button variant="dark" className="me-2" onClick={clearForm}>
            Clear
          </Button>
          <Button variant="success" type="submit" className="ml-2" disabled={formData.name.length === 0 || formData.email.length === 0 || formData.age === 0 || formData.account_number === '0'}>
            {isEditMode ? 'Update' : 'Submit'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ClientList;
