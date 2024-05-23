import React from "react";
import { Header } from "@/app/ui";
import { Footer } from "@/app/ui";
import LoginForm from "@/app/ui/auth/login/loginForm";

const page: React.FC = () => {
    return (
        <div>
            <Header isTransparent={true} />
            <div className="flex flex-col items-center justify-center h-screen gap-5">
                <LoginForm />
            </div>
            <Footer />
        </div>
    );
};

export default page;