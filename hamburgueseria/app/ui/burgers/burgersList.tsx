'use client'

import { Burger, Category } from '@/prisma/generated/client';
import { useEffect, useState } from 'react';
import { Card } from '@/app/ui';

const BurgerList: React.FC = () => {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const categories = Object.values(Category);
  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const res = await fetch('/api/products/burgers', {
          cache: 'no-cache'
        });
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
    <div className='pt-16'>
      {categories.map((category) => (
        <ul id={category} key={category}>
          <h2 className="text-2xl font-bold text-darkblue m-4 text-center">{category}</h2>
          <div className="flex flex-wrap justify-center items-center">
            {burgers.map((burger) => (
              <li key={burger.burgerId} className="mx-4 my-4">
                <Card
                  title={burger.name}
                  description={burger.description}
                  photoSrc={`/${burger.name.replace(/\s/g, '')}.jpg`}
                  price={burger.price}
                />
              </li>
            ))}
          </div>
        </ul>
      ))}
    </div>
  );
};

export default BurgerList;
