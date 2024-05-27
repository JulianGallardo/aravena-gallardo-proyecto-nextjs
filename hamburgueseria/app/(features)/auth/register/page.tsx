import React from 'react';
import RegisterForm from '@/app/ui/auth/register/registerForm';
import { Header } from '@/app/ui';
import { Footer } from '@/app/ui';


export default function RegisterPage() {
    return (
        <div className=' bg-lightgrey dark:bg-dark'>
            <Header isTransparent={true} />
            
            <div className="flex flex-col items-center justify-center h-screen">
                <RegisterForm />
            </div>
            <Footer />
        </div>
    );
}