import React, { useState } from 'react';
import PaymentFormFields from './PaymentFormFields';

const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    transactionAmount: '',
    token: '',
    description: '',
    installments: '',
    paymentMethodId: '',
    issuer: '',
    email: '',
    identificationType: '',
    number: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': '<SOME_UNIQUE_VALUE>',
        },
        body: JSON.stringify({
          transaction_amount: parseFloat(formData.transactionAmount),
          token: formData.token,
          description: formData.description,
          installments: parseInt(formData.installments, 10),
          payment_method_id: formData.paymentMethodId,
          issuer_id: formData.issuer,
          payer: {
            email: formData.email,
            identification: {
              type: formData.identificationType,
              number: formData.number,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Payment response:', data);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col max-w-lg">
      <PaymentFormFields formData={formData} handleChange={handleChange} />
      <button
        type="submit"
        className="mb-2 p-2 bg-blue-500 text-white rounded-sm"
      >
        Pagar
      </button>
    </form>
  );
};

export default PaymentForm;
