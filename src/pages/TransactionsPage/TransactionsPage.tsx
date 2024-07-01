import React from 'react';
import Header from '../../components/Header';
import TransactionList from '../../components/TransactionList';

const TransactionPage = () => {
  return (
    <div className="client-page__container">
      <Header />
      <div className="client-page__content">
        <TransactionList />
      </div>
    </div>
  );
};

export default TransactionPage;
