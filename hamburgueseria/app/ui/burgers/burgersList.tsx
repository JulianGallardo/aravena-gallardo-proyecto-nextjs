'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/app/ui';
import { getImageUrl } from '@/utils/cloudinaryUtils';
import { Category, Burger } from '@/prisma/generated/client';
import { PromoExtendida } from '@/lib/definitions';

const BurgerList: React.FC = () => {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [promos, setPromos] = useState<PromoExtendida[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Array para almacenar las URL de las imágenes

  const categories = Object.values(Category);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products/burgers', {
          cache: 'reload',
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json().then((data) => data.body);
        setBurgers(data);

        const resPromos = await fetch('/api/products/promos', {
          cache: 'reload',
        });
        if (!resPromos.ok) {
          throw new Error('Network response was not ok');
        }
        const dataPromos = await resPromos.json().then((data) => data.body);
        setPromos(dataPromos);

        // Obtener las URL de las imágenes para cada producto
        const urls: string[] = await Promise.all(
          [...data, ...dataPromos].map((product: any) =>
            getImageUrl(`${product.burgerId || product.promoId}-${product.name.replace(/\s/g, '')}`)
          )
        );
        setImageUrls(urls);
        console.log('promos',dataPromos)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col pt-16 px-4 items-center md:px-36 md:items-stretch">
      {burgers.length !== 0 && promos.length !== 0 &&
        categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-darkblue dark:text-white mb-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {burgers.map(
                (burger) =>
                  burger.category === category && (
                    <Card
                      key={burger.burgerId}
                      title={burger.name}
                      description={burger.description}
                      photoSrc={burger.imageUrl} // Obtener la URL de la imagen correspondiente
                      price={burger.price}
                      burgerId={burger.burgerId}
                    />
                  )
              )}
              {category==Category.PROMO &&promos.map(
                (promo) =>
                    <Card
                      key={promo.promoId}
                      title={promo.name}
                      description={promo.description}
                      photoSrc={promo.imageUrl} // Obtener la URL de la imagen correspondiente
                      price={promo.price}
                      burgerId={promo.promoId} // Usar promoId en lugar de burgerId
                    />
                  )
              }
              
            </div>
          </div>
        ))}
      {burgers.length === 0 && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-darkblue dark:text-white">
            Cargando menú...
          </h1>
        </div>
      )}
    </div>
  );
};

export default BurgerList;
