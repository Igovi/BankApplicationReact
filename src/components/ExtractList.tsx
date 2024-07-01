import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

interface Transaction {
  id: number;
  clientId: number;
  type: string;
  amount: number;
  transactionDate: string;
}

const ExtractList: React.FC = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [formData, setFormData] = useState({ id: 0 });
  const [showTransactions, setShowTransactions] = useState(false);

  useEffect(() => {
    // Carregar os dados iniciais, se necessário
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/extract/client/${formData.id}`);
      setTransactionList(response.data.transactions);
      setTotal(response.data.total);
      setShowTransactions(true);
    } catch (error) {
      console.error(error);
      alert('Error fetching transactions');
    }
  };

  const clearForm = () => {
    setFormData({ id: 0 });
    setShowTransactions(false);
  };

  return (
    <div className="client-list__container">
      <Form onSubmit={onSubmit} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Client id</Form.Label>
          <Form.Control
            type="number"
            value={formData.id}
            onChange={(e) => setFormData({ id: Number(e.target.value) })}
            placeholder="Enter client id"
          />
        </Form.Group>
        <Button variant="dark" className="me-2" onClick={clearForm}>
          Clear
        </Button>
        <Button variant="success" type="submit" disabled={formData.id === 0}>
          Submit
        </Button>
      </Form>

      {showTransactions && (
        <div className="client-list__container">
          <Table striped bordered hover className="client-list__content">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Client Id</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
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
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Total: {total}</p>
        </div>
      )}
    </div>
  );
};

export default ExtractList;
