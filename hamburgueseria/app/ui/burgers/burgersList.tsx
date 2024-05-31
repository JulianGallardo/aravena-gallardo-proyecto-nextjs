'use client'

import { useEffect, useState } from 'react';
import { Card } from '@/app/ui';
import { getImageUrl } from '@/utils/cloudinaryUtils';
import { Category, Burger } from '@/prisma/generated/client';

const BurgerList: React.FC = () => {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Array para almacenar las URL de las imágenes

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

        // Obtener las URL de las imágenes para cada burger
        const urls: string[] = await Promise.all(data.body.map((burger: Burger) => getImageUrl(`${burger.burgerId}-${burger.name.replace(/\s/g, '')}`)));
        setImageUrls(urls);
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
            {burgers.map((burger, index) => (
              <li key={burger.burgerId} className="w-64 m-4">
                <Card
                  title={burger.name}
                  description={burger.description}
                  photoSrc={imageUrls[index]} // Obtener la URL de la imagen correspondiente
                  price={burger.price}
                  burgerId={burger.burgerId}
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
