'use client'

import Link from "next/link"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

export default function GoToAdmin() {
    const { data: session, status } = useSession()
    const pathname = usePathname()


return (
    session?.user.role === "ADMIN" && !pathname.includes("/admin") &&
    <div className="fixed bottom-0 right-0 p-4">
            <Link href="/admin/burgers" className="btn">Ir a Panel de Control</Link>
    </div>
)
}