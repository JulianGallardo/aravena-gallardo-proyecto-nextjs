'use client'
import { SessionProvider } from "next-auth/react"
import { CartProvider } from '@/app/context/cart'

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (<SessionProvider  >
        <CartProvider>
            {children}
        </CartProvider>
    </SessionProvider>)
}

export default SessionWrapper