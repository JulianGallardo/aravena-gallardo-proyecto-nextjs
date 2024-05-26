import { useState } from 'react';

export default function ConfirmOrderButton({ clientId, products, paymentMethod }: { clientId: number, products: any[], paymentMethod: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleConfirmOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/orders/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, products, paymentMethod }),
      });

      if (!response.ok) {
        throw new Error('Error confirmando la orden');
      }

      const data = await response.json();
      setSuccess(true);
      console.log('Orden confirmada:', data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleConfirmOrder} disabled={loading}>
      {loading ? 'Confirmando...' : 'Orden confirmada'}
    </button>
  );
}
