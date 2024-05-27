import { Burger } from '@prisma/client';
import { useEffect, useState } from 'react';

const BurgerList = () => {
  const [burgers, setBurgers] = useState<Burger[]>([]);

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const response = await fetch('/api/products/burgers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBurgers(data);
      } catch (error) {
        console.error('Error fetching burgers:', error);
      }
    };

    fetchBurgers();
  }, []);

  return (
    <div>
      <h1>Burger List</h1>
      <ul>
        {burgers.map((burger) => (
          <li key={burger.burgerId}>
            <h2>{burger.name}</h2>
            <p>{burger.description}</p>
            <p>Price: ${burger.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BurgerList;
