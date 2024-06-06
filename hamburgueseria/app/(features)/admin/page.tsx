import React from 'react';
import Dashboard from '@/app/ui/admin/adminTabs';
import BurgerPagination from '@/app/ui/admin/tabs/burger/burgerPagination';

const Page: React.FC = () => {
    return (
        <div className=' mt-24 mx-10 min-h-screen max-w-screen'>
            <h1 className='text-4xl text-center'>Admin</h1>
            <BurgerPagination />
        </div>
    );
};

export default Page;