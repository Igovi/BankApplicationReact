import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Transaction } from '../interfaces/Transaction';
import { getAllTransactions, createTransaction, deleteTransaction } from '../services/transactionService';
import { z } from 'zod';

const TransactionList: React.FC = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [formData, setFormData] = useState({
    clientId: 0,
    type: 'debit',
    amount: 0,
  });
  const [removingTransactionId, setRemovingTransactionId] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  const fetchAllTransactions = async () => {
    try {
      const transactions = await getAllTransactions();
      setTransactionList(transactions);
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
    setValidationErrors([]);
  };

  const handleDeleteTransaction = async (id: number) => {
    setRemovingTransactionId(id); 
    try {
      await deleteTransaction(id);
      setTransactionList((prev) => prev.filter((transaction) => transaction.id !== id));
      alert('Transaction deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Error deleting transaction');
    } finally {
      setRemovingTransactionId(null); 
    }
  };

  const handleSubmit = async () => {
    const currentDate = new Date().toISOString();
    const transaction = {
      clientId: formData.clientId,
      type: formData.type.toLowerCase(),
      amount: formData.amount,
      transactionDate: currentDate,
    };

    try {
      const transactionSchema = z.object({
        clientId: z.number().min(1, { message: 'Client Id must be greater than or equal to 1 ' }),
        type: z.enum(['debit', 'credit']),
        amount: z.number().min(0.01, { message: 'Amount must be greater than 0,01' }),
      });

      transactionSchema.parse(transaction); 

      const createdTransaction = await createTransaction(transaction as Transaction);
      setTransactionList((prev) => [...prev, createdTransaction]);
      clearForm();
      alert('Transaction created successfully');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => err.message);
        setValidationErrors(errors);
      } else {
        console.error(error);
        alert('Error creating transaction');
      }
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
              <td>R$ {transaction.amount.toFixed(2)}</td>
              <td>{transaction.transactionDate}</td>
              <td>
                {removingTransactionId === transaction.id ? (
                  <Spinner animation="border" variant="danger" size="sm" />
                ) : (
                  <Button
                    variant="danger"
                    size="sm"
                    className="ml-1"
                    onClick={() => handleDeleteTransaction(transaction.id)}
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
            <Button
              variant="success"
              type="button"
              onClick={handleSubmit}
              disabled={formData.clientId === 0 || formData.amount === 0}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default TransactionList;