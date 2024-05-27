'use client'

import React from "react";
import { useForm } from "react-hook-form";
import  {useRouter} from 'next/navigation';
import Link from "next/link";

export default function RegisterForm() {
    const router = useRouter();
    const { register, handleSubmit, formState:{errors}  } = useForm();

    // con el formState podemos traer los errores que nos da el formulario
    const onSubmit = handleSubmit(async(data) => {
        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            })
        });

        if (res.ok){
            router.push("/auth/login")
        }

    });
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <h1 className="text-2xl text-start w-full mt-2">Unete a la familia</h1>
            <form onSubmit={onSubmit} className="flex flex-col justify-items-center gap-2">
                <label className="mb-2 mt-2 block text-xs font-medium text-gray-900">Username</label>
                <input type="text" {
                    ...register("username", { required:{value:true, message:"Username is required"	},
                         maxLength: 80 })
                } placeholder="Enter your username"
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500"
                />
                {errors.username && <span className="text-red text-sm ">{String(errors.username.message)}</span>}


                <label className="mb-2 mt-2 block text-xs font-medium text-gray-900">Email</label>
                <input type="email"
                    {...register("email", { required: {
                        value: true, message: "Email is required"
                    
                    }, maxLength: 80 })}
                    placeholder="Enter your email address"
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500" />
                {errors.email && <span className="text-red text-sm">{String(errors.email.message)}</span>}
                
                
                <label className="mb-2 mt-2 block text-xs font-medium text-gray-900">Password</label>
                <input type="password"
                    {...register("password", { required: {
                        value: true, message: "Password is required"
                    
                    }, maxLength: 80 })}
                    placeholder="Password"
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500" />
                {errors.password && <span className="text-red text-sm">{String(errors.password.message)}</span>}

                <label className="mb-2 mt-2 block text-xs font-medium text-gray-900">Confirm Password</label>    
                <input type="password"
                    {...register("confirmPassword", { required: {
                        value: true, message: "Confirm Password is required"
                    }, maxLength: 80 })
                    } placeholder="Confirm Password"
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 pr-10 text-sm outline-2 placeholder:text-gray-500" />
                {errors.confirmPassword && <span className="text-red text-sm">{String(errors.confirmPassword.message)}</span>}

                <button className="btn bg-darkblue mt-2 text-white" >Unirse</button>

            </form>
            <Link href="/auth/login" className=' text-sm hover:text-yellow'> Ya sos parte de la familia? Logeate </Link>
        </div>

    );
}