import { Burger } from '@prisma/client';
import { useEffect, useState } from 'react';
import Card from '../shared/burgerInfoCard';

const BurgerList = () => {
  const [burgers, setBurgers] = useState<Burger[]>([]);

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const res = await fetch('/api/products/burgers');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setBurgers(data.body);
      } catch (error) {
        console.error('Error fetching burgers:', error);
      }
    };

    fetchBurgers();
  }, []);

  return (
    <div>
    <br />
    <br />
    <br />
      <ul>
        <div className="flex flex-wrap justify-center">
          {burgers.map((burger) => (
            <li key={burger.burgerId} className="mx-4 my-4">
              <Card
                title={burger.name}
                description={burger.description}
                photoSrc="/burger.jpg"
                price={burger.price}
              />
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default BurgerList;
