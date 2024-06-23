'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { OrderStatus } from '@/prisma/generated/client';


export default function OrderSearchByStatus({ placeholder }: { placeholder: string }) {
   

    function handleSearchByCategory(status: string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (status!== "") {
            console.log("status", status);
            params.set('status', status);
        } else {
            console.log("status", status);
            params.delete('status');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    return (
        <div className="relative flex flex-1 flex-shrink-0 gap-5">
            
            <select
                className="w-full h-10 px-3 py-2 text-base text-black placeholder-gray-400 border-2 border-gray-500  rounded-lg focus:shadow-outline bg-gray-200 "
                onChange={(e) => {
                    handleSearchByCategory(e.target.value);
                }}
                defaultValue={searchParams.get('status')?.toString()}
            >
                <option value="">ALL</option>
                {
                    
                    Object.values(OrderStatus).map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}