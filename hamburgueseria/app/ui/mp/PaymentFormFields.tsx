import React, { useState } from 'react';

interface PaymentFormFieldsProps {
  formData: {
    transactionAmount: string;
    token: string;
    description: string;
    installments: string;
    paymentMethodId: string;
    issuer: string;
    email: string;
    identificationType: string;
    number: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
const PaymentFormFields: React.FC<PaymentFormFieldsProps> = ({ formData, handleChange }) => {
  return (
    <>
      <input
        type="text"
        name="transactionAmount"
        value={formData.transactionAmount}
        onChange={handleChange}
        placeholder="Transaction Amount"
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
      <input
        type="text"
        name="token"
        value={formData.token}
        onChange={handleChange}
        placeholder="Token"
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
      <input
        type="number"
        name="installments"
        value={formData.installments}
        onChange={handleChange}
        placeholder="Installments"
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
      <input
        type="text"
        name="paymentMethodId"
        value={formData.paymentMethodId}
        onChange={handleChange}
        placeholder="Payment Method ID"
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
      <input
        type="text"
        name="issuer"
        value={formData.issuer}
        onChange={handleChange}
        placeholder="Issuer ID"
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
      <input
        type="text"
        name="identificationType"
        value={formData.identificationType}
        onChange={handleChange}
        placeholder="Identification Type"
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
      <input
        type="text"
        name="number"
        value={formData.number}
        onChange={handleChange}
        placeholder="Identification Number"
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
    </>
  );
};

export default PaymentFormFields;
