'use client'
import react from 'react';
import NewBurgerForm from '@/app/ui/admin/tabs/burger/newBurgerForm';
import Link from 'next/link';


const Page = () => {
    return (
        <div className='h-full mt-24 flex flex-col gap-5 px-2 mb-10 items-center w-screen'>
            <NewBurgerForm />
            <Link href='/admin/burgers'>
                <button className='btn bg-red-500 hover:bg-red-700  text-white px-6 py-2 rounded-lg '>Back</button>
            </Link>

        </div>
    )

};

export default Page;