import React from "react";
import { Header } from "@/app/ui";
import { Footer } from "@/app/ui";
import LoginForm from "@/app/ui/auth/login/loginForm";

const page: React.FC = () => {
    return (
        <div className="bg-lightgrey dark:bg-black">
            <div className="flex flex-col items-center justify-center gap-5">
                <LoginForm />
            </div>
        </div>
    );
};

export default page;