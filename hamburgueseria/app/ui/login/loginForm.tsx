'use client';

import React from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from "@/lib/actions";

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);



    return (
        <form action={dispatch} className="space-y-3">

            <div className="flex flex-col justify-items-center gap-10">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-2xl">Usuario</h1>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input type="email" className="grow" placeholder="Email" id="email" name="email required" />
                    </label>

                </div>
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-2xl">Contraseña</h1>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" className="grow" placeholder="Password" required
                            id="password"
                            name="password" />
                    </label>


                </div>
                <Link href="/register">No sos parte de la familia Byte? Unete</Link>
                <input type="submit" value="Submit" className="btn bg-darkblue" />
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>





            </div>

        </form>
    );
}