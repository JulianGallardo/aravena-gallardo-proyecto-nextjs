'use client'
import { Session } from "next-auth"
import { SessionProvider, useSession } from "next-auth/react"
import type { AppProps } from "next/app"

const SessionWrapper = ({ children,session }: { children: React.ReactNode,session:Session }) => {
    return (<SessionProvider session={session} >{children}</SessionProvider>)
}

export default SessionWrapper