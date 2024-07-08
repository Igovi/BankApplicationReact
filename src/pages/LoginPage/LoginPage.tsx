import React, { FC, useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { z, ZodError } from 'zod';

interface LoginPageProps {
  setToken: (token: string) => void;
}

const LoginPage: FC<LoginPageProps> = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const schema = z.object({
    username: z.string().nonempty('Username is required'),
    password: z.string().min(3, 'Password must be at least 3 characters long'),
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/extracts');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      schema.parse({ username, password });

      const response = await axios.post('http://localhost:8080/autenticacao/login', {
        userName: username,
        password: password
      });

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/extracts');
      } else {
        setError('Erro ao fazer login.');
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors.map(err => err.message).join('\n');
        setError(message);
      } else {
        setError('Usuário ou senha incorretos.');
      }
    }
  };

  useEffect(() => {
    try {
      schema.parse({ username, password });
      setIsFormValid(true);
    } catch (error) {
      setIsFormValid(false);
    }
  }, [username, password, schema]);

  return (
    <div className="LoginPage">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
