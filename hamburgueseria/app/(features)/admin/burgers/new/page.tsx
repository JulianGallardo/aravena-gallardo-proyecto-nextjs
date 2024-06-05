'use client'
import react from 'react';
import NewBurgerForm from '@/app/ui/admin/tabs/burger/newBurgerForm';
import Link from 'next/link';


const Page = () => {
    return (
        <div className='h-full mt-24 flex flex-col gap-5 items-center'>
            <h1 className='text-3xl font-bold text-center'>Add a new burger</h1>
            <NewBurgerForm />
            <Link href='/admin'>
                <button className='bg-red text-white px-6 py-2 rounded-lg '>Back</button>
            </Link>

        </div>
    )

};

export default Page;