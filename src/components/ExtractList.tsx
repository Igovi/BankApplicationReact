import React, { useState, useEffect } from 'react';
import { Table, Form, Button , Alert} from 'react-bootstrap';
import { Transaction } from '../interfaces/Transaction';
import { useParams } from 'react-router-dom';
import { fetchTransactions } from '../services/extractService';

const ExtractList: React.FC = () => {
  const { clientId } = useParams<{ clientId?: string }>(); 
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [formData, setFormData] = useState({ id: clientId ? parseInt(clientId, 10) : 0 }); 
  const [showTransactions, setShowTransactions] = useState(false);
  const [noTransactionsFound, setNoTransactionsFound] = useState(false);

  useEffect(() => {
    if (clientId && !showTransactions && formData.id !== 0) {
      fetchExtract(clientId);
    }
  }, [clientId, showTransactions, formData.id]);

  const fetchExtract = async (id: string) => {
    setNoTransactionsFound(false)
    try {
      const response = await fetchTransactions(id);
      setTransactionList(response.transactions);
      setTotal(response.total);
      setShowTransactions(true);
    } catch (error) {
      setShowTransactions(false);
      setNoTransactionsFound(true)
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNoTransactionsFound(false)
    try {
      const response = await fetchTransactions(formData.id);
      setTransactionList(response.transactions);
      setTotal(response.total);
      setShowTransactions(true);
    } catch (error) {
      setShowTransactions(false);
      setNoTransactionsFound(true)
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

      {noTransactionsFound && (
        <Alert variant="warning">
          No transactions found for the given client ID.
        </Alert>
      )}

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
                  <td>R$ {transaction.amount.toFixed(2)}</td>
                  <td>{transaction.transactionDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Total: R$ {total.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default ExtractList;
