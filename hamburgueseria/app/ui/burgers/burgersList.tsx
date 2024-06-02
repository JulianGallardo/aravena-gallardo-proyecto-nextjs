'use client'

import { Card } from '@/app/ui';
import { Category } from '@/prisma/generated/client';
import useFetchImages from '@/app/hooks/useFetchImages';

const BurgerList: React.FC = () => {

  const categories = Object.values(Category);
  const { burgers, imageUrls, error } = useFetchImages('/api/products/burgers');

  return (
    <div className='pt-16'>
      {burgers.length !==0 && categories.map((category) => (
        <ul id={category} key={category}>
          <h2 className="text-2xl font-bold text-darkblue dark:text-white m-4 text-center">{category}</h2>
          <div className="flex flex-wrap justify-center items-center">
            {burgers.map((burger, index) => (
              burger.category === category &&
              <li key={burger.burgerId} className="w-64 m-4">
                <Card
                  title={burger.name}
                  description={burger.description}
                  photoSrc={
                    imageUrls[index]
                  }
                  price={burger.price}
                  burgerId={burger.burgerId}
                />
              </li>
            ))}
          </div>
        </ul>
      ))}
      {
        burgers.length === 0 && (
          <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-darkblue dark:text-white">Cargando menu...</h1>
          </div>
        )
      }
    </div>
  );
};

export default BurgerList;
