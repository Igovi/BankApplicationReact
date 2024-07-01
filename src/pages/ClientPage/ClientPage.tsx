import React from 'react';
import Header from '../../components/Header';
import ClientList from '../../components/ClientList';

const ClientPage = () => {
  return (
    <div className="client-page__container">
      <Header />
      <div className="client-page__content">
        <ClientList />
      </div>
    </div>
  );
};

export default ClientPage;
