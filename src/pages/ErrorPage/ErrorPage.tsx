import React, { FC } from 'react';
import './ErrorPage.css';
import Header from '../../components/Header';

interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = () => (
  <div className="error-page-container">
    <Header />
      <div className="error-page">
        <h1>Error 404</h1>
        <p>page not found</p>
      </div>
    </div>
);

export default ErrorPage;
