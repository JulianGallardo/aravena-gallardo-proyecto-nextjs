import React, { Suspense } from 'react';
import { BurgerList } from '@/app/ui';
import CardSkeleton from '@/app/ui/shared/cardSkeleton';


const Page: React.FC = () => {
    return (
        <div className='flex flex-col'>
            <Suspense fallback={<Skeleton/>}>
                <BurgerList />
            </Suspense>
        </div>
    );
};

const Skeleton = () => {
    return (
        <div className="flex flex-col h-full my-24 gap-5">
          <div className="skeleton h-8  bg-gray-300 md:mx-24"></div>
          <div className="skeleton h-4 w-32 bg-gray-300 md:mx-24"></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 justify-items-stretch md:mx-24'>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
    );
}


export default Page;