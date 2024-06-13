import React, { useState } from 'react';

const CardForm: React.FC = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    cardholderName: '',
    issuer: '',
    installments: '',
    identificationType: '',
    identificationNumber: '',
    cardholderEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form
      id="form-checkout"
      onSubmit={handleSubmit}
      className="flex flex-col max-w-lg"
    >
      <div
        id="form-checkout__cardNumber"
        className="container h-4 inline-block border border-gray-400 rounded-sm p-0.5"
      ></div>
      <div
        id="form-checkout__expirationDate"
        className="container h-4 inline-block border border-gray-400 rounded-sm p-0.5"
      ></div>
      <div
        id="form-checkout__securityCode"
        className="container h-4 inline-block border border-gray-400 rounded-sm p-0.5"
      ></div>
      <input
        type="text"
        id="form-checkout__cardholderName"
        value={formData.cardholderName}
        onChange={handleChange}
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
      <select
        id="form-checkout__issuer"
        value={formData.issuer}
        onChange={handleChange}
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      >
        {/* Add options here */}
      </select>
      <select
        id="form-checkout__installments"
        value={formData.installments}
        onChange={handleChange}
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      >
        {/* Add options here */}
      </select>
      <select
        id="form-checkout__identificationType"
        value={formData.identificationType}
        onChange={handleChange}
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      >
        {/* Add options here */}
      </select>
      <input
        type="text"
        id="form-checkout__identificationNumber"
        value={formData.identificationNumber}
        onChange={handleChange}
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />
      <input
        type="email"
        id="form-checkout__cardholderEmail"
        value={formData.cardholderEmail}
        onChange={handleChange}
        className="mb-2 p-1 border border-gray-400 rounded-sm"
      />

      <button
        type="submit"
        id="form-checkout__submit"
        className="mb-2 p-2 bg-blue-500 text-white rounded-sm"
      >
        Pagar
      </button>
      <progress value="0" className="progress-bar mb-2">
        Cargando...
      </progress>
    </form>
  );
};

export default CardForm;
