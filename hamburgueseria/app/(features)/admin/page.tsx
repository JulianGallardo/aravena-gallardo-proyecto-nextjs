import React from 'react';
import Dashboard from '@/app/ui/admin/adminTabs';

const Page: React.FC = () => {
    return (
        <div className=' mt-24 mx-10 min-h-screen max-w-screen'>
            <h1 className='text-4xl text-center'>Admin</h1>
            <Dashboard />
        </div>
    );
};

export default Page;