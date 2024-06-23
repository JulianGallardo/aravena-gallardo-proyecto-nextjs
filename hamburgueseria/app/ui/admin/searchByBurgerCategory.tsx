'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Category } from '@/prisma/generated/client';


export default function BurgerSearchCategory({ placeholder }: { placeholder: string }) {
   

    function handleSearchByCategory(category: string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (category) {
            params.set('category', category);
        } else {
            params.delete('category');
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
                defaultValue={searchParams.get('category')?.toString()}
            >
                <option value="">ALL</option>
                {
                    
                    Object.values(Category).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}