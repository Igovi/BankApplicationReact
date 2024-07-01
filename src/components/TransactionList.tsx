import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

interface Transaction {
  id: number;
  clientId: number;
  type: string;
  amount: number;
  transactionDate: string;
}

const TransactionList: React.FC = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [formData, setFormData] = useState({
    clientId: 0,
    type: 'debit',
    amount: 0,
  });
  const [removingTransactionId, setRemovingTransactionId] = useState<number | null>(null);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    try {
      const response = await axios.get<Transaction[]>('/transactions');
      setTransactionList(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching transactions');
    }
  };

  const clearForm = () => {
    setFormData({
      clientId: 0,
      type: 'debit',
      amount: 0,
    });
  };

  const deleteTransaction = async (id: number) => {
    setRemovingTransactionId(id); // Marca a transação como sendo removida
    try {
      await axios.delete(`/transactions/${id}`);
      setTransactionList((prev) => prev.filter((transaction) => transaction.id !== id));
      alert('Transaction deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Error deleting transaction');
    } finally {
      setRemovingTransactionId(null); // Finaliza a marcação de remoção
    }
  };

  const submit = async () => {
    const currentDate = new Date().toISOString();
    const body = {
      clientId: formData.clientId,
      type: formData.type.toLowerCase(),
      amount: formData.amount,
      transactionDate: currentDate,
    };

    try {
      const response = await axios.post<Transaction>('/transactions', body);
      setTransactionList((prev) => [...prev, response.data]);
      clearForm();
      alert('Transaction created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating transaction');
    }
  };

  return (
    <div className="transaction-list__container">
      <Table striped bordered hover className="transaction-list__content">
        <thead className="thead-dark">
          <tr>
            <th>Id</th>
            <th>Client Id</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionList.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.clientId}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionDate}</td>
              <td>
                {removingTransactionId === transaction.id ? (
                  <Spinner animation="border" variant="danger" size="sm" />
                ) : (
                  <Button
                    variant="danger"
                    size="sm"
                    className="ml-1"
                    onClick={() => deleteTransaction(transaction.id)}
                    disabled={removingTransactionId !== null}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="mt-5 col-lg-4">
        <Form className="bg-light p-4 rounded">
          <h3 className="mb-4">Add transaction</h3>
          <Form.Group className="mb-3">
            <Form.Label>Client Id</Form.Label>
            <Form.Control
              type="number"
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: Number(e.target.value) })}
              placeholder="Enter client id"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              name="type"
              id="type"
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              placeholder="Enter amount"
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="dark" className="me-2" onClick={clearForm}>
              Clear
            </Button>
            <Button variant="success" type="button" onClick={submit} disabled={formData.clientId === 0 || formData.amount === 0}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default TransactionList;
