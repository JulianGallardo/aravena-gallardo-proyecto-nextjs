'use client'
import NewExtraForm from '@/app/ui/admin/tabs/extras/newExtraForm';
import Link from 'next/link';



const Page = () => {
    return (
        <div className='h-full mt-24 flex flex-col gap-5 px-2 mb-10 items-center w-full'>
            <NewExtraForm />
            <Link href='/admin/extras'>
                <button className='btn bg-red-500 hover:bg-red-700  text-white px-6 py-2 rounded-lg '>
                    Volver
                </button>
            </Link>

        </div>
    )

};

export default Page;