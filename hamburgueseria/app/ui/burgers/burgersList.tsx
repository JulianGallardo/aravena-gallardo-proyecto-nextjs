import { Card } from '@/app/ui';
import { Category } from '@/prisma/generated/client';
import { Categorias } from '@/app/ui';
import {  fetchAllBurgersActive, fetchAllPromos } from '@/lib/crud';

async function BurgerList() {

  const categories = Object.values(Category);
  const burgers = await fetchAllBurgersActive();
  const promos = await fetchAllPromos();


  return (
    <div className="flex flex-col pt-16 px-4 items-center gap-5 w-full md:px-36 md:items-stretch">
      {
        <div className='flex items-center justify-center w-full'>
          <Categorias categories={categories} />
        </div>
      }
      {
        categories.map((category) => (
          <div key={category} id={category} className="mb-8 w-full">
            <h2 className="text-2xl font-bold text-darkblue mb-4">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 justify-items-stretch">
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
                      category={burger.category}
                    />
                  )
              )}
              {category == Category.PROMO && promos.map(
                (promo) =>
                  <Card
                    key={promo.promoId}
                    title={promo.name}
                    description={promo.description}
                    photoSrc={promo.imageUrl} // Obtener la URL de la imagen correspondiente
                    price={promo.price}
                    burgerId={promo.promoId} // Usar promoId en lugar de burgerId
                    category={Category.PROMO}
                  />
              )
              }

            </div>
          </div>
        ))}
    </div>
  );
};

export default BurgerList;
