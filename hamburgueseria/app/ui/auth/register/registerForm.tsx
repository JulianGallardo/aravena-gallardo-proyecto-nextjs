'use client'

import React from "react";
import { useForm } from "react-hook-form";
import  {useRouter} from 'next/navigation';

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

        const resData = await res.json();

        if (res.ok){
            router.push("/auth/login")
        }

        console.log(resData);
    });

    
    console.log(errors);
    return (
        <div className="">
            <form onSubmit={onSubmit} className="flex flex-col justify-items-center gap-2">
                <label className="text-sm">Username</label>
                <input type="text" {
                    ...register("username", { required:{value:true, message:"Username is required"	},
                         maxLength: 80 })
                } placeholder="Name"
                    className="input input-bordered flex items-center gap-2"
                />
                {errors.username && <span className="text-red ">{String(errors.username.message)}</span>}


                <label className="text-sm">Email</label>
                <input type="email"
                    {...register("email", { required: {
                        value: true, message: "Email is required"
                    
                    }, maxLength: 80 })}
                    placeholder="Email"
                    className="input input-bordered flex items-center gap-2" />
                {errors.email && <span className="text-red">{String(errors.email.message)}</span>}
                
                
                <label className="text-sm">Password</label>
                <input type="password"
                    {...register("password", { required: {
                        value: true, message: "Password is required"
                    
                    }, maxLength: 80 })}
                    placeholder="Password"
                    className="input input-bordered flex items-center gap-2" />
                {errors.password && <span className="text-red">{String(errors.password.message)}</span>}

                <label className="text-sm">Confirm Password</label>    
                <input type="password"
                    {...register("confirmPassword", { required: {
                        value: true, message: "Confirm Password is required"
                    }, maxLength: 80 })
                    } placeholder="Confirm Password"
                    className="input input-bordered flex items-center gap-2" />
                {errors.confirmPassword && <span className="text-red">{String(errors.confirmPassword.message)}</span>}

                <button className="btn bg-darkblue mt-2" >Register</button>

            </form>
        </div>

    );
}