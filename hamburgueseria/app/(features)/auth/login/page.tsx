import React from "react";
import { Header } from "@/app/ui";
import { Footer } from "@/app/ui";
import LoginForm from "@/app/ui/auth/login/loginForm";

const page: React.FC = () => {
    return (
        <div className="bg-lightgrey dark:bg-black">
            <Header isTransparent={true} />
            <div className="flex flex-col items-center justify-center gap-5">
                <LoginForm />
            </div>
            <Footer />
        </div>
    );
};

export default page;