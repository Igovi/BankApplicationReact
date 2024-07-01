import React from 'react';
import Header from '../../components/Header';
import ExtractList from '../../components/ExtractList';

const ExtractPage = () => {
  return (
    <div className="client-page__container">
      <Header />
      <div className="client-page__content">
        <ExtractList />
      </div>
    </div>
  );
};

export default ExtractPage;
