'use client'
import { SessionProvider, useSession } from "next-auth/react"
import type { AppProps } from "next/app"

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (<SessionProvider >{children}</SessionProvider>)
}

export default SessionWrapper