'use client'
import { SessionProvider, useSession } from "next-auth/react"

export const SessionWrapper = ({ children }: { children: React.ReactNode }) => {

    return (<SessionProvider >{children}</SessionProvider>)
}